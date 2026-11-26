import type { HidClient } from "../hid/HidClient.js";
import type { HidLogEntry, Qi2Status } from "../types/domain.js";
import { aes128CcmSeal } from "../protocol/aesCcm.js";
import {
  buildCommandFrame,
  buildHelloFrame,
  buildPadded32CommandFrame,
  buildPadded32HelloFrame,
} from "../protocol/codec.js";
import { CMD, RESP, TIMEOUT_MS } from "../protocol/constants.js";
import {
  decodeBatteryInfo,
  decodeHelloResponse,
  decodeQi2Status,
  decodeQi2WriteResponse,
} from "../protocol/decoders.js";
import { normalizeSerialForKey } from "../protocol/qi2Crypto.js";

/**
 * 主站 WPB0525S 协议一致性标记。
 * 与 public/0525s-test-pack.js 中的 protocolVersion 比对：
 * - 一致：主站连接 WPB0525S 时不显示测试站跳转提示。
 * - 不一致：主站连接 WPB0525S 时自动显示提示与跳转 /0525s-test 按钮。
 */
export const MAIN_WPB0525S_PROTOCOL_VERSION = "0525s-proto-2026.11.27-r1";
export const WPB0525S_TEST_SITE_PATH = "/0525s-test";
export const WPB0525S_TEST_PACK_URL = "/0525s-test-pack.js";

export type Wpb0525sSnMode = "slice20-raw" | "normalized" | "full-raw";
export type Wpb0525sHelloMode = "full13" | "empty0";
export type Wpb0525sCyclesMode = "zero" | "battery" | number;

export interface Wpb0525sCustomRunResult {
  ok: boolean;
  skipped?: boolean;
  writeStatus?: number | null;
  settled?: boolean;
  attempts?: number;
  status?: Qi2Status | null;
  detail?: string;
  extra?: Record<string, unknown> | null;
}

export interface Wpb0525sAlgorithmContext {
  client: HidClient;
  targetEnabled: boolean;
  algorithm: Wpb0525sAlgorithmDefinition;
  snBytes: Uint8Array;
  modelId: number;
  health: number;
  cycles: number;
  timestamp: number;
  sleep: (ms: number) => Promise<void>;
  buildCommandFrame: typeof buildCommandFrame;
  buildPadded32CommandFrame: typeof buildPadded32CommandFrame;
  buildHelloFrame: typeof buildHelloFrame;
  buildPadded32HelloFrame: typeof buildPadded32HelloFrame;
  buildCustomEncryptedPayload: (input: {
    snBytes: Uint8Array;
    snMode?: Wpb0525sSnMode;
    timestamp: number;
    health: number;
    cycles: number;
    enabled: boolean;
    commandByte?: number;
    nonceDirByte?: number;
    rootKey?: string;
  }) => Promise<Uint8Array>;
  log: (direction: HidLogEntry["direction"], label: string, meta?: Record<string, unknown> | null) => void;
}

export interface Wpb0525sAlgorithmDefinition {
  id: string;
  group: string;
  name: string;
  description?: string;
  enabled?: boolean;
  actions?: Array<"on" | "off">;
  transport: "encrypted" | "legacy" | "custom";
  padded32?: boolean;
  helloMode?: Wpb0525sHelloMode;
  wakeup0x07Count?: number;
  wakeupDelayMs?: number;
  commandDelayMs?: number;
  snMode?: Wpb0525sSnMode;
  cyclesMode?: Wpb0525sCyclesMode;
  commandByte?: number;
  respByte?: number;
  nonceDirByte?: number;
  rootKey?: string;
  timestampOffsetSec?: number;
  readbackRetries?: number;
  readbackInitialDelayMs?: number;
  readbackIntervalMs?: number;
  run?: (ctx: Wpb0525sAlgorithmContext) => Promise<Wpb0525sCustomRunResult>;
}

export interface Wpb0525sGroupRunResult {
  algorithmId: string;
  group: string;
  name: string;
  ok: boolean;
  skipped: boolean;
  writeStatus: number | null;
  settled: boolean;
  attempts: number;
  durationMs: number;
  detail: string;
  status?: Qi2Status | null;
  params: Record<string, unknown>;
  extra?: Record<string, unknown> | null;
}

export interface Wpb0525sRunSummary {
  testSiteVersion: string;
  protocolVersion: string;
  targetEnabled: boolean;
  totalGroups: number;
  passedCount: number;
  skippedCount: number;
  failedCount: number;
  winningAlgorithmId: string | null;
  overallOk: boolean;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  results: Wpb0525sGroupRunResult[];
}

