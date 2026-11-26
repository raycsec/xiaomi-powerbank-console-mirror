/**
 * ============================================================================
 * WPB0525S 独立可热改测试站算法与配置包 (0525s-test-pack.js)
 * ============================================================================
 * 本文件为纯标准 ES2020 JavaScript（不经 Vite 混淆压缩、不带 Hash 文件名）。
 * 后续适配新算法、调整测试站版本号、控制主站是否提示跳转测试站、或定制
 * 所有测试接口与调试日志输出时，只需直接修改本文件并上传覆盖即可，无需重新编译主站。
 *
 * 【核心控制说明】
 * 1. protocolVersion:
 *    - 主站内置常量 MAIN_WPB0525S_PROTOCOL_VERSION = "0525s-proto-2026.11.27-r1"
 *    - 当本文件 protocolVersion 与主站一致时：主站连接 WPB0525S 不显示测试站跳转提示。
 *    - 当本文件 protocolVersion 与主站不一致时（例如新增不确定算法后改为 r2）：
 *      主站连接 WPB0525S 会自动显示提示与“前往 0525S 测试站”跳转按钮。
 *
 * 2. algorithms:
 *    - 支持任意数量算法组（无组数上限），UI、执行器、调试日志与上报数据全自动适配。
 *    - 每一组既可用声明式参数（helloMode / padded32 / snMode / cyclesMode / rootKey 等），
 *      也可直接提供自定义 async run(ctx) 函数实现任意全新协议/指令。
 *
 * 3. 输出定制钩子:
 *    - formatDebugEntry / formatGroupResult / formatSummary / formatTelemetryPayload / formatApiOutput
 *      可自由增删改所有界面反馈字段、导出报告字段与测试接口上报 JSON 结构。
 * ============================================================================
 */
