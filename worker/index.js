import {
  ensureTables,
  handleAgree,
  handleConfirmCn,
  handleDestroyToken,
  handleQi2Report,
  handleQi2Stats,
  handleReportFingerprint,
  handleWpb0525sTestMeta,
  handleWpb0525sTestReport,
  isSessionAuthorized,
} from "./api.js";
import { WEBHID_GATE_SCRIPT, renderConsentPage, renderErrorPage } from "./consentPage.js";
import { signHmac } from "./crypto.js";

const STATIC_INDEX_KEY = "eco--usb-device-web/static/index.html";
const TEST_PACK_KEY = "eco--usb-device-web/static/0525s-test-pack.js";
const INDEX_CACHE_TTL_MS = 60_000;

const indexHtmlCache = new Map();

const MIME_MAP = {
  js: "application/javascript; charset=utf-8",
  mjs: "application/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  json: "application/json; charset=utf-8",
  map: "application/json; charset=utf-8",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
  ico: "image/x-icon",
  woff2: "font/woff2",
  woff: "font/woff",
  ttf: "font/ttf",
  html: "text/html; charset=utf-8",
};

const ALLOWED_PAGE_ROUTES = new Set([
  "/",
  "/models",
  "/supportqi2",
  "/exception-guide",
  "/0525s-test",
  "/0525s-test/",
]);

function applySecurityHeaders(headers, nonce = null) {
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  if (nonce) {
    headers.set(
      "Content-Security-Policy",
      `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; object-src 'none'; base-uri 'none';`,
    );
  }
  return headers;
}

export function injectGateAndNonce(html, scriptNonce) {
  const withNonce = html.replace(/<script\b(?![^>]*\bnonce=)/gi, `<script nonce="${scriptNonce}"`);
  const gateTag = `<script nonce="${scriptNonce}">${WEBHID_GATE_SCRIPT}</script>`;
  if (/<\/head>/i.test(withNonce)) return withNonce.replace(/<\/head>/i, `${gateTag}</head>`);
  return `${gateTag}${withNonce}`;
}