export interface Wpb0525sTestPack {
  testSiteVersion: string;
  protocolVersion: string;
  testSitePath: string;
  targetModels: string[];
  targetModelIds: number[];
  mainSiteNotice: {
    title: string;
    description: string;
    buttonText: string;
  };
  testSiteMeta?: {
    title?: string;
    subtitle?: string;
    defaultStopOnSuccess?: boolean;
    defaultCommandDelayMs?: number;
    defaultWakeupDelayMs?: number;
  };
  apiConfig?: {
    reportEndpoint?: string;
    fallbackReportEndpoint?: string;
    metaEndpoint?: string;
    statsEndpoint?: string;
    extraHeaders?: Record<string, string>;
  };
  algorithms: Wpb0525sAlgorithmDefinition[];
  formatDebugEntry?: (entry: Record<string, unknown>) => Record<string, unknown>;
  formatGroupResult?: (result: Wpb0525sGroupRunResult) => Wpb0525sGroupRunResult;
  formatSummary?: (summary: Omit<Wpb0525sRunSummary, "testSiteVersion" | "protocolVersion" | "totalGroups" | "passedCount" | "skippedCount" | "failedCount" | "winningAlgorithmId" | "overallOk">) => Wpb0525sRunSummary;
  formatTelemetryPayload?: (basePayload: Record<string, unknown>, summary: Wpb0525sRunSummary) => Record<string, unknown>;
  formatApiOutput?: (endpoint: string, defaultData: Record<string, unknown>) => Record<string, unknown>;
}

export interface Wpb0525sParityStatus {
  matched: boolean;
  shouldShowTestSitePrompt: boolean;
  mainProtocolVersion: string;
  testProtocolVersion: string;
  testSiteVersion: string;
  testSitePath: string;
  notice: {
    title: string;
    description: string;
    buttonText: string;
  };
}

