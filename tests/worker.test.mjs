import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker/index.js";
import { sha256Hex } from "../worker/crypto.js";

function extractCookies(headers) {
  const map = {};
  const list = headers.getSetCookie ? headers.getSetCookie() : (headers.get("set-cookie") || "").split(/,(?=[^;]+=)/);
  for (const item of list) {
    const m = item.trim().match(/^([^=]+)=([^;]*)/);
    if (m) map[m[1]] = m[2];
  }
  return map;
}

function createMockR2(files) {
  return {
    async get(key) {
      if (!(key in files)) return null;
      const value = files[key];
      return {
        body: value,
        async text() {
          return value;
        },
      };
    },
  };
}

const SAMPLE_BUILT_HTML = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8" /><title>小米移动电源详情</title><script type="module" crossorigin src="/eco--usb-device-web/static/assets/index-abc123.js"></script><link rel="stylesheet" crossorigin href="/eco--usb-device-web/static/assets/index-abc123.css"></head><body><div id="root"></div></body></html>`;

test("Worker serves xiaomi.svg with lbs-info header and /api/qi2-stats", async () => {
  const svgReq = new Request("https://example.com/eco--usb-device-web/static/xiaomi.svg");
  svgReq.cf = { country: "JP" };
  const svgRes = await worker.fetch(svgReq, {});
  assert.equal(svgRes.status, 200);
  assert.equal(svgRes.headers.get("lbs-info"), "JP");

  const statsRes = await worker.fetch(new Request("https://example.com/api/qi2-stats?model=WPB1026S"), {});
  assert.equal(statsRes.status, 200);
  const statsJson = await statsRes.json();
  assert.equal(statsJson.ok, true);
  assert.equal(statsJson.model, "WPB1026S");
});

test("Worker enforces auth on /api/qi2-report unless DEV_MODE=1", async () => {
  const body = JSON.stringify({ model: "WPB1026S", snHash: "0123456789abcdef", action: "on", ok: true });
  const unauthRes = await worker.fetch(
    new Request("https://example.com/api/qi2-report", { method: "POST", body }),
    {},
  );
  assert.equal(unauthRes.status, 403);

  const devRes = await worker.fetch(
    new Request("https://example.com/api/qi2-report", { method: "POST", body }),
    { MIRROR_DEV_MODE: "1" },
  );
  assert.equal(devRes.status, 200);
});

test("Worker full gate flow serves built R2 index.html with nonce & blocks direct index.html bypass", async () => {
  const mockR2 = createMockR2({
    "eco--usb-device-web/static/index.html": SAMPLE_BUILT_HTML,
    "eco--usb-device-web/static/assets/index-abc123.js": "console.log('ok');",
  });
  const env = { XIAOMI_MIRROR: mockR2, __TEST_MIN_WAIT_MS: 0 };

  const directHtmlRes = await worker.fetch(
    new Request("https://example.com/eco--usb-device-web/static/index.html"),
    env,
  );
  assert.equal(directHtmlRes.status, 404);

  const assetRes = await worker.fetch(
    new Request("https://example.com/eco--usb-device-web/static/assets/index-abc123.js"),
    env,
  );
  assert.equal(assetRes.status, 200);
  assert.match(assetRes.headers.get("content-type") || "", /javascript/);

  const initReq = new Request("https://example.com/");
  initReq.cf = { country: "CN" };
  const initRes = await worker.fetch(initReq, env);
  assert.equal(initRes.status, 200);
  const html = await initRes.text();
  assert.ok(html.includes("知情同意书"));
  assert.ok(html.includes("cn-modal"));
  const cookies = extractCookies(initRes.headers);
  assert.ok(cookies.c_t && cookies.ch_t && cookies.ch_s && cookies.pt_m);
  const cookieHeader = `c_t=${cookies.c_t}; ch_t=${cookies.ch_t}; ch_s=${cookies.ch_s}; pt_m=${cookies.pt_m}`;

  let nonce = 0;
  let sig = "";
  while (true) {
    sig = await sha256Hex(`${cookies.ch_t}${nonce}${cookies.ch_s}`);
    if (sig.startsWith("0000")) break;
    nonce += 1;
  }
  const integrity = await sha256Hex(`${cookies.ch_t}${cookies.pt_m}HTMLBodyElement${cookies.ch_s}`);

  const fpReq = new Request("https://example.com/api/report-fingerprint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      "X-CSRF-Token": cookies.c_t,
      "X-Page-Integrity": integrity,
    },
    body: JSON.stringify({ visitId: "test-visit-1", nonce, sig }),
  });
  fpReq.cf = { country: "CN" };
  const fpRes = await worker.fetch(fpReq, env);
  assert.equal(fpRes.status, 200);
  const { ott } = await fpRes.json();
  assert.ok(ott);

  const tooFastRes = await worker.fetch(
    new Request("https://example.com/api/agree", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ott }),
    }),
    { XIAOMI_MIRROR: mockR2 },
  );
  assert.equal(tooFastRes.status, 403);
  assert.equal(await tooFastRes.text(), "Too Fast");

  const missingCnRes = await worker.fetch(
    new Request("https://example.com/api/agree", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ott }),
    }),
    env,
  );
  assert.equal(missingCnRes.status, 403);
  assert.equal(await missingCnRes.text(), "Requires Action Token");

  const cnRes = await worker.fetch(new Request("https://example.com/api/confirm-cn", { method: "POST" }), env);
  const { action_token } = await cnRes.json();
  const agreeRes = await worker.fetch(
    new Request("https://example.com/api/agree", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ott, action_token }),
    }),
    env,
  );
  assert.equal(agreeRes.status, 200);
  const authCookies = extractCookies(agreeRes.headers);
  assert.ok(authCookies.m_sid && authCookies.m_agree);

  const replayCnRes = await worker.fetch(new Request("https://example.com/api/confirm-cn", { method: "POST" }), env);
  const { action_token: tok2 } = await replayCnRes.json();
  const replayRes = await worker.fetch(
    new Request("https://example.com/api/agree", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ott, action_token: tok2 }),
    }),
    env,
  );
  assert.equal(replayRes.status, 403);
  assert.equal(await replayRes.text(), "Token Already Used");

  const appRes = await worker.fetch(
    new Request("https://example.com/", {
      headers: { Cookie: `m_sid=${authCookies.m_sid}; m_agree=${authCookies.m_agree}` },
    }),
    env,
  );
  assert.equal(appRes.status, 200);
  const appHtml = await appRes.text();
  assert.ok(appHtml.includes('<div id="root"></div>'));
  assert.ok(appHtml.includes("/eco--usb-device-web/static/assets/index-abc123.js"));
  assert.ok(!appHtml.includes("/src/main.jsx"));
  assert.match(appHtml, /<script nonce="[0-9a-f]+" type="module"/);

  const missingBuildRes = await worker.fetch(
    new Request("https://example.com/", {
      headers: { Cookie: `m_sid=${authCookies.m_sid}; m_agree=${authCookies.m_agree}` },
    }),
    { XIAOMI_MIRROR: createMockR2({}) },
  );
  assert.equal(missingBuildRes.status, 503);
});