export function extractPreloadLinks(html) {
  const links = [];
  for (const m of html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'](\/eco--usb-device-web\/static\/[^"']+)["']/gi)) {
    links.push(`<${m[1]}>; rel=preload; as=style`);
  }
  for (const m of html.matchAll(/<script\b[^>]*type=["']module["'][^>]*src=["'](\/eco--usb-device-web\/static\/[^"']+)["']/gi)) {
    links.push(`<${m[1]}>; rel=modulepreload`);
  }
  return links;
}

async function loadBuiltAppHtml(url, env) {
  const key = STATIC_INDEX_KEY;
  const source = env.XIAOMI_MIRROR || env.ASSETS || null;
  const cached = indexHtmlCache.get(key);
  if (cached && cached.source === source && Date.now() - cached.at < INDEX_CACHE_TTL_MS) {
    return cached.html;
  }
  let html = null;
  if (env.XIAOMI_MIRROR) {
    const obj = await env.XIAOMI_MIRROR.get(key);
    if (obj) html = typeof obj.text === "function" ? await obj.text() : await new Response(obj.body).text();
  }
  if (!html && env.ASSETS && typeof env.ASSETS.fetch === "function") {
    const res = await env.ASSETS.fetch(new URL(`/${key}`, url));
    if (res.ok) html = await res.text();
  }
  if (html) indexHtmlCache.set(key, { html, at: Date.now(), source });
  return html;
}

function getEdgeCache(env) {
  if (env.__EDGE_CACHE) return env.__EDGE_CACHE;
  if (typeof caches !== "undefined" && caches.default) return caches.default;
  return null;
}

async function serveTestPackJs(request, url, env) {
  const noCacheHeaders = applySecurityHeaders(
    new Headers({
      "content-type": MIME_MAP.js,
      "cache-control": "no-cache, must-revalidate",
      vary: "Accept-Encoding",
    }),
  );

  if (env.XIAOMI_MIRROR) {
    const obj =
      (await env.XIAOMI_MIRROR.get(TEST_PACK_KEY)) ||
      (await env.XIAOMI_MIRROR.get("0525s-test-pack.js"));
    if (obj) {
      const etag = obj.httpEtag || (obj.etag ? `"${obj.etag}"` : undefined);
      if (etag) {
        if (request.headers.get("if-none-match") === etag) {
          noCacheHeaders.set("etag", etag);
          return new Response(null, { status: 304, headers: noCacheHeaders });
        }
        noCacheHeaders.set("etag", etag);
      }
      return new Response(request.method === "HEAD" ? null : obj.body, {
        status: 200,
        headers: noCacheHeaders,
      });
    }
  }

  if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
    const candidates = [new URL(`/${TEST_PACK_KEY}`, url), new URL("/0525s-test-pack.js", url)];
    for (const candidate of candidates) {
      const assetRes = await env.ASSETS.fetch(new Request(candidate, { method: request.method }));
      if (assetRes.ok) {
        return new Response(request.method === "HEAD" ? null : assetRes.body, {
          status: 200,
          headers: noCacheHeaders,
        });
      }
    }
  }

  return new Response("Not Found", { status: 404, headers: applySecurityHeaders(new Headers()) });
}

async function serveStaticAsset(request, url, env, ctx) {
  if (url.pathname.endsWith(".html") || false) {
    return new Response("Not Found", { status: 404, headers: applySecurityHeaders(new Headers()) });
  }
  if (url.pathname === `/${TEST_PACK_KEY}`) {
    return serveTestPackJs(request, url, env);
  }

  const edgeCache = getEdgeCache(env);
  const cacheKey = new Request(url.toString(), { method: "GET" });
  if (edgeCache && (request.method === "GET" || request.method === "HEAD")) {
    const cached = await edgeCache.match(cacheKey);
    if (cached) {
      const etag = cached.headers.get("etag");
      if (etag && request.headers.get("if-none-match") === etag) {
        return new Response(null, { status: 304, headers: applySecurityHeaders(new Headers({ etag, "cache-control": "public, max-age=31536000, immutable" })) });
      }
      return cached;
    }
  }

  if (env.XIAOMI_MIRROR) {
    const obj = await env.XIAOMI_MIRROR.get(url.pathname.slice(1));
    if (obj) {
      const ext = (url.pathname.match(/\.([a-z0-9]+)$/i) || [])[1]?.toLowerCase();
      const etag = obj.httpEtag || (obj.etag ? `"${obj.etag}"` : `"${url.pathname}"`);
      if (request.headers.get("if-none-match") === etag) {
        return new Response(null, {
          status: 304,
          headers: applySecurityHeaders(new Headers({ etag, "cache-control": "public, max-age=31536000, immutable" })),
        });
      }
      const h = new Headers({
        "cache-control": "public, max-age=31536000, immutable",
        etag,
        vary: "Accept-Encoding",
      });
      if (ext && MIME_MAP[ext]) h.set("content-type", MIME_MAP[ext]);
      const resp = new Response(request.method === "HEAD" ? null : obj.body, {
        status: 200,
        headers: applySecurityHeaders(h),
      });
      if (edgeCache && request.method === "GET") {
        const putTask = edgeCache.put(cacheKey, resp.clone());
        if (ctx?.waitUntil) ctx.waitUntil(putTask);
        else await putTask;
      }
      return resp;
    }
  }

  if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
    const assetRes = await env.ASSETS.fetch(request);
    if (assetRes.ok) {
      const h = applySecurityHeaders(new Headers(assetRes.headers));
      h.set("cache-control", "public, max-age=31536000, immutable");
      return new Response(assetRes.body, { status: assetRes.status, headers: h });
    }
  }

  return new Response("Not Found", { status: 404, headers: applySecurityHeaders(new Headers()) });
}

