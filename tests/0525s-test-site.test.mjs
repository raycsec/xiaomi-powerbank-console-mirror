import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import worker from "../worker/index.js";
import { WORKER_MAIN_0525S_PROTOCOL_VERSION } from "../worker/api.js";

const PACK_PATH = path.resolve("public/0525s-test-pack.js");
const PACK_SOURCE = fs.readFileSync(PACK_PATH, "utf8");

function loadPackInSandbox() {
  const ctx = { globalThis: {} };
  ctx.window = ctx.globalThis;
  vm.runInNewContext(PACK_SOURCE, ctx);
  return ctx.globalThis.__WPB0525S_TEST_PACK__;
}

function createMockR2(files) {
  return {
    async get(key) {
      if (!(key in files)) return null;
      const value = files[key];
      return {
        body: value,
        etag: `etag-${key}`,
        async text() {
          return value;
        },
      };
    },
  };
}

const SAMPLE_BUILT_HTML = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8" /><title>小米移动电源详情</title><script src="/0525s-test-pack.js" data-wpb0525s-pack="1"></script><script type="module" crossorigin src="/eco--usb-device-web/static/assets/index-abc123.js"></script></head><body><div id="root"></div></body></html>`;

test("0525s-test-pack.js loads cleanly as plain JS and aligns with main protocol version by default", () => {
  const pack = loadPackInSandbox();
  assert.ok(pack, "pack should attach to globalThis.__WPB0525S_TEST_PACK__");
  assert.equal(pack.protocolVersion, WORKER_MAIN_0525S_PROTOCOL_VERSION);
  assert.equal(pack.testSitePath, "/0525s-test");
  assert.ok(Array.isArray(pack.algorithms) && pack.algorithms.length === 10);
  assert.equal(typeof pack.formatDebugEntry, "function");
  assert.equal(typeof pack.formatGroupResult, "function");
  assert.equal(typeof pack.formatSummary, "function");
  assert.equal(typeof pack.formatTelemetryPayload, "function");
  assert.equal(typeof pack.formatApiOutput, "function");
});

test("0525s-test-pack.js supports arbitrary N algorithm groups without truncation and customizable version/outputs", () => {
  const pack = loadPackInSandbox();
  pack.testSiteVersion = "v39-custom-exp.9";
  pack.protocolVersion = "0525s-proto-2026.12.01-r2";

  const syntheticResults = Array.from({ length: 18 }, (_, i) =>
    pack.formatGroupResult({
      algorithmId: `exp-group-${i + 1}`,
      group: i < 10 ? "encrypted-exp" : "custom-exp",
      name: `实验组 #${i + 1}`,
      ok: i === 17,
      skipped: false,
      writeStatus: i === 17 ? 0 : 1,
      settled: i === 17,
      attempts: i === 17 ? 1 : 0,
      durationMs: 120 + i,
      detail: i === 17 ? "ok" : "rejected (status=1)",
      params: { idx: i + 1 },
    }),
  );

  const summary = pack.formatSummary({
    targetEnabled: true,
    startedAt: "2026-11-27T00:00:00.000Z",
    finishedAt: "2026-11-27T00:00:05.000Z",
    durationMs: 5000,
    results: syntheticResults,
  });

  assert.equal(summary.testSiteVersion, "v39-custom-exp.9");
  assert.equal(summary.protocolVersion, "0525s-proto-2026.12.01-r2");
  assert.equal(summary.totalGroups, 18);
  assert.equal(summary.passedCount, 1);
  assert.equal(summary.failedCount, 17);
  assert.equal(summary.winningAlgorithmId, "exp-group-18");
  assert.equal(summary.overallOk, true);

  const telemetry = pack.formatTelemetryPayload(
    { model: "WPB0525S", snHash: "0123456789abcdef", action: "on", ok: true, info: { modelId: 10 } },
    summary,
  );
  assert.equal(telemetry.appVersion, "v39-custom-exp.9");
  assert.equal(telemetry.info.totalGroups, 18);
  assert.equal(telemetry.info.groupResults.length, 18);
  assert.equal(telemetry.info.winningAlgorithmId, "exp-group-18");

  const apiOut = pack.formatApiOutput("/0525s-test/export", { custom: true });
  assert.equal(apiOut.testSiteVersion, "v39-custom-exp.9");
  assert.equal(apiOut.protocolVersion, "0525s-proto-2026.12.01-r2");
  assert.equal(apiOut.custom, true);
});

