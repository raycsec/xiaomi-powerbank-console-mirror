import type { Qi2ProtocolId, Qi2ResolvedProtocol, Qi2Status, Qi2StrategyResult } from "../types/domain.js";
import type { HidClient } from "../hid/HidClient.js";
import { CMD, RESP, TIMEOUT_MS } from "./constants.js";
import {
  decodeBatteryInfo,
  decodeHelloResponse,
  decodeQi2Status,
  decodeQi2WriteResponse,
} from "./decoders.js";
import {
  buildCommandFrame,
  buildHelloFrame,
  buildPadded32CommandFrame,
  buildPadded32HelloFrame,
} from "./codec.js";
import { buildEncryptedQi2Payload, normalizeSerialForKey } from "./qi2Crypto.js";

export interface Qi2ExecuteOptions {
  commandDelayMs?: number;
  readbackRetries?: number;
  readbackIntervalMs?: number;
  readbackInitialDelayMs?: number;
  ignoreFault?: boolean;
  padded32?: boolean;
}

export interface Qi2Strategy {
  readonly id: Qi2ProtocolId;
  execute(client: HidClient, targetEnabled: boolean, options?: Qi2ExecuteOptions): Promise<Qi2StrategyResult>;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function uint8Equal(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function getKeyTail8(sn: Uint8Array, useRawSerialBytes: boolean): Uint8Array {
  const keySn = useRawSerialBytes ? sn : normalizeSerialForKey(sn);
  return keySn.slice(Math.max(0, keySn.length - 8));
}

async function requestQi2Command(
  client: HidClient,
  command: number,
  expectedResp: number | number[],
  timeoutMs: number,
  payload: Uint8Array = new Uint8Array(0),
  padded32 = false,
  label?: string,
): Promise<Uint8Array & { __command?: number }> {
  const frame = padded32
    ? buildPadded32CommandFrame(command, payload)
    : buildCommandFrame(command, payload);
  return client.requestRawUnlocked(command, expectedResp, timeoutMs, frame, label);
}

export async function pollQi2Status(
  client: HidClient,
  targetEnabled: boolean,
  options: Qi2ExecuteOptions = {},
): Promise<{ settled: boolean; attempts: number; status: Qi2Status | null }> {
  const retries = options.readbackRetries ?? TIMEOUT_MS.QI2_READBACK_RETRIES;
  const intervalMs = options.readbackIntervalMs ?? TIMEOUT_MS.QI2_READBACK_INTERVAL;
  const padded32 = Boolean(options.padded32);
  const initialDelayMs =
    options.readbackInitialDelayMs ??
    (padded32 && options.readbackIntervalMs === undefined ? 300 : 0);
  let lastStatus: Qi2Status | null = null;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    const delayMs = attempt === 0 ? initialDelayMs : intervalMs;
    if (delayMs > 0) await sleep(delayMs);
    try {
      const payload = await requestQi2Command(
        client,
        CMD.GET_QI2_STATUS,
        RESP.QI2_STATUS,
        TIMEOUT_MS.COMMAND,
        new Uint8Array(0),
        padded32,
      );
      lastStatus = decodeQi2Status(payload);
      if (lastStatus.success && lastStatus.enabled === targetEnabled) {
        return { settled: true, attempts: attempt + 1, status: lastStatus };
      }
    } catch {
      lastStatus = null;
    }
  }
  return { settled: false, attempts: retries, status: lastStatus };
}

async function performHelloHandshake(
  client: HidClient,
  padded32: boolean,
  label: string,
  minTimestamp = 0,
): Promise<{ timestamp: number; modelId: number; snBytes: Uint8Array }> {
  const nowSec = (Math.floor(Date.now() / 1000) + 8 * 3600) >>> 0;
  const targetSec = minTimestamp > nowSec ? minTimestamp : nowSec;
  const targetMs = (targetSec - 8 * 3600) * 1000;

  // 必须优先发送带 4B timestamp + "xiaomi-pb" 的完整 13B Hello，确保固件端真正锁存本次会话时间戳；
  // 仅当完整 Hello 超时/失败时，才降级尝试空载荷 0x00 32B 帧。
  try {
    const { frame: helloFrame, timestamp } = padded32
      ? buildPadded32HelloFrame(targetMs)
      : buildHelloFrame(targetMs);
    const helloPayload = await client.requestRawUnlocked(
      CMD.HELLO,
      RESP.HELLO,
      TIMEOUT_MS.HELLO,
      helloFrame,
      label,
    );
    const hello = decodeHelloResponse(helloPayload);
    if (!hello.snBytes.length) {
      throw new Error("Device serial bytes unavailable");
    }
    return { timestamp, modelId: hello.modelId, snBytes: hello.snBytes };
  } catch (fullHelloErr) {
    if (!padded32) throw fullHelloErr;
    const emptyFrame = buildPadded32CommandFrame(CMD.HELLO);
    const emptyPayload = await client.requestRawUnlocked(
      CMD.HELLO,
      [RESP.HELLO, RESP.ECHO],
      TIMEOUT_MS.HELLO,
      emptyFrame,
      `${label} (0x00 empty fallback)`,
    );
    if (emptyPayload.__command === RESP.HELLO && emptyPayload.length >= 23) {
      const decoded = decodeHelloResponse(emptyPayload);
      if (decoded.snBytes.length > 0) {
        return { timestamp: targetSec, modelId: decoded.modelId, snBytes: decoded.snBytes };
      }
    }
    throw fullHelloErr;
  }
}

interface EncryptedCandidate {
  protocol: Qi2ResolvedProtocol;
  snBytes: Uint8Array;
  useRawSerialBytes: boolean;
  cycles: number;
  snMode: string;
}

function buildEncryptedCandidates(
  fullSnBytes: Uint8Array,
  batteryCycles: number,
  compatMode: boolean,
): EncryptedCandidate[] {
  const slice20Sn = fullSnBytes.slice(0, Math.min(20, fullSnBytes.length));
  const rawCandidates: EncryptedCandidate[] = compatMode
    ? [
        // 优先对齐 xiaomi-pb-tool.html 实测有效参数: 32B 补零 0xE6 + 固定 20B SN 切片 (payload.slice(2, 22)) + cycles=0
        {
          protocol: "encrypted-compat-cycles0",
          snBytes: slice20Sn,
          useRawSerialBytes: true,
          cycles: 0,
          snMode: "slice20-raw",
        },
        {
          protocol: "encrypted-compat",
          snBytes: slice20Sn,
          useRawSerialBytes: true,
          cycles: batteryCycles,
          snMode: "slice20-raw",
        },
        {
          protocol: "encrypted-compat-cycles0",
          snBytes: fullSnBytes,
          useRawSerialBytes: false,
          cycles: 0,
          snMode: "normalized",
        },
        {
          protocol: "encrypted-compat",
          snBytes: fullSnBytes,
          useRawSerialBytes: false,
          cycles: batteryCycles,
          snMode: "normalized",
        },
        {
          protocol: "encrypted-compat-raw-sn-cycles0",
          snBytes: fullSnBytes,
          useRawSerialBytes: true,
          cycles: 0,
          snMode: "full-raw",
        },
        {
          protocol: "encrypted-compat-raw-sn",
          snBytes: fullSnBytes,
          useRawSerialBytes: true,
          cycles: batteryCycles,
          snMode: "full-raw",
        },
      ]
    : [
        {
          protocol: "encrypted",
          snBytes: fullSnBytes,
          useRawSerialBytes: false,
          cycles: batteryCycles,
          snMode: "normalized",
        },
        {
          protocol: "encrypted-cycles0",
          snBytes: fullSnBytes,
          useRawSerialBytes: false,
          cycles: 0,
          snMode: "normalized",
        },
        {
          protocol: "encrypted-raw-sn",
          snBytes: fullSnBytes,
          useRawSerialBytes: true,
          cycles: batteryCycles,
          snMode: "full-raw",
        },
        {
          protocol: "encrypted-raw-sn-cycles0",
          snBytes: fullSnBytes,
          useRawSerialBytes: true,
          cycles: 0,
          snMode: "full-raw",
        },
        {
          protocol: "encrypted-cycles0",
          snBytes: slice20Sn,
          useRawSerialBytes: true,
          cycles: 0,
          snMode: "slice20-raw",
        },
      ];

  const deduped: EncryptedCandidate[] = [];
  for (const cand of rawCandidates) {
    const tail = getKeyTail8(cand.snBytes, cand.useRawSerialBytes);
    const exists = deduped.some(
      (prev) =>
        prev.cycles === cand.cycles &&
        uint8Equal(getKeyTail8(prev.snBytes, prev.useRawSerialBytes), tail),
    );
    if (!exists) deduped.push(cand);
  }
  return deduped;
}

export const legacyQi2Strategy: Qi2Strategy = {
  id: "legacy",
  async execute(client: HidClient, targetEnabled: boolean, options: Qi2ExecuteOptions = {}): Promise<Qi2StrategyResult> {
    const commandDelayMs = options.commandDelayMs ?? 150;
    const before = decodeQi2Status(
      await requestQi2Command(
        client,
        CMD.GET_QI2_STATUS,
        RESP.QI2_STATUS,
        TIMEOUT_MS.COMMAND,
        new Uint8Array(0),
        Boolean(options.padded32),
      ),
    );
    if (before.success && before.enabled === targetEnabled) {
      return { protocol: "legacy", skipped: true, status: before, attempts: 0 };
    }

    if (commandDelayMs > 0) await sleep(commandDelayMs);
    let usedProtocol: Qi2ResolvedProtocol = options.padded32 ? "legacy-padded32" : "legacy";
    let usedPadded32 = Boolean(options.padded32);
    let writeResp = decodeQi2WriteResponse(
      await requestQi2Command(
        client,
        CMD.SET_QI2_LEGACY,
        RESP.SET_QI2_LEGACY,
        TIMEOUT_MS.QI2_LEGACY_WRITE,
        new Uint8Array([targetEnabled ? 1 : 0]),
        usedPadded32,
      ),
    );

    if (!writeResp.success && !usedPadded32) {
      if (commandDelayMs > 0) await sleep(commandDelayMs);
      const retryPadded = decodeQi2WriteResponse(
        await requestQi2Command(
          client,
          CMD.SET_QI2_LEGACY,
          RESP.SET_QI2_LEGACY,
          TIMEOUT_MS.QI2_LEGACY_WRITE,
          new Uint8Array([targetEnabled ? 1 : 0]),
          true,
          "0x06 (padded32 fallback)",
        ),
      );
      if (retryPadded.success) {
        writeResp = retryPadded;
        usedProtocol = "legacy-padded32";
        usedPadded32 = true;
      } else {
        throw new Error(
          `Legacy Qi2.2 write rejected (status=${writeResp.statusCode}; padded32 status=${retryPadded.statusCode})`,
        );
      }
    } else if (!writeResp.success) {
      throw new Error(`Legacy Qi2.2 write rejected (status=${writeResp.statusCode})`);
    }

    const poll = await pollQi2Status(client, targetEnabled, { ...options, padded32: usedPadded32 });
    if (!poll.settled || !poll.status) {
      throw new Error("Qi2.2 read-back mismatch after legacy write");
    }
    return {
      protocol: usedProtocol,
      skipped: false,
      writeStatus: writeResp.statusCode,
      status: poll.status,
      attempts: poll.attempts,
    };
  },
};

export const encryptedQi2Strategy: Qi2Strategy = {
  id: "encrypted",
  async execute(client: HidClient, targetEnabled: boolean, options: Qi2ExecuteOptions = {}): Promise<Qi2StrategyResult> {
    const commandDelayMs = options.commandDelayMs ?? 150;
    const padded32 = Boolean(options.padded32);

    let session = await performHelloHandshake(client, padded32, "Hello (Qi2.2 session)");

    if (commandDelayMs > 0) await sleep(commandDelayMs);
    const before = decodeQi2Status(
      await requestQi2Command(
        client,
        CMD.GET_QI2_STATUS,
        RESP.QI2_STATUS,
        TIMEOUT_MS.COMMAND,
        new Uint8Array(0),
        padded32,
      ),
    );
    if (before.success && before.enabled === targetEnabled) {
      return { protocol: "encrypted", skipped: true, status: before, attempts: 0 };
    }

    if (commandDelayMs > 0) await sleep(commandDelayMs);
    const battery = decodeBatteryInfo(
      await requestQi2Command(
        client,
        CMD.GET_BATTERY_INFO,
        RESP.BATTERY_INFO,
        TIMEOUT_MS.COMMAND,
        new Uint8Array(0),
        padded32,
      ),
    );
    if (!battery.success) {
      throw new Error(`Battery info query failed (status=${battery.statusCode})`);
    }
    if (targetEnabled && !options.ignoreFault && battery.faultType !== 0) {
      throw new Error(`Device reports active fault (code=${battery.faultType})`);
    }

    const candidates = buildEncryptedCandidates(session.snBytes, battery.cycleCount, false);
    const statusHistory: string[] = [];
    let acceptedWriteStatus = -1;
    let usedCandidate: EncryptedCandidate | null = null;

    for (let idx = 0; idx < candidates.length; idx += 1) {
      const cand = candidates[idx];
      if (idx > 0) {
        // 每次 0xE6 重试强制重新 Hello，刷新会话 timestamp/nonce，避免复用已被固件作废的时间戳
        if (commandDelayMs > 0) await sleep(commandDelayMs);
        session = await performHelloHandshake(
          client,
          padded32,
          `Hello (Qi2.2 retry #${idx} ${cand.snMode} cycles=${cand.cycles})`,
          (session.timestamp + 1) >>> 0,
        );
        client.emitLog?.("INFO", `Qi2.2 encrypted retry (${cand.protocol})`, null, {
          snMode: cand.snMode,
          cycles: cand.cycles,
          timestamp: session.timestamp,
        });
      }

      const encrypted = await buildEncryptedQi2Payload({
        snBytes: cand.snBytes,
        timestamp: session.timestamp,
        health: battery.health,
        cycles: cand.cycles,
        enabled: targetEnabled,
        useRawSerialBytes: cand.useRawSerialBytes,
      });

      if (commandDelayMs > 0) await sleep(commandDelayMs);
      const writeResp = decodeQi2WriteResponse(
        await requestQi2Command(
          client,
          CMD.SET_QI2_ENCRYPTED,
          RESP.SET_QI2_ENCRYPTED,
          TIMEOUT_MS.QI2_ENCRYPTED_WRITE,
          encrypted,
          padded32,
        ),
      );
      statusHistory.push(`${cand.protocol}=${writeResp.statusCode}`);
      if (writeResp.success) {
        acceptedWriteStatus = writeResp.statusCode;
        usedCandidate = cand;
        break;
      }
    }

    if (!usedCandidate) {
      const firstStatus = statusHistory[0]?.split("=")[1] ?? "1";
      throw new Error(
        `Encrypted Qi2.2 write rejected (status=${firstStatus}; retries: ${statusHistory.join(", ")})`,
      );
    }

    const poll = await pollQi2Status(client, targetEnabled, { ...options, padded32 });
    if (!poll.settled || !poll.status) {
      throw new Error("Qi2.2 read-back mismatch after encrypted write");
    }
    return {
      protocol: usedCandidate.protocol,
      skipped: false,
      writeStatus: acceptedWriteStatus,
      status: poll.status,
      attempts: poll.attempts,
      diagnostics: {
        modelId: session.modelId,
        health: battery.health,
        cycles: battery.cycleCount,
        fault: battery.faultType,
        padded32,
        snMode: usedCandidate.snMode,
        cyclesEncoded: usedCandidate.cycles,
      },
    };
  },
};

export const encryptedCompatQi2Strategy: Qi2Strategy = {
  id: "encrypted-compat",
  async execute(client: HidClient, targetEnabled: boolean, options: Qi2ExecuteOptions = {}): Promise<Qi2StrategyResult> {
    const commandDelayMs = options.commandDelayMs ?? 150;
    const wakeupDelayMs = options.commandDelayMs === 0 ? 0 : Math.max(commandDelayMs, 200);

    // 对齐 xiaomi-pb-tool.html helloGet(): 唤醒预读 0x07 (32B 补零帧)
    try {
      await requestQi2Command(
        client,
        CMD.GET_QI2_STATUS,
        RESP.QI2_STATUS,
        TIMEOUT_MS.COMMAND,
        new Uint8Array(0),
        true,
        "0x07 (compat wake-up)",
      );
    } catch {
      // Ignore wake-up timeout
    }
    if (wakeupDelayMs > 0) await sleep(wakeupDelayMs);

    let session = await performHelloHandshake(client, true, "Hello (Qi2.2 compat 32B)");

    if (commandDelayMs > 0) await sleep(commandDelayMs);
    const before = decodeQi2Status(
      await requestQi2Command(
        client,
        CMD.GET_QI2_STATUS,
        RESP.QI2_STATUS,
        TIMEOUT_MS.COMMAND,
        new Uint8Array(0),
        true,
        "0x07 (compat pre-check 32B)",
      ),
    );
    if (before.success && before.enabled === targetEnabled) {
      return { protocol: "encrypted-compat", skipped: true, status: before, attempts: 0 };
    }

    if (commandDelayMs > 0) await sleep(commandDelayMs);
    const battery = decodeBatteryInfo(
      await requestQi2Command(
        client,
        CMD.GET_BATTERY_INFO,
        RESP.BATTERY_INFO,
        TIMEOUT_MS.COMMAND,
        new Uint8Array(0),
        true,
        "0x01 (compat battery 32B)",
      ),
    );
    if (!battery.success) {
      throw new Error(`Battery info query failed (status=${battery.statusCode})`);
    }
    if (targetEnabled && !options.ignoreFault && battery.faultType !== 0) {
      throw new Error(`Device reports active fault (code=${battery.faultType})`);
    }

    const candidates = buildEncryptedCandidates(session.snBytes, battery.cycleCount, true);
    const statusHistory: string[] = [];
    let acceptedWriteStatus = -1;
    let usedCandidate: EncryptedCandidate | null = null;

    for (let idx = 0; idx < candidates.length; idx += 1) {
      const cand = candidates[idx];
      if (idx > 0) {
        // 每次 0xE6 重试强制重新 Hello，避免首次验签被拒后固件作废当前会话 timestamp/nonce
        if (commandDelayMs > 0) await sleep(commandDelayMs);
        session = await performHelloHandshake(
          client,
          true,
          `Hello (Qi2.2 compat retry #${idx} ${cand.snMode} cycles=${cand.cycles})`,
          (session.timestamp + 1) >>> 0,
        );
        client.emitLog?.("INFO", `Qi2.2 encrypted-compat retry (${cand.protocol})`, null, {
          snMode: cand.snMode,
          cycles: cand.cycles,
          timestamp: session.timestamp,
        });
      }

      const encrypted = await buildEncryptedQi2Payload({
        snBytes: cand.snBytes,
        timestamp: session.timestamp,
        health: battery.health,
        cycles: cand.cycles,
        enabled: targetEnabled,
        useRawSerialBytes: cand.useRawSerialBytes,
      });

      if (commandDelayMs > 0) await sleep(commandDelayMs);
      const writeResp = decodeQi2WriteResponse(
        await requestQi2Command(
          client,
          CMD.SET_QI2_ENCRYPTED,
          RESP.SET_QI2_ENCRYPTED,
          TIMEOUT_MS.QI2_ENCRYPTED_WRITE,
          encrypted,
          true,
          `0xE6 (compat 32B ${cand.snMode} cycles=${cand.cycles})`,
        ),
      );
      statusHistory.push(`${cand.protocol}(${cand.snMode},c=${cand.cycles})=${writeResp.statusCode}`);
      if (writeResp.success) {
        acceptedWriteStatus = writeResp.statusCode;
        usedCandidate = cand;
        break;
      }
    }

    if (!usedCandidate) {
      throw new Error(`Encrypted-compat Qi2.2 write rejected (${statusHistory.join(", ")})`);
    }

    const poll = await pollQi2Status(client, targetEnabled, {
      ...options,
      padded32: true,
    });
    if (!poll.settled || !poll.status) {
      throw new Error("Qi2.2 read-back mismatch after encrypted-compat write");
    }
    return {
      protocol: usedCandidate.protocol,
      skipped: false,
      writeStatus: acceptedWriteStatus,
      status: poll.status,
      attempts: poll.attempts,
      diagnostics: {
        modelId: session.modelId,
        health: battery.health,
        cycles: battery.cycleCount,
        fault: battery.faultType,
        padded32: true,
        snMode: usedCandidate.snMode,
        cyclesEncoded: usedCandidate.cycles,
      },
    };
  },
};

export const QI2_STRATEGIES: Record<Qi2ProtocolId, Qi2Strategy> = {
  legacy: legacyQi2Strategy,
  encrypted: encryptedQi2Strategy,
  "encrypted-compat": encryptedCompatQi2Strategy,
};