export default {
  async fetch(request, env = {}, ctx = null) {
    const url = new URL(request.url);
    if (url.protocol === "http:" && url.hostname !== "127.0.0.1" && url.hostname !== "localhost") {
      return Response.redirect(`https://${url.host}${url.pathname}${url.search}`, 301);
    }

        const scriptNonce = crypto.randomUUID().replace(/-/g, "");
    const authSecret = env.SECRET_KEY || "dev-secret-change-in-production";
    const agreeSecret = env.AGREE_SECRET_KEY || "dev-agree-secret-change-in-production";
    const isCN = request.cf?.country === "CN";
    const jsonHeaders = applySecurityHeaders(new Headers({
      "content-type": "application/json;charset=UTF-8",
      "cache-control": "no-store",
    }));

    if (env.DB) {
      const initTask = ensureTables(env);
      if (ctx?.waitUntil) ctx.waitUntil(initTask);
      else await initTask;
    }

    if (url.pathname === "/0525s-test-pack.js") {
      return serveTestPackJs(request, url, env);
    }

    if (url.pathname === "/eco--usb-device-web/static/xiaomi.svg") {
      const h = applySecurityHeaders(new Headers({
        "content-type": "image/svg+xml",
        "cache-control": "public, max-age=86400",
        "lbs-info": request.cf?.country || "Unknown",
      }));
      return new Response('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>', { headers: h });
    }

    if (url.pathname.startsWith("/eco--usb-device-web/") || false) {
      return serveStaticAsset(request, url, env, ctx);
    }

    if (url.searchParams.get("reject") === "1") {
      return new Response("404 Not Found", { status: 404, headers: applySecurityHeaders(new Headers()) });
    }

    if (request.method === "POST" && url.pathname === "/api/destroy-token") {
      return handleDestroyToken(request, env, authSecret, applySecurityHeaders(new Headers({ "cache-control": "no-store" })));
    }
    if (request.method === "GET" && url.pathname === "/api/qi2-stats") {
      return handleQi2Stats(url, env, jsonHeaders);
    }
    if (request.method === "POST" && url.pathname === "/api/qi2-report") {
      return handleQi2Report(request, env, authSecret, agreeSecret, jsonHeaders);
    }
    if (request.method === "GET" && url.pathname === "/api/0525s-test/meta") {
      return handleWpb0525sTestMeta(env, jsonHeaders);
    }
    if (request.method === "POST" && url.pathname === "/api/0525s-test/report") {
      return handleWpb0525sTestReport(request, env, authSecret, agreeSecret, jsonHeaders);
    }
    if (request.method === "POST" && url.pathname === "/api/report-fingerprint") {
      return handleReportFingerprint(request, authSecret, isCN, jsonHeaders);
    }
    if (request.method === "POST" && url.pathname === "/api/confirm-cn") {
      return handleConfirmCn(env, authSecret, jsonHeaders);
    }
    if (request.method === "POST" && url.pathname === "/api/agree") {
      const minWait = Number.isFinite(env.__TEST_MIN_WAIT_MS) ? env.__TEST_MIN_WAIT_MS : 3000;
      return handleAgree(request, env, authSecret, agreeSecret, jsonHeaders, minWait);
    }

    if (!ALLOWED_PAGE_ROUTES.has(url.pathname)) {
      return new Response("404 Not Found", { status: 404, headers: applySecurityHeaders(new Headers()) });
    }

    if (url.searchParams.get("error") === "1") {
      const h = applySecurityHeaders(new Headers({
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store",
      }), scriptNonce);
      for (const name of ["m_sid", "m_agree", "c_t", "ch_t", "ch_s", "pt_m"]) {
        h.append("Set-Cookie", `${name}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
      }
      return new Response(renderErrorPage({ pathname: url.pathname, scriptNonce }), { status: 403, headers: h });
    }

    const devMode = env.MIRROR_DEV_MODE === "1";
    const { authorized } = devMode
      ? { authorized: true }
      : await isSessionAuthorized(request, env, authSecret, agreeSecret);

    if (!authorized) {
      const csrfToken = crypto.randomUUID().replace(/-/g, "");
      const challenge = crypto.randomUUID().replace(/-/g, "");
      const pageToken = crypto.randomUUID().replace(/-/g, "");
      const challengeSig = await signHmac(challenge, authSecret);
      const uniqueId = crypto.randomUUID();

      const h = applySecurityHeaders(new Headers({
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store",
      }), scriptNonce);
      h.append("Set-Cookie", `c_t=${csrfToken}; Path=/; HttpOnly; SameSite=Lax; Secure`);
      h.append("Set-Cookie", `ch_t=${challenge}; Path=/; HttpOnly; SameSite=Lax; Secure`);
      h.append("Set-Cookie", `ch_s=${challengeSig}; Path=/; HttpOnly; SameSite=Lax; Secure`);
      h.append("Set-Cookie", `pt_m=${pageToken}; Path=/; HttpOnly; SameSite=Lax; Secure`);
      return new Response(
        renderConsentPage({ scriptNonce, csrfToken, challenge, challengeSig, pageToken, uniqueId, isCN }),
        { status: 200, headers: h },
      );
    }

    const h = applySecurityHeaders(new Headers({
      "content-type": "text/html;charset=UTF-8",
      "cache-control": "private, no-store",
    }), scriptNonce);
    const builtHtml = await loadBuiltAppHtml(url, env);
    if (builtHtml) {
      const preloadLinks = extractPreloadLinks(builtHtml);
      if (preloadLinks.length) h.set("Link", preloadLinks.join(", "));
      return new Response(injectGateAndNonce(builtHtml, scriptNonce), { status: 200, headers: h });
    }

    if (devMode) {
      const entry = "/src/main.tsx";
      const devHtml = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>小米移动电源详情</title><script src="/0525s-test-pack.js" data-wpb0525s-pack="1"></script></head><body><div id="root"></div><script type="module" src="${entry}"></script></body></html>`;
      return new Response(injectGateAndNonce(devHtml, scriptNonce), { status: 200, headers: h });
    }    const expectedKey = STATIC_INDEX_KEY;
    return new Response(
      `Frontend build not found in R2 (${expectedKey}).`,
      { status: 503, headers: applySecurityHeaders(new Headers({ "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" })) },
    );
  },
};