test("Merged Worker serves /0525s-test, /0525s-test-pack.js (no-cache), and /api/0525s-test/* endpoints", async () => {
  const mockR2 = createMockR2({
    "eco--usb-device-web/static/index.html": SAMPLE_BUILT_HTML,
    "eco--usb-device-web/static/0525s-test-pack.js": PACK_SOURCE,
  });
  const env = { XIAOMI_MIRROR: mockR2, MIRROR_DEV_MODE: "1" };

  // 1. /0525s-test HTML route served by same merged Worker
  const pageRes = await worker.fetch(new Request("https://example.com/0525s-test"), env);
  assert.equal(pageRes.status, 200);
  const html = await pageRes.text();
  assert.ok(html.includes("/0525s-test-pack.js"));
  assert.match(html, /<script nonce="[a-f0-9]+" src="\/0525s-test-pack\.js"/);

  // 2. /0525s-test/ trailing slash also supported
  const pageSlashRes = await worker.fetch(new Request("https://example.com/0525s-test/"), env);
  assert.equal(pageSlashRes.status, 200);

  // 3. /0525s-test-pack.js served with no-cache for hot updates
  const packRes = await worker.fetch(new Request("https://example.com/0525s-test-pack.js"), env);
  assert.equal(packRes.status, 200);
  assert.match(packRes.headers.get("content-type") || "", /javascript/);
  assert.equal(packRes.headers.get("cache-control"), "no-cache, must-revalidate");
  assert.ok((await packRes.text()).includes("__WPB0525S_TEST_PACK__"));

  // 4. GET /api/0525s-test/meta
  const metaRes = await worker.fetch(new Request("https://example.com/api/0525s-test/meta"), env);
  assert.equal(metaRes.status, 200);
  const metaJson = await metaRes.json();
  assert.equal(metaJson.ok, true);
  assert.equal(metaJson.mergedWorker, true);
  assert.equal(metaJson.testSitePath, "/0525s-test");
  assert.equal(metaJson.packUrl, "/0525s-test-pack.js");
  assert.equal(metaJson.mainProtocolVersion, WORKER_MAIN_0525S_PROTOCOL_VERSION);

  // 5. POST /api/0525s-test/report enforces auth when MIRROR_DEV_MODE != 1, accepts N-group adaptive payload when authorized
  const reportBody = JSON.stringify({
    model: "WPB0525S",
    snHash: "0123456789abcdef",
    action: "on",
    ok: false,
    appVersion: "v39-0525s-test.1",
    detail: "0525s-test-failed(20)",
    info: {
      totalGroups: 20,
      groupResults: Array.from({ length: 20 }, (_, i) => ({ id: `g-${i + 1}`, ok: false, writeStatus: 1 })),
    },
  });
  const unauthRes = await worker.fetch(
    new Request("https://example.com/api/0525s-test/report", { method: "POST", body: reportBody }),
    { XIAOMI_MIRROR: mockR2 },
  );
  assert.equal(unauthRes.status, 403);

  const okReportRes = await worker.fetch(
    new Request("https://example.com/api/0525s-test/report", { method: "POST", body: reportBody }),
    env,
  );
  assert.equal(okReportRes.status, 200);
  const okReportJson = await okReportRes.json();
  assert.equal(okReportJson.ok, true);
  assert.equal(okReportJson.adaptive, true);
  assert.equal(okReportJson.groupCount, 20);
});