declare global {
  interface Window {
    __WPB0525S_TEST_PACK__?: Wpb0525sTestPack;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const FALLBACK_WPB0525S_TEST_PACK: Wpb0525sTestPack = {
  testSiteVersion: "v39-0525s-test.1",
  protocolVersion: MAIN_WPB0525S_PROTOCOL_VERSION,
  testSitePath: WPB0525S_TEST_SITE_PATH,
  targetModels: ["WPB0525S"],
  targetModelIds: [10],
  mainSiteNotice: {
    title: "检测到 0525S 测试站有新实验算法",
    description:
      "当前测试站正在尝试最新的不确定算法，与主站稳定协议版本不同，建议跳转至测试站尝试并反馈调试日志。",
    buttonText: "前往 0525S 测试站",
  },
  testSiteMeta: {
    title: "WPB0525S 实验算法测试站",
    subtitle: "独立热更新算法包驱动 · 自适应不限算法组数 · 实时抓包与全量遥测反馈",
    defaultStopOnSuccess: true,
    defaultCommandDelayMs: 150,
    defaultWakeupDelayMs: 200,
  },
  apiConfig: {
    reportEndpoint: "/api/0525s-test/report",
    fallbackReportEndpoint: "/api/qi2-report",
    metaEndpoint: "/api/0525s-test/meta",
    statsEndpoint: "/api/qi2-stats",
    extraHeaders: {},
  },
  algorithms: [
    {
      id: "compat-32b-slice20-c0",
      group: "encrypted-compat",
      name: "32B 兼容加密 · 20B 截断 SN · cycles=0",
      enabled: true,
      actions: ["on", "off"],
      transport: "encrypted",
      padded32: true,
      helloMode: "full13",
      wakeup0x07Count: 1,
      wakeupDelayMs: 200,
      commandDelayMs: 150,
      snMode: "slice20-raw",
      cyclesMode: "zero",
      commandByte: 0xe6,
      respByte: 0xf6,
      nonceDirByte: 0x48,
      rootKey: "MiXiaomiQi22Key!",
      timestampOffsetSec: 28800,
      readbackRetries: 6,
      readbackInitialDelayMs: 300,
      readbackIntervalMs: 700,
    },
    {
      id: "compat-32b-slice20-c-real",
      group: "encrypted-compat",
      name: "32B 兼容加密 · 20B 截断 SN · 真实 cycles",
      enabled: true,
      actions: ["on", "off"],
      transport: "encrypted",
      padded32: true,
      helloMode: "full13",
      commandDelayMs: 150,
      snMode: "slice20-raw",
      cyclesMode: "battery",
      commandByte: 0xe6,
      respByte: 0xf6,
      nonceDirByte: 0x48,
      rootKey: "MiXiaomiQi22Key!",
      timestampOffsetSec: 28800,
      readbackRetries: 6,
      readbackInitialDelayMs: 300,
      readbackIntervalMs: 700,
    },
    {
      id: "compat-32b-full24-c0",
      group: "encrypted-compat",
      name: "32B 兼容加密 · 完整原始 SN · cycles=0",
      enabled: true,
      actions: ["on", "off"],
      transport: "encrypted",
      padded32: true,
      helloMode: "full13",
      commandDelayMs: 150,
      snMode: "full-raw",
      cyclesMode: "zero",
      commandByte: 0xe6,
      respByte: 0xf6,
      nonceDirByte: 0x48,
      rootKey: "MiXiaomiQi22Key!",
      timestampOffsetSec: 28800,
      readbackRetries: 6,
      readbackInitialDelayMs: 300,
      readbackIntervalMs: 700,
    },
    {
      id: "compat-32b-full24-c-real",
      group: "encrypted-compat",
      name: "32B 兼容加密 · 完整原始 SN · 真实 cycles",
      enabled: true,
      actions: ["on", "off"],
      transport: "encrypted",
      padded32: true,
      helloMode: "full13",
      commandDelayMs: 150,
      snMode: "full-raw",
      cyclesMode: "battery",
      commandByte: 0xe6,
      respByte: 0xf6,
      nonceDirByte: 0x48,
      rootKey: "MiXiaomiQi22Key!",
      timestampOffsetSec: 28800,
      readbackRetries: 6,
      readbackInitialDelayMs: 300,
      readbackIntervalMs: 700,
    },
    {
      id: "encrypted-13b-norm-c-real",
      group: "encrypted",
      name: "标准 13B 加密 · 规范化 SN · 真实 cycles",
      enabled: true,
      actions: ["on", "off"],
      transport: "encrypted",
      padded32: false,
      helloMode: "full13",
      commandDelayMs: 150,
      snMode: "normalized",
      cyclesMode: "battery",
      commandByte: 0xe6,
      respByte: 0xf6,
      nonceDirByte: 0x48,
      rootKey: "MiXiaomiQi22Key!",
      timestampOffsetSec: 28800,
      readbackRetries: 6,
      readbackInitialDelayMs: 0,
      readbackIntervalMs: 700,
    },
    {
      id: "encrypted-13b-norm-c0",
      group: "encrypted",
      name: "标准 13B 加密 · 规范化 SN · cycles=0",
      enabled: true,
      actions: ["on", "off"],
      transport: "encrypted",
      padded32: false,
      helloMode: "full13",
      commandDelayMs: 150,
      snMode: "normalized",
      cyclesMode: "zero",
      commandByte: 0xe6,
      respByte: 0xf6,
      nonceDirByte: 0x48,
      rootKey: "MiXiaomiQi22Key!",
      timestampOffsetSec: 28800,
      readbackRetries: 6,
      readbackInitialDelayMs: 0,
      readbackIntervalMs: 700,
    },
    {
      id: "encrypted-13b-full24-c-real",
      group: "encrypted",
      name: "标准 13B 加密 · 完整原始 SN · 真实 cycles",
      enabled: true,
      actions: ["on", "off"],
      transport: "encrypted",
      padded32: false,
      helloMode: "full13",
      commandDelayMs: 150,
      snMode: "full-raw",
      cyclesMode: "battery",
      commandByte: 0xe6,
      respByte: 0xf6,
      nonceDirByte: 0x48,
      rootKey: "MiXiaomiQi22Key!",
      timestampOffsetSec: 28800,
      readbackRetries: 6,
      readbackInitialDelayMs: 0,
      readbackIntervalMs: 700,
    },
    {
      id: "encrypted-13b-full24-c0",
      group: "encrypted",
      name: "标准 13B 加密 · 完整原始 SN · cycles=0",
      enabled: true,
      actions: ["on", "off"],
      transport: "encrypted",
      padded32: false,
      helloMode: "full13",
      commandDelayMs: 150,
      snMode: "full-raw",
      cyclesMode: "zero",
      commandByte: 0xe6,
      respByte: 0xf6,
      nonceDirByte: 0x48,
      rootKey: "MiXiaomiQi22Key!",
      timestampOffsetSec: 28800,
      readbackRetries: 6,
      readbackInitialDelayMs: 0,
      readbackIntervalMs: 700,
    },
    {
      id: "legacy-0x06-short",
      group: "legacy",
      name: "明文 0x06 · 5B 标准帧",
      enabled: true,
      actions: ["on", "off"],
      transport: "legacy",
      padded32: false,
      helloMode: "full13",
      commandDelayMs: 150,
      commandByte: 0x06,
      respByte: 0x16,
      readbackRetries: 6,
      readbackInitialDelayMs: 0,
      readbackIntervalMs: 700,
    },
    {
      id: "legacy-0x06-padded32",
      group: "legacy",
      name: "明文 0x06 · 32B 补零帧",
      enabled: true,
      actions: ["on", "off"],
      transport: "legacy",
      padded32: true,
      helloMode: "full13",
      commandDelayMs: 150,
      commandByte: 0x06,
      respByte: 0x16,
      readbackRetries: 6,
      readbackInitialDelayMs: 300,
      readbackIntervalMs: 700,
    },
  ],
};

export function getLoadedWpb0525sTestPack(): Wpb0525sTestPack {
  const g = globalThis as unknown as { __WPB0525S_TEST_PACK__?: Wpb0525sTestPack };
  if (g.__WPB0525S_TEST_PACK__ && Array.isArray(g.__WPB0525S_TEST_PACK__.algorithms)) {
    return g.__WPB0525S_TEST_PACK__;
  }
  return FALLBACK_WPB0525S_TEST_PACK;
}

export async function loadWpb0525sTestPack(forceReload = false): Promise<Wpb0525sTestPack> {
  const g = globalThis as unknown as { __WPB0525S_TEST_PACK__?: Wpb0525sTestPack };
  if (!forceReload && g.__WPB0525S_TEST_PACK__ && Array.isArray(g.__WPB0525S_TEST_PACK__.algorithms)) {
    return g.__WPB0525S_TEST_PACK__;
  }
  if (typeof document === "undefined") {
    return getLoadedWpb0525sTestPack();
  }
  await new Promise<void>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-wpb0525s-pack="1"]');
    if (existing && !forceReload) {
      if (g.__WPB0525S_TEST_PACK__) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => resolve(), { once: true });
      return;
    }
    if (existing && forceReload) {
      existing.remove();
    }
    const script = document.createElement("script");
    script.src = forceReload ? `${WPB0525S_TEST_PACK_URL}?t=${Date.now()}` : WPB0525S_TEST_PACK_URL;
    script.async = true;
    script.dataset.wpb0525sPack = "1";
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
  return getLoadedWpb0525sTestPack();
}

