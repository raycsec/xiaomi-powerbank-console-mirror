import { CMD, RESP, TIMEOUT_MS } from "./constants.js";
import {
  decodeBatteryInfo,
  decodeHelloResponse,
  decodeQi2Status,
  decodeQi2WriteResponse,
} from "./decoders.js";
import { buildHelloFrame } from "./frames.js";
import { buildEncryptedQi2Payload } from "./qi2Ccm.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pollQi2Status(client, targetEnabled, options = {}) {
  const retries = options.readbackRetries ?? TIMEOUT_MS.QI2_READBACK_RETRIES;
  const intervalMs = options.readbackIntervalMs ?? TIMEOUT_MS.QI2_READBACK_INTERVAL;
  let lastStatus = null;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    if (attempt > 0 && intervalMs > 0) await sleep(intervalMs);
    try {
      const payload = await client.requestUnlocked(CMD.GET_QI2_STATUS, RESP.QI2_STATUS, TIMEOUT_MS.COMMAND);
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

export const legacyQi2Strategy = {
  id: "legacy",
  async execute(client, targetEnabled, options = {}) {
    const before = decodeQi2Status(
      await client.requestUnlocked(CMD.GET_QI2_STATUS, RESP.QI2_STATUS, TIMEOUT_MS.COMMAND),
    );
    if (before.success && before.enabled === targetEnabled) {
      return { protocol: "legacy", skipped: true, status: before, attempts: 0 };
    }

    const writeResp = decodeQi2WriteResponse(
      await client.requestUnlocked(
        CMD.SET_QI2_LEGACY,
        RESP.SET_QI2_LEGACY,
        TIMEOUT_MS.QI2_LEGACY_WRITE,
        new Uint8Array([targetEnabled ? 1 : 0]),
      ),
    );
    if (!writeResp.success) {
      throw new Error(`Legacy Qi2.2 write rejected (status=${writeResp.statusCode})`);
    }

    const poll = await pollQi2Status(client, targetEnabled, options);
    if (!poll.settled) {
      throw new Error("Qi2.2 read-back mismatch after legacy write");
    }
    return { protocol: "legacy", skipped: false, writeStatus: writeResp.statusCode, status: poll.status, attempts: poll.attempts };
  },
};

export const encryptedQi2Strategy = {
  id: "encrypted",
  async execute(client, targetEnabled, options = {}) {
    const { frame: helloFrame, timestamp } = buildHelloFrame();
    const helloPayload = await client.requestRawUnlocked(
      CMD.HELLO,
      RESP.HELLO,
      TIMEOUT_MS.HELLO,
      helloFrame,
      "Hello (Qi2.2 session)",
    );
    const hello = decodeHelloResponse(helloPayload);
    if (!hello.snBytes.length) {
      throw new Error("Device serial bytes unavailable");
    }

    const before = decodeQi2Status(
      await client.requestUnlocked(CMD.GET_QI2_STATUS, RESP.QI2_STATUS, TIMEOUT_MS.COMMAND),
    );
    if (before.success && before.enabled === targetEnabled) {
      return { protocol: "encrypted", skipped: true, status: before, attempts: 0 };
    }

    const battery = decodeBatteryInfo(
      await client.requestUnlocked(CMD.GET_BATTERY_INFO, RESP.BATTERY_INFO, TIMEOUT_MS.COMMAND),
    );
    if (!battery.success) {
      throw new Error(`Battery info query failed (status=${battery.statusCode})`);
    }
    if (targetEnabled && battery.faultType !== 0) {
      throw new Error(`Device reports active fault (code=${battery.faultType})`);
    }

    const encrypted = await buildEncryptedQi2Payload({
      snBytes: hello.snBytes,
      timestamp,
      health: battery.health,
      cycles: battery.cycleCount,
      enabled: targetEnabled,
    });

    const writeResp = decodeQi2WriteResponse(
      await client.requestUnlocked(
        CMD.SET_QI2_ENCRYPTED,
        RESP.SET_QI2_ENCRYPTED,
        TIMEOUT_MS.QI2_ENCRYPTED_WRITE,
        encrypted,
      ),
    );
    if (!writeResp.success) {
      throw new Error(`Encrypted Qi2.2 write rejected (status=${writeResp.statusCode})`);
    }

    const poll = await pollQi2Status(client, targetEnabled, options);
    if (!poll.settled) {
      throw new Error("Qi2.2 read-back mismatch after encrypted write");
    }
    return {
      protocol: "encrypted",
      skipped: false,
      writeStatus: writeResp.statusCode,
      status: poll.status,
      attempts: poll.attempts,
      diagnostics: {
        modelId: hello.modelId,
        health: battery.health,
        cycles: battery.cycleCount,
        fault: battery.faultType,
      },
    };
  },
};

export const QI2_STRATEGIES = {
  legacy: legacyQi2Strategy,
  encrypted: encryptedQi2Strategy,
};