test("Worker ?error=1 clears cookies with 403 and ?reject=1 returns 404", async () => {
  const errRes = await worker.fetch(new Request("https://example.com/?error=1"), {});
  assert.equal(errRes.status, 403);
  assert.ok((await errRes.text()).includes("安全令牌校验失败"));

  const rejRes = await worker.fetch(new Request("https://example.com/?reject=1"), {});
  assert.equal(rejRes.status, 404);
});

test("Worker CN optimization: same-origin R2 edge cache, ETag 304, Link preload & strict same-origin CSP", async () => {
  let r2Reads = 0;
  const mockR2 = {
    async get(key) {
      r2Reads += 1;
      if (key === "eco--usb-device-web/static/assets/index-cn1.js") {
        return { body: "console.log('cn-opt');", httpEtag: '"etag-cn1"' };
      }
      if (key === "eco--usb-device-web/static/index.html") {
        const html = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8" /><link rel="stylesheet" crossorigin href="/eco--usb-device-web/static/assets/index-cn1.css"><script type="module" crossorigin src="/eco--usb-device-web/static/assets/index-cn1.js"></script></head><body><div id="root"></div></body></html>`;
        return { body: html, async text() { return html; } };
      }
      return null;
    },
  };
  const cacheMap = new Map();
  const mockCache = {
    async match(req) {
      const hit = cacheMap.get(req.url);
      return hit ? hit.clone() : undefined;
    },
    async put(req, res) {
      cacheMap.set(req.url, res.clone());
    },
  };
  const env = { XIAOMI_MIRROR: mockR2, __EDGE_CACHE: mockCache, MIRROR_DEV_MODE: "1" };

  // 1st R2 asset request hits origin & caches at edge
  const a1 = await worker.fetch(new Request("https://mirror.example.com/eco--usb-device-web/static/assets/index-cn1.js"), env);
  assert.equal(a1.status, 200);
  assert.equal(a1.headers.get("etag"), '"etag-cn1"');
  assert.equal(a1.headers.get("cache-control"), "public, max-age=31536000, immutable");
  assert.equal(r2Reads, 1);

  // 2nd R2 asset request served from edge cache without hitting R2 origin
  const a2 = await worker.fetch(new Request("https://mirror.example.com/eco--usb-device-web/static/assets/index-cn1.js"), env);
  assert.equal(a2.status, 200);
  assert.equal(r2Reads, 1);

  // Conditional request with matching ETag returns 304 Not Modified
  const a3 = await worker.fetch(
    new Request("https://mirror.example.com/eco--usb-device-web/static/assets/index-cn1.js", {
      headers: { "If-None-Match": '"etag-cn1"' },
    }),
    env,
  );
  assert.equal(a3.status, 304);

  // Authorized HTML carries same-origin Link preload headers & strict same-origin CSP
  const pageRes = await worker.fetch(new Request("https://mirror.example.com/"), env);
  assert.equal(pageRes.status, 200);
  const linkHeader = pageRes.headers.get("link") || "";
  assert.ok(linkHeader.includes("</eco--usb-device-web/static/assets/index-cn1.css>; rel=preload; as=style"));
  assert.ok(linkHeader.includes("</eco--usb-device-web/static/assets/index-cn1.js>; rel=modulepreload"));
  const csp = pageRes.headers.get("content-security-policy") || "";
  assert.ok(csp.includes("connect-src 'self'"));
  assert.ok(!csp.includes("r2.dev"));
});