export function isWpb0525sDevice(
  modelCode?: string | null,
  modelId?: number | null,
  pack: Wpb0525sTestPack = getLoadedWpb0525sTestPack(),
): boolean {
  const code = String(modelCode || "").toUpperCase();
  const targetModels = (pack.targetModels || ["WPB0525S"]).map((m) => String(m).toUpperCase());
  const targetIds = pack.targetModelIds || [10];
  return (code !== "" && targetModels.includes(code)) || (modelId != null && targetIds.includes(modelId));
}

export function evaluateWpb0525sProtocolParity(
  pack: Wpb0525sTestPack = getLoadedWpb0525sTestPack(),
  mainProtocolVersion: string = MAIN_WPB0525S_PROTOCOL_VERSION,
): Wpb0525sParityStatus {
  const testProtocolVersion = String(pack.protocolVersion || mainProtocolVersion).trim();
  const mainProto = String(mainProtocolVersion || "").trim();
  const matched = testProtocolVersion === mainProto;
  return {
    matched,
    shouldShowTestSitePrompt: !matched,
    mainProtocolVersion: mainProto,
    testProtocolVersion,
    testSiteVersion: String(pack.testSiteVersion || "v39-0525s-test"),
    testSitePath: String(pack.testSitePath || WPB0525S_TEST_SITE_PATH),
    notice: {
      title: pack.mainSiteNotice?.title || FALLBACK_WPB0525S_TEST_PACK.mainSiteNotice.title,
      description: pack.mainSiteNotice?.description || FALLBACK_WPB0525S_TEST_PACK.mainSiteNotice.description,
      buttonText: pack.mainSiteNotice?.buttonText || FALLBACK_WPB0525S_TEST_PACK.mainSiteNotice.buttonText,
    },
  };
}