(function initWpb0525sTestPack(globalScope) {
  "use strict";

  const PACK = {
    /** 测试站显示版本号 & 遥测上报 appVersion（可直接修改） */
    testSiteVersion: "v39-0525s-test.1",

    /**
     * 协议一致性标记（用于与主站 MAIN_WPB0525S_PROTOCOL_VERSION 比对）
     * - 一致：主站连接 WPB0525S 时隐藏测试站跳转提示（当前默认一致）
     * - 不一致：主站连接 WPB0525S 时自动展示测试站跳转按钮与说明
     */
    protocolVersion: "0525s-proto-2026.11.27-r1",

    /** 测试站路由路径（与 Worker 路由一致） */
    testSitePath: "/0525s-test",

    /** 适用机型过滤（用于主站连接后判断是否检查协议一致性） */
    targetModels: ["WPB0525S"],
    targetModelIds: [10],

    /** 主站检测到协议标记不一致时显示的提示文案（可直接修改） */
    mainSiteNotice: {
      title: "检测到 0525S 测试站有新实验算法",
      description:
        "当前测试站正在尝试最新的不确定算法，与主站稳定协议版本不同，建议跳转至测试站尝试并反馈调试日志。",
      buttonText: "前往 0525S 测试站",
    },

    /** 测试站页面顶部说明与默认执行参数 */
    testSiteMeta: {
      title: "WPB0525S 实验算法测试站",
      subtitle: "独立热更新算法包驱动 · 自适应不限算法组数 · 实时抓包与全量遥测反馈",
      defaultStopOnSuccess: true,
      defaultCommandDelayMs: 150,
      defaultWakeupDelayMs: 200,
    },

    /** 所有测试接口路径与附加配置（可直接修改） */
    apiConfig: {
      reportEndpoint: "/api/0525s-test/report",
      fallbackReportEndpoint: "/api/qi2-report",
      metaEndpoint: "/api/0525s-test/meta",
      statsEndpoint: "/api/qi2-stats",
      extraHeaders: {},
    },

    /**
     * ========================================================================
     * 算法组列表（不限组数，可任意增、删、改顺序与参数）
     * 当前 10 组与主站 WPB0525S (encrypted-compat -> encrypted -> legacy) 完全对齐。
     *
     * 可用声明式字段：
     * - id: 唯一标识
     * - group: 分组标签（如 "encrypted-compat" | "encrypted" | "legacy" | 自定义）
     * - name: 显示名称
     * - description: 算法说明
     * - enabled: boolean（是否默认勾选启用）
     * - actions: ["on", "off"]（支持的开关方向）
     * - transport: "encrypted" | "legacy" | "custom"
     * - padded32: boolean（是否补零至 32B HID 帧）
     * - helloMode: "full13" | "empty0"（full13=13B带时间戳Hello；empty0=空载荷0x00）
     * - wakeup0x07Count: number（执行前预唤醒 0x07 次数）
     * - wakeupDelayMs: number（预唤醒间隔）
     * - commandDelayMs: number（命令间隔）
     * - snMode: "slice20-raw" | "normalized" | "full-raw"
     * - cyclesMode: "zero" | "battery" | number
     * - commandByte: number（默认加密 0xE6，明文 0x06）
     * - respByte: number（默认加密 0xF6，明文 0x16）
     * - nonceDirByte: number（默认 0x48）
     * - rootKey: string（默认 "MiXiaomiQi22Key!"）
     * - timestampOffsetSec: number（默认 28800 即 UTC+8）
     * - readbackRetries: number（回读 0x07 次数）
     * - readbackInitialDelayMs: number
     * - readbackIntervalMs: number
     * - run?: async (ctx) => ({ ok, writeStatus, settled, attempts, detail, extra })
     * ========================================================================
     */
    algorithms: [
      {
        id: "compat-32b-slice20-c0",
        group: "encrypted-compat",
        name: "32B 兼容加密 · 20B 截断 SN · cycles=0",
        description: "对齐第三方工具 32B 补零帧 + payload.slice(2,22) + cycles=0，带 13B Hello 时间戳同步",
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
        description: "32B 补零帧 + 20B 截断 SN + 电池真实循环次数",
        enabled: true,
        actions: ["on", "off"],
        transport: "encrypted",
        padded32: true,
        helloMode: "full13",
        wakeup0x07Count: 0,
        wakeupDelayMs: 0,
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
        description: "32B 补零帧 + 完整 24B 原始 SN（含末尾 0x00）+ cycles=0",
        enabled: true,
        actions: ["on", "off"],
        transport: "encrypted",
        padded32: true,
        helloMode: "full13",
        wakeup0x07Count: 0,
        wakeupDelayMs: 0,
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
        description: "32B 补零帧 + 完整 24B 原始 SN + 真实循环次数",
        enabled: true,
        actions: ["on", "off"],
        transport: "encrypted",
        padded32: true,
        helloMode: "full13",
        wakeup0x07Count: 0,
        wakeupDelayMs: 0,
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
        description: "官方 13B 紧凑帧 + 去尾零规范化 SN + 电池真实循环次数",
        enabled: true,
        actions: ["on", "off"],
        transport: "encrypted",
        padded32: false,
        helloMode: "full13",
        wakeup0x07Count: 0,
        wakeupDelayMs: 0,
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
        description: "官方 13B 紧凑帧 + 去尾零规范化 SN + cycles=0",
        enabled: true,
        actions: ["on", "off"],
        transport: "encrypted",
        padded32: false,
        helloMode: "full13",
        wakeup0x07Count: 0,
        wakeupDelayMs: 0,
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
        description: "官方 13B 紧凑帧 + 完整 24B 原始 SN + 真实循环次数",
        enabled: true,
        actions: ["on", "off"],
        transport: "encrypted",
        padded32: false,
        helloMode: "full13",
        wakeup0x07Count: 0,
        wakeupDelayMs: 0,
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
        description: "官方 13B 紧凑帧 + 完整 24B 原始 SN + cycles=0",
        enabled: true,
        actions: ["on", "off"],
        transport: "encrypted",
        padded32: false,
        helloMode: "full13",
        wakeup0x07Count: 0,
        wakeupDelayMs: 0,
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
        description: "传统 0x06 明文写入（5B 紧凑帧），适配放开明文通道的固件",
        enabled: true,
        actions: ["on", "off"],
        transport: "legacy",
        padded32: false,
        helloMode: "full13",
        wakeup0x07Count: 0,
        wakeupDelayMs: 0,
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
        description: "传统 0x06 明文写入（32B 补零帧）",
        enabled: true,
        actions: ["on", "off"],
        transport: "legacy",
        padded32: true,
        helloMode: "full13",
        wakeup0x07Count: 0,
        wakeupDelayMs: 0,
        commandDelayMs: 150,
        commandByte: 0x06,
        respByte: 0x16,
        readbackRetries: 6,
        readbackInitialDelayMs: 300,
        readbackIntervalMs: 700,
      },
    ],

    /**
     * ========================================================================
     * 可定制测试接口与调试日志输出钩子（直接修改即可改变所有输出结构）
     * ========================================================================
     */
    formatDebugEntry(entry) {
      return {
        at: entry.at || new Date().toISOString(),
        direction: entry.direction || "INFO",
        algorithmId: entry.algorithmId || null,
        label: entry.label || "",
        hex: entry.hex || "",
        meta: entry.meta || null,
      };
    },

    formatGroupResult(result) {
      return {
        algorithmId: result.algorithmId,
        group: result.group,
        name: result.name,
        ok: Boolean(result.ok),
        skipped: Boolean(result.skipped),
        writeStatus: result.writeStatus ?? null,
        settled: Boolean(result.settled),
        attempts: result.attempts ?? 0,
        durationMs: result.durationMs ?? 0,
        detail: result.detail || "",
        params: result.params || {},
        extra: result.extra || null,
      };
    },

    formatSummary(runSummary) {
      const results = Array.isArray(runSummary.results) ? runSummary.results : [];
      const passed = results.filter((r) => r.ok && !r.skipped);
      const skipped = results.filter((r) => r.skipped);
      const failed = results.filter((r) => !r.ok);
      return {
        testSiteVersion: PACK.testSiteVersion,
        protocolVersion: PACK.protocolVersion,
        targetEnabled: Boolean(runSummary.targetEnabled),
        totalGroups: results.length,
        passedCount: passed.length,
        skippedCount: skipped.length,
        failedCount: failed.length,
        winningAlgorithmId: passed[0]?.algorithmId || null,
        overallOk: passed.length > 0 || (skipped.length > 0 && failed.length === 0),
        startedAt: runSummary.startedAt,
        finishedAt: runSummary.finishedAt,
        durationMs: runSummary.durationMs,
        results,
      };
    },

    formatTelemetryPayload(basePayload, summary) {
      const compactResults = (summary?.results || []).map((r) => ({
        id: r.algorithmId,
        group: r.group,
        ok: r.ok,
        skipped: r.skipped,
        writeStatus: r.writeStatus,
        settled: r.settled,
        ms: r.durationMs,
        detail: r.detail,
      }));
      const statusChain = compactResults
        .map((r) => `${r.id}=${r.skipped ? "skip" : r.ok ? "ok" : r.writeStatus ?? "err"}`)
        .join(", ");

      return {
        ...basePayload,
        appVersion: PACK.testSiteVersion,
        detail:
          summary?.winningAlgorithmId
            ? `0525s-test:${summary.winningAlgorithmId} (${compactResults.length} groups)`
            : summary?.skippedCount && !summary?.failedCount
              ? `0525s-test-skipped (${compactResults.length} groups)`
              : `0525s-test-failed(${compactResults.length}): ${statusChain}`.slice(0, 400),
        info: {
          ...(basePayload.info || {}),
          testSiteVersion: PACK.testSiteVersion,
          protocolVersion: PACK.protocolVersion,
          totalGroups: compactResults.length,
          passedCount: summary?.passedCount ?? 0,
          skippedCount: summary?.skippedCount ?? 0,
          failedCount: summary?.failedCount ?? 0,
          winningAlgorithmId: summary?.winningAlgorithmId ?? null,
          groupResults: compactResults,
        },
      };
    },

    formatApiOutput(endpoint, defaultData) {
      return {
        ...defaultData,
        endpoint,
        testSiteVersion: PACK.testSiteVersion,
        protocolVersion: PACK.protocolVersion,
        algorithmCount: Array.isArray(PACK.algorithms) ? PACK.algorithms.length : 0,
      };
    },
  };

  if (globalScope && typeof globalScope === "object") {
    globalScope.__WPB0525S_TEST_PACK__ = PACK;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = PACK;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this);