export async function buildCustomEncryptedPayload({
  snBytes,
  snMode = "slice20-raw",
  timestamp,
  health,
  cycles,
  enabled,
  commandByte = CMD.SET_QI2_ENCRYPTED,
  nonceDirByte = 0x48,
  rootKey = "MiXiaomiQi22Key!",
}: {
  snBytes: Uint8Array;
  snMode?: Wpb0525sSnMode;
  timestamp: number;
  health: number;
  cycles: number;
  enabled: boolean;
  commandByte?: number;
  nonceDirByte?: number;
  rootKey?: string;
}): Promise<Uint8Array> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) throw new Error("Web Crypto API is unavailable");

  let keySn: Uint8Array;
  if (snMode === "slice20-raw") {
    keySn = snBytes.slice(0, Math.min(20, snBytes.length));
  } else if (snMode === "full-raw") {
    keySn = snBytes;
  } else {
    keySn = normalizeSerialForKey(snBytes);
  }
  if (!keySn.length) throw new Error("Empty device serial bytes");

  const material = new Uint8Array(12);
  const tail = keySn.slice(Math.max(0, keySn.length - 8));
  material.set(tail, 8 - tail.length);
  new DataView(material.buffer).setUint32(8, timestamp >>> 0, false);

  const rootBytes = new TextEncoder().encode(rootKey);
  const hmacKey = await subtle.importKey("raw", rootBytes as BufferSource, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const mac = await subtle.sign("HMAC", hmacKey, material as BufferSource);
  const key = new Uint8Array(mac).slice(0, 16);

  const nonce = new Uint8Array(13);
  nonce[0] = nonceDirByte & 0xff;
  new DataView(nonce.buffer).setUint32(1, timestamp >>> 0, false);
  nonce[9] = commandByte & 0xff;

  const plaintext = new Uint8Array(5);
  const view = new DataView(plaintext.buffer);
  view.setUint16(0, health & 0xffff, false);
  view.setUint16(2, cycles & 0xffff, false);
  plaintext[4] = enabled ? 1 : 0;

  return aes128CcmSeal({ key, nonce, tagLength: 4 }, plaintext);
}

async function sendFrameHelper(
  client: HidClient,
  command: number,
  expectedResp: number | number[],
  timeoutMs: number,
  payload: Uint8Array,
  padded32: boolean,
  label: string,
): Promise<Uint8Array & { __command?: number }> {
  const frame = padded32 ? buildPadded32CommandFrame(command, payload) : buildCommandFrame(command, payload);
  return client.requestRawUnlocked(command, expectedResp, timeoutMs, frame, label);
}

async function pollStatusWithConfig(
  client: HidClient,
  targetEnabled: boolean,
  padded32: boolean,
  retries: number,
  initialDelayMs: number,
  intervalMs: number,
): Promise<{ settled: boolean; attempts: number; status: Qi2Status | null }> {
  let lastStatus: Qi2Status | null = null;
  for (let i = 0; i < Math.max(1, retries); i += 1) {
    const delay = i === 0 ? initialDelayMs : intervalMs;
    if (delay > 0) await sleep(delay);
    try {
      const payload = await sendFrameHelper(
        client,
        CMD.GET_QI2_STATUS,
        RESP.QI2_STATUS,
        TIMEOUT_MS.COMMAND,
        new Uint8Array(0),
        padded32,
        `0x07 (readback #${i + 1})`,
      );
      lastStatus = decodeQi2Status(payload);
      if (lastStatus.success && lastStatus.enabled === targetEnabled) {
        return { settled: true, attempts: i + 1, status: lastStatus };
      }
    } catch {
      lastStatus = null;
    }
  }
  return { settled: false, attempts: retries, status: lastStatus };
}

export interface RunWpb0525sPackOptions {
  targetEnabled: boolean;
  pack?: Wpb0525sTestPack;
  selectedAlgorithmIds?: string[];
  stopOnSuccess?: boolean;
  skipInitialStateCheck?: boolean;
  onGroupStart?: (alg: Wpb0525sAlgorithmDefinition, index: number, total: number) => void;
  onGroupFinish?: (result: Wpb0525sGroupRunResult, index: number, total: number) => void;
}

export async function runWpb0525sAlgorithmPack(
  client: HidClient,
  options: RunWpb0525sPackOptions,
): Promise<Wpb0525sRunSummary> {
  const pack = options.pack || getLoadedWpb0525sTestPack();
  const actionKey: "on" | "off" = options.targetEnabled ? "on" : "off";
  const stopOnSuccess = options.stopOnSuccess ?? pack.testSiteMeta?.defaultStopOnSuccess ?? true;
  const startedAt = new Date().toISOString();
  const startMs = Date.now();

  const selectedSet = options.selectedAlgorithmIds ? new Set(options.selectedAlgorithmIds) : null;
  const activeAlgorithms = (pack.algorithms || []).filter((alg) => {
    if (selectedSet) return selectedSet.has(alg.id);
    if (alg.enabled === false) return false;
    if (Array.isArray(alg.actions) && alg.actions.length > 0 && !alg.actions.includes(actionKey)) return false;
    return true;
  });

  const results: Wpb0525sGroupRunResult[] = [];
  let lastTimestamp = 0;

  await client.enqueue(async () => {
    for (let idx = 0; idx < activeAlgorithms.length; idx += 1) {
      const alg = activeAlgorithms[idx];
      options.onGroupStart?.(alg, idx, activeAlgorithms.length);
      const groupStart = Date.now();
      const padded32 = Boolean(alg.padded32);
      const cmdDelay = alg.commandDelayMs ?? pack.testSiteMeta?.defaultCommandDelayMs ?? 150;
      const wakeupDelay = alg.wakeupDelayMs ?? pack.testSiteMeta?.defaultWakeupDelayMs ?? 200;
      const wakeupCount = Math.max(0, alg.wakeup0x07Count ?? 0);
      const readbackRetries = alg.readbackRetries ?? TIMEOUT_MS.QI2_READBACK_RETRIES;
      const readbackInitialDelayMs = alg.readbackInitialDelayMs ?? (padded32 ? 300 : 0);
      const readbackIntervalMs = alg.readbackIntervalMs ?? TIMEOUT_MS.QI2_READBACK_INTERVAL;
      const tsOffsetSec = alg.timestampOffsetSec ?? 28800;

      let groupResult: Wpb0525sGroupRunResult;
      try {
        for (let w = 0; w < wakeupCount; w += 1) {
          try {
            await sendFrameHelper(
              client,
              CMD.GET_QI2_STATUS,
              RESP.QI2_STATUS,
              TIMEOUT_MS.COMMAND,
              new Uint8Array(0),
              padded32,
              `[${alg.id}] 0x07 wake-up #${w + 1}`,
            );
          } catch {
            // Ignore wake-up timeout
          }
          if (wakeupDelay > 0) await sleep(wakeupDelay);
        }

        // Hello handshake (monotonic timestamp)
        const rawNowSec = (Math.floor(Date.now() / 1000) + tsOffsetSec) >>> 0;
        const targetSec = rawNowSec <= lastTimestamp ? ((lastTimestamp + 1) >>> 0) : rawNowSec;
        lastTimestamp = targetSec;

        let snBytes: Uint8Array = new Uint8Array(0);
        let modelId = 10;
        let sessionTimestamp = targetSec;

        if (alg.helloMode === "empty0") {
          const emptyPayload = await sendFrameHelper(
            client,
            CMD.HELLO,
            [RESP.HELLO, RESP.ECHO],
            TIMEOUT_MS.HELLO,
            new Uint8Array(0),
            padded32,
            `[${alg.id}] Hello (empty 0x00)`,
          );
          if (emptyPayload.__command !== RESP.HELLO) {
            throw new Error("Empty 0x00 Hello did not return 0x10 device frame");
          }
          const decoded = decodeHelloResponse(emptyPayload);
          snBytes = decoded.snBytes;
          modelId = decoded.modelId;
        } else {
          const helloPayloadBytes = new Uint8Array(13);
          new DataView(helloPayloadBytes.buffer).setUint32(0, targetSec, true);
          helloPayloadBytes.set(new TextEncoder().encode("xiaomi-pb"), 4);
          const helloResp = await sendFrameHelper(
            client,
            CMD.HELLO,
            RESP.HELLO,
            TIMEOUT_MS.HELLO,
            helloPayloadBytes,
            padded32,
            `[${alg.id}] Hello (13B ts=${targetSec})`,
          );
          const decoded = decodeHelloResponse(helloResp);
          snBytes = decoded.snBytes;
          modelId = decoded.modelId;
          sessionTimestamp = targetSec;
        }

        if (cmdDelay > 0) await sleep(cmdDelay);
        const before = decodeQi2Status(
          await sendFrameHelper(
            client,
            CMD.GET_QI2_STATUS,
            RESP.QI2_STATUS,
            TIMEOUT_MS.COMMAND,
            new Uint8Array(0),
            padded32,
            `[${alg.id}] 0x07 pre-check`,
          ),
        );

        if (!options.skipInitialStateCheck && before.success && before.enabled === options.targetEnabled) {
          groupResult = {
            algorithmId: alg.id,
            group: alg.group,
            name: alg.name,
            ok: true,
            skipped: true,
            writeStatus: null,
            settled: true,
            attempts: 0,
            durationMs: Date.now() - groupStart,
            detail: `already-${actionKey} (0x17=${before.enabled ? 1 : 0})`,
            status: before,
            params: { padded32, helloMode: alg.helloMode || "full13", snMode: alg.snMode || null },
          };
          const formatted = pack.formatGroupResult ? pack.formatGroupResult(groupResult) : groupResult;
          results.push(formatted);
          options.onGroupFinish?.(formatted, idx, activeAlgorithms.length);
          if (stopOnSuccess) break;
          continue;
        }

        if (cmdDelay > 0) await sleep(cmdDelay);
        const battery = decodeBatteryInfo(
          await sendFrameHelper(
            client,
            CMD.GET_BATTERY_INFO,
            RESP.BATTERY_INFO,
            TIMEOUT_MS.COMMAND,
            new Uint8Array(0),
            padded32,
            `[${alg.id}] 0x01 battery`,
          ),
        );

        const cyclesVal =
          typeof alg.cyclesMode === "number"
            ? alg.cyclesMode
            : alg.cyclesMode === "zero"
              ? 0
              : battery.cycleCount;

        if (typeof alg.run === "function") {
          const customOut = await alg.run({
            client,
            targetEnabled: options.targetEnabled,
            algorithm: alg,
            snBytes,
            modelId,
            health: battery.health,
            cycles: cyclesVal,
            timestamp: sessionTimestamp,
            sleep,
            buildCommandFrame,
            buildPadded32CommandFrame,
            buildHelloFrame,
            buildPadded32HelloFrame,
            buildCustomEncryptedPayload,
            log: (direction, label, meta = null) => client.emitLog(direction, `[${alg.id}] ${label}`, null, meta),
          });
          groupResult = {
            algorithmId: alg.id,
            group: alg.group,
            name: alg.name,
            ok: Boolean(customOut.ok),
            skipped: Boolean(customOut.skipped),
            writeStatus: customOut.writeStatus ?? null,
            settled: Boolean(customOut.settled),
            attempts: customOut.attempts ?? 0,
            durationMs: Date.now() - groupStart,
            detail: customOut.detail || (customOut.ok ? "custom-ok" : "custom-rejected"),
            status: customOut.status ?? null,
            params: { transport: "custom", padded32, helloMode: alg.helloMode || "full13" },
            extra: customOut.extra ?? null,
          };
        } else if (alg.transport === "legacy") {
          const cmdByte = alg.commandByte ?? CMD.SET_QI2_LEGACY;
          const respByte = alg.respByte ?? RESP.SET_QI2_LEGACY;
          if (cmdDelay > 0) await sleep(cmdDelay);
          const writeResp = decodeQi2WriteResponse(
            await sendFrameHelper(
              client,
              cmdByte,
              respByte,
              TIMEOUT_MS.QI2_LEGACY_WRITE,
              new Uint8Array([options.targetEnabled ? 1 : 0]),
              padded32,
              `[${alg.id}] 0x${cmdByte.toString(16).toUpperCase()} legacy`,
            ),
          );
          if (!writeResp.success) {
            groupResult = {
              algorithmId: alg.id,
              group: alg.group,
              name: alg.name,
              ok: false,
              skipped: false,
              writeStatus: writeResp.statusCode,
              settled: false,
              attempts: 0,
              durationMs: Date.now() - groupStart,
              detail: `rejected (status=${writeResp.statusCode})`,
              params: { transport: "legacy", padded32, cmdByte },
            };
          } else {
            const poll = await pollStatusWithConfig(
              client,
              options.targetEnabled,
              padded32,
              readbackRetries,
              readbackInitialDelayMs,
              readbackIntervalMs,
            );
            groupResult = {
              algorithmId: alg.id,
              group: alg.group,
              name: alg.name,
              ok: poll.settled,
              skipped: false,
              writeStatus: writeResp.statusCode,
              settled: poll.settled,
              attempts: poll.attempts,
              durationMs: Date.now() - groupStart,
              detail: poll.settled ? `ok (readback=${poll.attempts})` : "write status=0 but readback mismatch",
              status: poll.status,
              params: { transport: "legacy", padded32, cmdByte },
            };
          }
        } else {
          const cmdByte = alg.commandByte ?? CMD.SET_QI2_ENCRYPTED;
          const respByte = alg.respByte ?? RESP.SET_QI2_ENCRYPTED;
          const encrypted = await buildCustomEncryptedPayload({
            snBytes,
            snMode: alg.snMode || "slice20-raw",
            timestamp: sessionTimestamp,
            health: battery.health,
            cycles: cyclesVal,
            enabled: options.targetEnabled,
            commandByte: cmdByte,
            nonceDirByte: alg.nonceDirByte ?? 0x48,
            rootKey: alg.rootKey || "MiXiaomiQi22Key!",
          });
          if (cmdDelay > 0) await sleep(cmdDelay);
          const writeResp = decodeQi2WriteResponse(
            await sendFrameHelper(
              client,
              cmdByte,
              respByte,
              TIMEOUT_MS.QI2_ENCRYPTED_WRITE,
              encrypted,
              padded32,
              `[${alg.id}] 0x${cmdByte.toString(16).toUpperCase()} (${alg.snMode || "slice20-raw"}, c=${cyclesVal})`,
            ),
          );
          if (!writeResp.success) {
            groupResult = {
              algorithmId: alg.id,
              group: alg.group,
              name: alg.name,
              ok: false,
              skipped: false,
              writeStatus: writeResp.statusCode,
              settled: false,
              attempts: 0,
              durationMs: Date.now() - groupStart,
              detail: `rejected (status=${writeResp.statusCode})`,
              params: {
                transport: "encrypted",
                padded32,
                helloMode: alg.helloMode || "full13",
                snMode: alg.snMode || "slice20-raw",
                cycles: cyclesVal,
                timestamp: sessionTimestamp,
              },
            };
          } else {
            const poll = await pollStatusWithConfig(
              client,
              options.targetEnabled,
              padded32,
              readbackRetries,
              readbackInitialDelayMs,
              readbackIntervalMs,
            );
            groupResult = {
              algorithmId: alg.id,
              group: alg.group,
              name: alg.name,
              ok: poll.settled,
              skipped: false,
              writeStatus: writeResp.statusCode,
              settled: poll.settled,
              attempts: poll.attempts,
              durationMs: Date.now() - groupStart,
              detail: poll.settled ? `ok (readback=${poll.attempts})` : "write status=0 but readback mismatch",
              status: poll.status,
              params: {
                transport: "encrypted",
                padded32,
                helloMode: alg.helloMode || "full13",
                snMode: alg.snMode || "slice20-raw",
                cycles: cyclesVal,
                timestamp: sessionTimestamp,
              },
            };
          }
        }
      } catch (err) {
        groupResult = {
          algorithmId: alg.id,
          group: alg.group,
          name: alg.name,
          ok: false,
          skipped: false,
          writeStatus: null,
          settled: false,
          attempts: 0,
          durationMs: Date.now() - groupStart,
          detail: err instanceof Error ? err.message : String(err),
          params: { transport: alg.transport, padded32 },
        };
      }

      const formatted = pack.formatGroupResult ? pack.formatGroupResult(groupResult) : groupResult;
      results.push(formatted);
      options.onGroupFinish?.(formatted, idx, activeAlgorithms.length);
      if (stopOnSuccess && formatted.ok) break;
    }
  });

  const finishedAt = new Date().toISOString();
  const durationMs = Date.now() - startMs;
  if (pack.formatSummary) {
    return pack.formatSummary({
      targetEnabled: options.targetEnabled,
      startedAt,
      finishedAt,
      durationMs,
      results,
    });
  }
  const passed = results.filter((r) => r.ok && !r.skipped);
  const skipped = results.filter((r) => r.skipped);
  const failed = results.filter((r) => !r.ok);
  return {
    testSiteVersion: pack.testSiteVersion,
    protocolVersion: pack.protocolVersion,
    targetEnabled: options.targetEnabled,
    totalGroups: results.length,
    passedCount: passed.length,
    skippedCount: skipped.length,
    failedCount: failed.length,
    winningAlgorithmId: passed[0]?.algorithmId || null,
    overallOk: passed.length > 0 || (skipped.length > 0 && failed.length === 0),
    startedAt,
    finishedAt,
    durationMs,
    results,
  };
}
