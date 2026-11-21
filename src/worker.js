const consoleGuardScript = 'for(let k in console){try{console[k]=function(){}}catch(e){}}';
const base64urlEncode = (buffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const generateHMAC = async (text, secret) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(text));
  return base64urlEncode(signature);
};

const createToken = async (payloadObj, secret) => {
  const payloadStr = JSON.stringify(payloadObj);
  const payloadB64 = base64urlEncode(new TextEncoder().encode(payloadStr));
  const sig = await generateHMAC(payloadB64, secret);
  return `${payloadB64}.${sig}`;
};

const verifyToken = async (tokenStr, secret) => {
  if (!tokenStr) return null;
  const parts = tokenStr.split('.');
  if (parts.length !== 2) return null;
  const expectedSig = await generateHMAC(parts[0], secret);
  if (expectedSig !== parts[1]) return null;
  try {
    let b64 = parts[0].replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (e) {
    return null;
  }
};

const SHA256 = async (text) => {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
};

const _g = (vS, nonce, appSecret) => {
  return '';
};
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.protocol === 'http:' && url.hostname !== '127.0.0.1' && url.hostname !== 'localhost') {
      return Response.redirect(`https://${url.host}${url.pathname}${url.search}`, 301);
    }

    const scriptNonce = crypto.randomUUID().replace(/-/g, '');
    const appSecret = crypto.randomUUID().replace(/-/g, '');
    
    const applySecurityHeaders = (resHeaders, isHtml = false) => {
      resHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      resHeaders.set('X-Content-Type-Options', 'nosniff');
      resHeaders.set('X-Frame-Options', 'DENY');
      resHeaders.set('X-XSS-Protection', '1; mode=block');
      if (isHtml) {
        resHeaders.set('Content-Security-Policy', `default-src 'self'; script-src 'self' 'nonce-${scriptNonce}' 'strict-dynamic' https://xiaomi-mirror.nalaniflynn.cn; style-src 'self' 'unsafe-inline' https://xiaomi-mirror.nalaniflynn.cn; img-src 'self' data: https:; connect-src 'self' https:; object-src 'none'; base-uri 'none'; upgrade-insecure-requests;`);
      }
      return resHeaders;
    };

    if (url.pathname === '/eco--usb-device-web/static/xiaomi.svg') {
      const svgBytes = Uint8Array.from(atob('PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAwLjMyNCAxMS43MDE0Qzg5Ljc1NzEgMS4xNzU4NiA3NC41NjQ2IDAgNTUuOTk4NyAwQzM3LjQwOTEgMCAyMi4xOTQ0IDEuMTg5NzEgMTEuNjMyMSAxMS43NDI1QzEuMDcyMzQgMjIuMjkzNiAwIDM3LjQ4MzkgMCA1Ni4wNTNDMCA3NC42MjE4IDEuMDcyMzQgODkuODIwMSAxMS42MzY1IDEwMC4zNzNDMjIuMTk5MiAxMTAuOTI5IDM3LjQxMDIgMTExLjk5NyA1NS45OTg3IDExMS45OTdDNzQuNTg2NSAxMTEuOTk3IDg5Ljc5NzkgMTEwLjkyOSAxMDAuMzYxIDEwMC4zNzNDMTEwLjkyMyA4OS44MTY5IDExMS45OTcgNzQuNjIxOCAxMTEuOTk3IDU2LjA1M0MxMTEuOTk3IDM3LjQ2MDIgMTEwLjkxMSAyMi4yNTI0IDEwMC4zMjQgMTEuNzAxNFoiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01MS44NzY3IDc2Ljc1MkM1MS44NzY3IDc3LjEyNzggNTEuNTYwMyA3Ny40Mzk1IDUxLjE3NSA3Ny40Mzk1SDQxLjYyNDJDNDEuMjMyMyA3Ny40Mzk1IDQwLjkxNDUgNzcuMTI3OCA0MC45MTQ1IDc2Ljc1MlY1MS43NzU0QzQwLjkxNDUgNTEuMzk2NCA0MS4yMzIzIDUxLjA4NjIgNDEuNjI0MiA1MS4wODYySDUxLjE3NUM1MS41NjAzIDUxLjA4NjIgNTEuODc2NyA1MS4zOTY0IDUxLjg3NjcgNTEuNzc1NFY3Ni43NTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcwLjU3NjkgNzYuNzUyQzcwLjU3NjkgNzcuMTI3OCA3MC4yNTkxIDc3LjQzOTUgNjkuODcyNCA3Ny40Mzk1SDYwLjc4MTFDNjAuMzkxMSA3Ny40Mzk1IDYwLjA3MzMgNzcuMTI3OCA2MC4wNzMzIDc2Ljc1MlY3Ni42NTg3VjU1LjIwMjhDNjAuMDYzOCA1MS40NDA1IDU5Ljg0ODggNDcuNTczNSA1Ny45MDY0IDQ1LjYzQzU2LjIzNjMgNDMuOTU0OCA1My4xMjIgNDMuNTcxIDQ5Ljg4MjQgNDMuNDkwNUgzMy40MDI1QzMzLjAxMzYgNDMuNDkwNSAzMi42OTk0IDQzLjgwMzIgMzIuNjk5NCA0NC4xNzk0Vjc0LjQ5ODRWNzYuNzUyQzMyLjY5OTQgNzcuMTI3OCAzMi4zNzg3IDc3LjQzOTUgMzEuOTg5NyA3Ny40Mzk1SDIyLjg5MjNDMjIuNTAzOCA3Ny40Mzk1IDIyLjE5MSA3Ny4xMjc4IDIyLjE5MSA3Ni43NTJWMzUuMjQ5NkMyMi4xOTEgMzQuODY4NyAyMi41MDM4IDM0LjU1ODkgMjIuODkyMyAzNC41NTg5SDQ5LjEzOTZDNTUuOTk5MyAzNC41NTg5IDYzLjE3MDQgMzQuODcxNiA2Ni43MDcxIDM4LjQxMzFDNzAuMjU5MSA0MS45NzAyIDcwLjU3NjkgNDkuMTI4NSA3MC41NzY5IDU1Ljk5NTlWNzYuNzUyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04OS4zMDU3IDc2Ljc1MkM4OS4zMDU3IDc3LjEyNzggODguOTg0NiA3Ny40Mzk1IDg4LjU5OTMgNzcuNDM5NUg3OS41MDMzQzc5LjExNDggNzcuNDM5NSA3OC43OTg4IDc3LjEyNzggNzguNzk4OCA3Ni43NTJWMzUuMjQ5NkM3OC43OTg4IDM0Ljg2ODcgNzkuMTE0OCAzNC41NTg5IDc5LjUwMzMgMzQuNTU4OUg4OC41OTkzQzg4Ljk4NDYgMzQuNTU4OSA4OS4zMDU3IDM0Ljg2ODcgODkuMzA1NyAzNS4yNDk2Vjc2Ljc1MloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='), function (c) { return c.charCodeAt(0); });
      const svgHeaders = new Headers();
      svgHeaders.set('content-type', 'image/svg+xml');
      svgHeaders.set('cache-control', 'public, max-age=86400');
      svgHeaders.set('access-control-allow-origin', '*');
      svgHeaders.set('lbs-info', (request.cf && request.cf.country) || 'Unknown');
      return new Response(request.method === 'HEAD' ? null : svgBytes, { headers: applySecurityHeaders(svgHeaders) });
    }
    if (url.pathname.startsWith('/eco--usb-device-web/')) {
      const assetExt = (url.pathname.match(/[.]([A-Za-z0-9]+)$/) || [])[1] || '';
      const mimeMap = { js: 'application/javascript; charset=utf-8', css: 'text/css; charset=utf-8', json: 'application/json; charset=utf-8', map: 'application/json; charset=utf-8', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', wasm: 'application/wasm', html: 'text/html; charset=utf-8', txt: 'text/plain; charset=utf-8' };
      const assetMime = mimeMap[String(assetExt).toLowerCase()] || '';
      const assetCacheKey = new Request(url.origin + url.pathname, { method: 'GET' });
      const assetCache = caches.default;
      let assetHit = null;
      try { assetHit = await assetCache.match(assetCacheKey); } catch (err) {}
      const assetHitOk = !!(assetHit && (!assetMime || (assetHit.headers.get('content-type') || '') === assetMime));
      if (assetHitOk) {
        return request.method === 'HEAD' ? new Response(null, { headers: assetHit.headers }) : assetHit;
      }
      try {
        const obj = env.XIAOMI_MIRROR ? await env.XIAOMI_MIRROR.get(url.pathname.slice(1)) : null;
        if (obj) {
          const h = new Headers();
          obj.writeHttpMetadata(h);
          if (assetMime) h.set('content-type', assetMime);
          h.set('etag', obj.httpEtag);
          h.set('cache-control', 'public, max-age=31536000, immutable');
          h.set('x-content-type-options', 'nosniff');
          h.set('access-control-allow-origin', '*');
          const assetResp = new Response(obj.body, { headers: h });
          ctx.waitUntil(assetCache.put(assetCacheKey, assetResp.clone()).catch(() => {}));
          return request.method === 'HEAD' ? new Response(null, { headers: h }) : assetResp;
        }
      } catch (err) {}
      return new Response('Not Found', { status: 404, headers: applySecurityHeaders(new Headers()) });
    }
    if (url.searchParams.get('reject') === '1') {    const DEV_MODE = env.MIRROR_DEV_MODE === '1';

    if (DEV_MODE) {
      const devHeaders = new Headers();
      devHeaders.set('content-type', 'text/html;charset=UTF-8');
      if (url.pathname === '/' || url.pathname === '/models') {
        const devAppHtml = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="robots" content="noindex" />
    <meta name="theme-color" content="#2563eb" />
    <title>小米移动电源详情 · 测试版</title>
    <script nonce="${scriptNonce}">
      if (window.trustedTypes && trustedTypes.createPolicy) { window.trustedTypes.createPolicy('default', { createHTML: s => s, createScript: s => s, createScriptURL: s => s }); }
    </script>
    <style nonce="${scriptNonce}">:root { --banner-height: 0px; } body { padding-top: var(--banner-height) !important; } .fixed-header { top: var(--banner-height) !important; }</style>
    <script nonce="${scriptNonce}">
      (function(){
        try{
          var ua = navigator.userAgent || "";
          var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || (window.screen && window.screen.width < 768);
          var desktopUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
          if (mobile) {
            try { Object.defineProperty(navigator, "userAgent", { get: function () { return desktopUA; }, configurable: true }); } catch (e) {}
            try { Object.defineProperty(navigator, "vendor", { get: function () { return "Google Inc."; }, configurable: true }); } catch (e) {}
            try { Object.defineProperty(navigator, "maxTouchPoints", { get: function () { return 0; }, configurable: true }); } catch (e) {}
            try { Object.defineProperty(window.screen, "width", { get: function () { return 1920; }, configurable: true }); } catch (e) {}
          }
          if (!navigator.hid) {
            var stub = { getDevices: function () { return Promise.resolve([]); }, requestDevice: function () { return Promise.resolve([]); }, addEventListener: function () {}, removeEventListener: function () {}, onconnect: null, ondisconnect: null, dispatchEvent: function () { return true; } };
            try { Object.defineProperty(navigator, "hid", { value: stub, configurable: true }); } catch (e) { try { navigator.hid = stub; } catch (e2) {} }
          }
        }catch(e){}
      })();
    </script>
    <script nonce="${scriptNonce}">document.addEventListener("DOMContentLoaded", function () { import("/eco--usb-device-web/static/assets/index-dev-a2.v31.js").catch(function () {}); });</script>
    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/react-vendor-252eb283.read.js" nonce="${scriptNonce}">
    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.v31.js" nonce="${scriptNonce}">
    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/ModelData-16716423.v31.js" nonce="${scriptNonce}">
    <link rel="stylesheet" crossorigin href="/eco--usb-device-web/static/assets/index-30406512.v31.css" nonce="${scriptNonce}">
  </head>
  <body style="margin: 0;">
    <div id="blue-banner" style="position: fixed; top: 0px; left: 0px; width: 100%; background: rgb(0, 122, 204); color: white; text-align: center; padding: 8px 5px; font-size: 12px; z-index: 999999; font-family: sans-serif; box-sizing: border-box;">
      <div>网页快照 · 测试版（已去除反调试脚本） | 原网址: <a href="https://powerbank.mieco.net/" target="_blank" style="color:white; text-decoration:underline;">https://powerbank.mieco.net/</a></div>
      <div style="margin-top: 4px; font-weight: bold;">仅限授权账户访问 · 用于调试与设备测试</div>
      <div style="margin-top: 8px;"><a href="/supportqi2" style="display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.65); color: #fff; padding: 4px 16px; border-radius: 999px; font-size: 12px; text-decoration: none;">QI 2.2 支持机型一览</a> </div>
    </div>
    <div id="root"></div>
    <div id="mieco-loading" style="position:fixed;inset:0;background:#f7f8fa;z-index:2147483000;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;">
      <div style="width:320px;text-align:center;">
        <div style="font-size:14px;color:#374151;margin-bottom:12px;">正在加载小米移动电源详情…</div>
        <div style="height:6px;background:#e5e7eb;border-radius:999px;overflow:hidden;"><div id="mieco-loading-bar" style="height:100%;width:0%;background:#2563eb;border-radius:999px;transition:width .35s ease;"></div></div>
        <div style="margin-top:10px;font-size:12px;color:#9ca3af;"><span id="mieco-loading-pct">0%</span></div>
        <div id="mieco-loading-slow" style="display:none;margin-top:16px;font-size:12px;color:#9ca3af;">加载较慢？<a href="#" id="mieco-loading-reload" style="color:#3b82f6;text-decoration:none;">重新加载</a></div>

    <script nonce="${scriptNonce}">(function(){
  var el=document.getElementById("mieco-loading");
  if(!el){return;}
  var bar=document.getElementById("mieco-loading-bar"), pctEl=document.getElementById("mieco-loading-pct");
  var done=false, p=3;
  function set(v){p=v;bar.style.width=v+"%";pctEl.textContent=Math.round(v)+"%";}
  set(3);
  var t=setInterval(function(){ if(done){return;} p=Math.min(p+Math.random()*7,97); set(p); },350);
  var slow=document.getElementById("mieco-loading-slow");
  var rl=document.getElementById("mieco-loading-reload");
  if(rl){rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});}
  setTimeout(function(){ if(!done&&slow){slow.style.display="block";} },12000);
  function finish(){ if(done){return;} done=true; clearInterval(t); set(100); setTimeout(function(){ el.style.transition="opacity .3s"; el.style.opacity="0"; setTimeout(function(){ el.remove(); },320); },200); }
  var root=document.getElementById("root");
  if(root){
    try{ var mo=new MutationObserver(function(){ if(root.childElementCount>0){ mo.disconnect(); finish(); } }); mo.observe(root,{childList:true,subtree:false}); }catch(e){}
    var iv=setInterval(function(){ if(done){clearInterval(iv);return;} if(root.childElementCount>0){ clearInterval(iv); finish(); } },400);
  }
  window.addEventListener("load",function(){ setTimeout(function(){ if(root&&root.childElementCount>0){finish();} },800); });
})();</script>
  </body>
</html>`;
        return new Response(devAppHtml, { headers: applySecurityHeaders(devHeaders, true) });
      }
      if (url.pathname === '/supportqi2') {
        const devQi2Html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>QI 2.2 支持机型 · 测试版</title>
  </head>
  <body style="margin: 0; background: #f7f8fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;">
    <div style="max-width: 720px; margin: 40px auto; padding: 0 16px;">
      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 28px 32px;">
        <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px;">QI 2.2 支持机型（测试版）</h1>
        <p style="font-size: 14px; color: #6b7280; margin: 0 0 20px; line-height: 1.7;">以下机型支持开启 / 关闭 QI 2.2 功能（25W 无线快充）。</p>
        <div style="margin-top: 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #1e40af; line-height: 1.8;"><b>新版开启方式：</b>WPB1026S 使用加密设置协议，写入前会重新握手、读取电池健康度与循环次数，并在回读状态一致后才提示成功；固件差异可能导致个别设备无法开启。</div>
        <div style="margin-top: 14px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #4b5563; line-height: 1.8;"><b>可能支持（未经测试）：</b>小米充电宝 磁吸自带线 10000 45W — WPB1025<br>是否支持 QI 2.2 暂时无法确认；应用内提供新加密协议与「未经测试尝试开启」按钮，可自行尝试。</div>
      </div>
      <div style="text-align: center; margin-top: 16px;"><a href="/" style="color: #2563eb; text-decoration: none; font-size: 13px;">← 返回测试版应用</a></div>
    </div>
  </body>
</html>`;
        return new Response(devQi2Html, { headers: applySecurityHeaders(devHeaders, true) });
      }
    }

      return new Response("404 Not Found", { status: 404, headers: applySecurityHeaders(new Headers()) });
    }

    const authSecret = env.SECRET_KEY || 'mieco-default-crypto-secret-2026';
    const agreeSecret = env.AGREE_SECRET_KEY || 'mieco-protocol-agree-key-999';

    if (env.DB) {
      ctx.waitUntil((async () => {
        try {
          await env.DB.prepare(`CREATE TABLE IF NOT EXISTS auth_sessions (token TEXT PRIMARY KEY, created_at INTEGER)`).run();
          try { await env.DB.prepare('DROP TABLE IF EXISTS user_fingerprints').run(); } catch (err) {}
          try { await env.DB.prepare('DROP TABLE IF EXISTS access_logs').run(); } catch (err) {}
          await env.DB.prepare(`CREATE TABLE IF NOT EXISTS used_tokens (jti TEXT PRIMARY KEY, used_at INTEGER)`).run();
          await env.DB.prepare(`CREATE TABLE IF NOT EXISTS cn_tokens (token TEXT PRIMARY KEY, created_at INTEGER)`).run();
          await env.DB.prepare(`CREATE TABLE IF NOT EXISTS qi2_reports (model TEXT, sn_hash TEXT, action TEXT, ok INTEGER, detail TEXT, created_at INTEGER, updated_at INTEGER, PRIMARY KEY (model, sn_hash, action))`).run();
          try { await env.DB.prepare('ALTER TABLE qi2_reports ADD COLUMN info TEXT').run(); } catch (err) {}
          try { await env.DB.prepare('ALTER TABLE qi2_reports ADD COLUMN dev_logs TEXT').run(); } catch (err) {}
          try { await env.DB.prepare('ALTER TABLE qi2_reports ADD COLUMN app_version TEXT').run(); } catch (err) {}
          try { await env.DB.prepare('ALTER TABLE qi2_reports ADD COLUMN reported_at TEXT').run(); } catch (err) {}
        } catch (err) {}
      })());
    }

    const timeStamp = Date.now();

    if (request.method === 'POST' && url.pathname === '/api/destroy-token') {
      const cookies = request.headers.get('cookie') || '';
      const sidMatch = cookies.match(/m_sid=([^;]+)/);
      if (sidMatch && env.DB) {
        const authPayload = await verifyToken(sidMatch[1], authSecret);
        if (authPayload && authPayload.vid) {
          ctx.waitUntil(env.DB.prepare(`DELETE FROM auth_sessions WHERE token IN (?1, ?2)`).bind(`AUTH_${authPayload.vid}`, `AGREE_${authPayload.vid}`).run().catch(() => {}));
        }
      }
      return new Response("OK", { status: 200, headers: applySecurityHeaders(new Headers()) });
    }

    if (request.method === 'POST' && url.pathname === '/api/verify-env') {
      try {
        const reqData = await request.json();
        const hl = parseInt(reqData.hl, 10);
        const isIllegal = isNaN(hl) || hl < 100;
        const kp = await crypto.subtle.generateKey({name: 'ECDH', namedCurve: 'P-256'}, true, ['deriveKey']);
        const spkRaw = await crypto.subtle.exportKey('raw', kp.publicKey);
        const spkB64 = btoa(String.fromCharCode(...new Uint8Array(spkRaw)));
        const clientPkRaw = Uint8Array.from(atob(reqData.pk), c => c.charCodeAt(0));
        const clientPk = await crypto.subtle.importKey('raw', clientPkRaw, {name: 'ECDH', namedCurve: 'P-256'}, true, []);
        const sharedKey = await crypto.subtle.deriveKey({name: 'ECDH', public: clientPk}, kp.privateKey, {name: 'AES-GCM', length: 256}, false, ['encrypt']);
        const otp = crypto.randomUUID().replace(/-/g, '').substring(0, 8);
        const payload = JSON.stringify({ cmd: isIllegal ? 'DESTROY' : 'OK', otp: otp });
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const enc = await crypto.subtle.encrypt({name: 'AES-GCM', iv: iv}, sharedKey, new TextEncoder().encode(payload));
        const encB64 = btoa(String.fromCharCode(...new Uint8Array(enc)));
        const ivB64 = btoa(String.fromCharCode(...new Uint8Array(iv)));
        let h = new Headers();
        h.set('Content-Type', 'application/json');
        return new Response(JSON.stringify({ spk: spkB64, iv: ivB64, enc: encB64, otp: otp }), { status: 200, headers: applySecurityHeaders(h) });
      } catch (e) {
        return new Response("Error", { status: 500, headers: applySecurityHeaders(new Headers()) });
      }
    }

    if (request.method === 'POST' && url.pathname === '/api/confirm-cn') {
      try {
        const jti = crypto.randomUUID();
        const action_token = await createToken({ jti, type: 'CN_CONFIRM' }, authSecret);
        if (env.DB) {
          await env.DB.prepare(`INSERT INTO cn_tokens (token, created_at) VALUES (?1, ?2)`).bind(action_token, timeStamp).run();
        }
        let h = new Headers();
        h.set('Content-Type', 'application/json');
        return new Response(JSON.stringify({ action_token }), { status: 200, headers: applySecurityHeaders(h) });
      } catch (e) {
        return new Response("Error", { status: 500, headers: applySecurityHeaders(new Headers()) });
      }
    }


    if (request.method === 'POST' && url.pathname === '/api/qi2-report') {
      const jsonHeaders = new Headers();
      jsonHeaders.set('content-type', 'application/json;charset=UTF-8');
      try {
        const cookies = request.headers.get('cookie') || '';
        const sidMatch = cookies.match(/m_sid=([^;]+)/);
        const agreeMatch = cookies.match(/m_agree=([^;]+)/);
        let sessionOk = false;
        if (sidMatch && agreeMatch) {
          const authPayload = await verifyToken(sidMatch[1], authSecret);
          const agreePayload = await verifyToken(agreeMatch[1], agreeSecret);
          sessionOk = !!(authPayload && agreePayload && authPayload.vid === agreePayload.vid && Date.now() <= agreePayload.exp);
        }
        if (!sessionOk) return new Response(JSON.stringify({ ok: false, error: 'forbidden' }), { status: 403, headers: applySecurityHeaders(jsonHeaders) });
        const data = await request.json();
        const model = String(data.model || '').toUpperCase().slice(0, 40);
        const snHash = String(data.snHash || '').toLowerCase().slice(0, 64);
        const action = data.action === 'off' ? 'off' : 'on';
        const okFlag = data.ok ? 1 : 0;
        const detail = String(data.detail || '').slice(0, 400);
        let info = '';
        try { info = JSON.stringify(data.info || {}).slice(0, 4000); } catch (err) { info = ''; }
        let devLogs = '';
        try { devLogs = data.devLogs ? JSON.stringify(data.devLogs).slice(0, 60000) : ''; } catch (err) { devLogs = ''; }
        const appVersion = String(data.appVersion || '').slice(0, 40);
        const reportedAt = (/^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/.test(String(data.reportedAt || '')) ? String(data.reportedAt) : new Date().toISOString());
        if (!/^[A-Z0-9_-]{1,40}$/.test(model) || !/^[a-f0-9]{16,64}$/.test(snHash)) {
          return new Response(JSON.stringify({ ok: false, error: 'invalid payload' }), { status: 400, headers: applySecurityHeaders(jsonHeaders) });
        }
        if (!env.DB) return new Response(JSON.stringify({ ok: true, stored: false }), { status: 200, headers: applySecurityHeaders(jsonHeaders) });
        const now = Date.now();
        await env.DB.prepare('INSERT INTO qi2_reports (model, sn_hash, action, ok, detail, info, dev_logs, app_version, reported_at, created_at, updated_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11) ON CONFLICT(model, sn_hash, action) DO UPDATE SET ok = ?4, detail = ?5, info = ?6, dev_logs = ?7, app_version = ?8, reported_at = ?9, updated_at = ?11')
          .bind(model, snHash, action, okFlag, detail, info, devLogs, appVersion, reportedAt, now, now).run();
        return new Response(JSON.stringify({ ok: true, stored: true }), { status: 200, headers: applySecurityHeaders(jsonHeaders) });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: 'error' }), { status: 200, headers: applySecurityHeaders(jsonHeaders) });
      }
    }

    if (request.method === 'GET' && url.pathname === '/api/qi2-stats') {
      const jsonHeaders = new Headers();
      jsonHeaders.set('content-type', 'application/json;charset=UTF-8');
      jsonHeaders.set('cache-control', 'no-store');
      const model = String(url.searchParams.get('model') || '').toUpperCase().slice(0, 40);
      if (!/^[A-Z0-9_-]{1,40}$/.test(model)) return new Response(JSON.stringify({ ok: false }), { status: 400, headers: applySecurityHeaders(jsonHeaders) });
      if (!env.DB) return new Response(JSON.stringify({ ok: true, model, total: 0 }), { status: 200, headers: applySecurityHeaders(jsonHeaders) });
      try {
        const row = await env.DB.prepare("SELECT COUNT(*) AS total, SUM(ok) AS success FROM qi2_reports WHERE model = ?1 AND action = 'on'").bind(model).first();
        const total = (row && row.total) || 0;
        const success = (row && row.success) || 0;
        const errors = Math.max(0, total - success);
        return new Response(JSON.stringify({ ok: true, model, total, success, errors, successRate: total ? success / total : 0, errorRate: total ? errors / total : 0 }), { status: 200, headers: applySecurityHeaders(jsonHeaders) });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false }), { status: 200, headers: applySecurityHeaders(jsonHeaders) });
      }
    }

    if (!['/', '/models', '/supportqi2', '/api/report-fingerprint', '/api/agree', '/api/verify-env', '/api/confirm-cn'].includes(url.pathname)) {
      return new Response("404 Not Found", { status: 404, headers: applySecurityHeaders(new Headers()) });
    }

    const uniqueId = crypto.randomUUID();
    const rawIdentifier = url.searchParams.get('id') || 'Unknown ID';
    let decodedIdentifier = rawIdentifier;
    try { decodedIdentifier = decodeURIComponent(rawIdentifier); } catch (e) {}
    const clientIP = request.headers.get('cf-connecting-ip') || 'Unknown IP';
    const serverUserAgent = request.headers.get('user-agent') || 'Unknown Device';
    const cfData = request.cf || {};
    const isCN = cfData.country === 'CN';
    const networkFingerprint = {
      country: cfData.country || 'Unknown Country',
      city: cfData.city || 'Unknown City',
      asn: cfData.asn || 'Unknown ASN',
      asOrganization: cfData.asOrganization || 'Unknown ISP'
    };

    if (request.method === 'POST' && url.pathname === '/api/report-fingerprint') {
      try {
        const data = await request.json();
        const clientCsrf = request.headers.get('X-CSRF-Token');
        const clientIntegrity = request.headers.get('X-Page-Integrity');
        const cookieStr = request.headers.get('cookie') || '';
        const cookieCsrf = cookieStr.match(/c_t=([^;]+)/);
        const challengeMatch = cookieStr.match(/ch_t=([^;]+)/);
        const challengeSigMatch = cookieStr.match(/ch_s=([^;]+)/);
        const pageTokenMatch = cookieStr.match(/pt_m=([^;]+)/);

        if (!clientCsrf || !cookieCsrf || clientCsrf !== cookieCsrf[1] || !challengeMatch || !challengeSigMatch || !pageTokenMatch || !clientIntegrity) {
           return new Response("Forbidden", { status: 403, headers: applySecurityHeaders(new Headers()) });
        }

        const challenge = challengeMatch[1];
        const challengeSig = challengeSigMatch[1];
        const expectedChallengeSig = await generateHMAC(challenge, authSecret);
        if (expectedChallengeSig !== challengeSig) {
            return new Response("Forbidden", { status: 403, headers: applySecurityHeaders(new Headers()) });
        }

        const pageToken = pageTokenMatch[1];
        const expectedPoW = await SHA256(challenge + data.nonce + challengeSig);
        if (!expectedPoW.startsWith('0000') || data.sig !== expectedPoW) {
            return new Response("PoW Failed", { status: 403, headers: applySecurityHeaders(new Headers()) });
        }

        const expectedIntegrity = await SHA256(challenge + pageToken + 'HTMLBodyElement' + challengeSig);
        if (expectedIntegrity !== clientIntegrity) {
            return new Response("Integrity Compromised", { status: 403, headers: applySecurityHeaders(new Headers()) });
        }

        if (request.cf && request.cf.botManagement && request.cf.botManagement.score < 30) {
            return new Response("Bot Detected by CF", { status: 403, headers: applySecurityHeaders(new Headers()) });
        }

        const visitId = data.visitId || uniqueId;

        const jti = crypto.randomUUID();
        const ott = await createToken({ 
            vid: visitId, 
            jti: jti,
            type: 'OTT',
            isCN: isCN,
            exp: timeStamp + 60000, 
            iat: timeStamp 
        }, authSecret);

        let h = new Headers();
        h.set('Content-Type', 'application/json');
        return new Response(JSON.stringify({ ott }), { status: 200, headers: applySecurityHeaders(h) });
      } catch (e) {
        return new Response("Error", { status: 500, headers: applySecurityHeaders(new Headers()) });
      }
    }

    if (request.method === 'POST' && url.pathname === '/api/agree') {
      try {
        const { ott, action_token } = await request.json();
        if (!ott) return new Response("Missing OTT", { status: 403, headers: applySecurityHeaders(new Headers()) });
        const payload = await verifyToken(ott, authSecret);
        if (!payload || payload.type !== 'OTT' || timeStamp > payload.exp) {
            return new Response("Invalid OTT", { status: 403, headers: applySecurityHeaders(new Headers()) });
        }
        if (timeStamp - payload.iat < 3000) {
            return new Response("Too Fast", { status: 403, headers: applySecurityHeaders(new Headers()) });
        }

        if (payload.isCN) {
          if (!action_token) return new Response("Requires Action Token", { status: 403, headers: applySecurityHeaders(new Headers()) });
          if (env.DB) {
            const row = await env.DB.prepare(`SELECT token FROM cn_tokens WHERE token = ?1`).bind(action_token).first();
            if (!row) return new Response("Invalid CN Confirmation", { status: 403, headers: applySecurityHeaders(new Headers()) });
            await env.DB.prepare(`DELETE FROM cn_tokens WHERE token = ?1`).bind(action_token).run();
          }
          const actionPayload = await verifyToken(action_token, authSecret);
          if (!actionPayload || actionPayload.type !== 'CN_CONFIRM') {
            return new Response("Invalid CN Confirmation", { status: 403, headers: applySecurityHeaders(new Headers()) });
          }
        }

        if (env.DB) {
            try {
                await env.DB.prepare(`INSERT INTO used_tokens (jti, used_at) VALUES (?1, ?2)`).bind(payload.jti, timeStamp).run();
            } catch (e) {
                return new Response("Token Already Used", { status: 403, headers: applySecurityHeaders(new Headers()) });
            }
            ctx.waitUntil(env.DB.batch([
              env.DB.prepare(`DELETE FROM used_tokens WHERE used_at < ?1`).bind(timeStamp - 120000),
              env.DB.prepare(`DELETE FROM cn_tokens WHERE created_at < ?1`).bind(timeStamp - 120000)
            ]).catch(()=>{}));
        }

        const agreeToken = await createToken({ vid: payload.vid, exp: timeStamp + 7200000 }, agreeSecret);
        const sidToken = await createToken({ vid: payload.vid, exp: timeStamp + 7200000 }, authSecret);

        if (env.DB) {
          ctx.waitUntil(env.DB.batch([
            env.DB.prepare(`INSERT OR REPLACE INTO auth_sessions (token, created_at) VALUES (?1, ?2)`).bind(`AUTH_${payload.vid}`, timeStamp),
            env.DB.prepare(`INSERT OR REPLACE INTO auth_sessions (token, created_at) VALUES (?1, ?2)`).bind(`AGREE_${payload.vid}`, timeStamp)
          ]).catch(()=>{}));
        }

        let responseHeaders = new Headers();
        responseHeaders.append('Set-Cookie', `m_sid=${sidToken}; Path=/; HttpOnly; SameSite=Lax; Secure`);
        responseHeaders.append('Set-Cookie', `m_agree=${agreeToken}; Path=/; HttpOnly; SameSite=Lax; Secure`);
        return new Response("OK", { status: 200, headers: applySecurityHeaders(responseHeaders) });
      } catch(e) {
        return new Response("Error", { status: 500, headers: applySecurityHeaders(new Headers()) });
      }
    }

    const cookies = request.headers.get('cookie') || '';
    const sidMatch = cookies.match(/m_sid=([^;]+)/);
    const agreeMatch = cookies.match(/m_agree=([^;]+)/);
    let isAuthorized = false;
    let validAuthPayload = null;

    try {
      if (sidMatch && agreeMatch) {
        const authPayload = await verifyToken(sidMatch[1], authSecret);
        const agreePayload = await verifyToken(agreeMatch[1], agreeSecret);
        if (authPayload && agreePayload && authPayload.vid === agreePayload.vid && timeStamp <= agreePayload.exp) {
          validAuthPayload = authPayload;
          if (env.DB) {
            try {
              const records = await env.DB.prepare(`SELECT token FROM auth_sessions WHERE token IN (?1, ?2)`).bind(`AUTH_${authPayload.vid}`, `AGREE_${authPayload.vid}`).all();
              if (records && records.results && records.results.length === 2) {
                isAuthorized = true; 
              }
            } catch (dbErr) {
              isAuthorized = true;
            }
          } else {
            isAuthorized = true; 
          }
        }
      }
    } catch (err) {
      isAuthorized = false;
    }

    if (url.searchParams.get('error') === '1') {
      isAuthorized = false;
    }

    const devtoolsScript = ``;

    if (!isAuthorized) {
      const scriptTag = _g('c_m', scriptNonce, appSecret);
      if (url.searchParams.get('error') === '1') {
        const errorHtmlContent = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8" />
    <script nonce="${scriptNonce}">(function(){
  try{
    var ua=navigator.userAgent||"";
    var mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var smallTouch=window.screen&&window.screen.width<768&&navigator.maxTouchPoints>0;
    var isChrome=/Chrome/.test(ua)&&/Google Inc/.test(navigator.vendor)&&!/Edg/.test(ua)&&!/OPR/.test(ua);
    var ok=(typeof navigator.hid!=="undefined")&&!mobile&&!smallTouch&&isChrome;
    if(ok)return;
    window.__mieco_env_blocked=true;
    var draw=function(){
      try{
        document.documentElement.innerHTML='';
        var box=document.createElement("div");
        box.id="__mieco_env_block";
        box.setAttribute("style","position:fixed;inset:0;background:#f7f8fa;display:flex;align-items:center;justify-content:center;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;");
        box.innerHTML='<div style="max-width:28rem;width:100%;padding:3rem 1.5rem;text-align:left;">'
          +'<div style="margin-bottom:1.5rem;"><img src="data:image/png;base64,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" alt="Error" style="width:7.5rem;height:7.5rem;object-fit:contain;"></div>'
          +'<h1 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 .5rem;">无法访问此网站</h1>'
          +'<p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 .25rem;">本网站仅支持在 <b>PC / Mac 的 Chrome 浏览器</b> 中打开</p>'
          +'<p style="font-size:14px;color:#9ca3af;margin:0;">如使用无误，<a href="#" id="__mieco_env_reload" style="color:#3b82f6;text-decoration:none;">请尝试重新加载</a></p>'
          +'</div>';
        (document.body||document.documentElement).appendChild(box);
        var rl=document.getElementById("__mieco_env_reload");
        if(rl)rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});
      }catch(e){}
    };
    draw();
    document.addEventListener("DOMContentLoaded",draw);
    window.addEventListener("load",draw);
    setInterval(function(){ if(window.__mieco_env_blocked){draw();} },1000);
  }catch(e){}
})();</script><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><meta name="theme-color" content="#ef4444" /><title>校验失败</title><script nonce="${scriptNonce}">${devtoolsScript}window.onerror=function(){return true;};window.addEventListener('error',function(e){e.preventDefault();},true);window.addEventListener('unhandledrejection',function(e){e.preventDefault();},true);</script></head><body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px);"><div style="background: white; padding: 30px; border-radius: 12px; text-align: center; max-width: 400px; width: 90%; box-shadow: 0 4px 20px rgba(0,0,0,0.3); font-family: sans-serif;"><svg style="width: 64px; height: 64px; color: #ef4444; margin: 0 auto 16px; display: block;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><h2 style="margin-top: 0; color: #111827;">安全令牌校验失败</h2><p style="color: #4b5563; line-height: 1.5; font-size: 14px; margin-bottom: 24px;">您的访问凭证已失效（因非法请求、篡改、网络异常或协议超时）。为保障安全，请重新签署授权流程。</p><a href="${url.pathname}" style="display: block; box-sizing: border-box; text-decoration: none; background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; width: 100%; transition: opacity 0.2s;">重新获取安全凭证</a></div></body></html>`;
        let responseHeaders = new Headers();
        responseHeaders.set('content-type', 'text/html;charset=UTF-8');
        responseHeaders.append('Set-Cookie', `m_sid=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
        responseHeaders.append('Set-Cookie', `m_agree=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
        responseHeaders.append('Set-Cookie', `c_t=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
        responseHeaders.append('Set-Cookie', `ch_t=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
        responseHeaders.append('Set-Cookie', `ch_s=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
        responseHeaders.append('Set-Cookie', `pt_m=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
        return new Response(errorHtmlContent, { status: 403, headers: applySecurityHeaders(responseHeaders, true) });
      } 
      
      const csrfToken = crypto.randomUUID().replace(/-/g, '');
      const challenge = crypto.randomUUID().replace(/-/g, '');
      const pageToken = crypto.randomUUID().replace(/-/g, '');
      const challengeSig = await generateHMAC(challenge, authSecret);

      const cnModal = `<div id="cn-modal" style="position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:none;justify-content:center;align-items:center;"><div style="background:white;padding:30px;border-radius:12px;max-width:400px;text-align:center;"><h2 style="color:#dc2626;margin-top:0;">⚠️ 地域限制提醒</h2><p style="color:#374151;font-size:14px;line-height:1.6;text-align:left;">检测到您可能处于中国大陆地区。<br><br>qi2.2功能在中国大陆境内不被允许使用，如果开启可能影响航空器安全。<br><br>如果您觉得我们的识别有误，请点击下方按钮确认您<strong>不在</strong>中国大陆地区，否则请立即退出。</p><div style="display:flex;flex-direction:column;gap:12px;margin-top:20px;"><button id="cn-confirm-btn" style="background:#dc2626;color:white;border:none;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;width:100%;">确认我不在中国大陆地区</button><button id="cn-exit-btn" style="background:#f3f4f6;color:#4b5563;border:1px solid #d1d5db;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;width:100%;">立即退出</button></div></div></div>`;

      const authHtmlContent = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <script nonce="${scriptNonce}">(function(){
  try{
    var ua=navigator.userAgent||"";
    var mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var smallTouch=window.screen&&window.screen.width<768&&navigator.maxTouchPoints>0;
    var isChrome=/Chrome/.test(ua)&&/Google Inc/.test(navigator.vendor)&&!/Edg/.test(ua)&&!/OPR/.test(ua);
    var ok=(typeof navigator.hid!=="undefined")&&!mobile&&!smallTouch&&isChrome;
    if(ok)return;
    window.__mieco_env_blocked=true;
    var draw=function(){
      try{
        document.documentElement.innerHTML='';
        var box=document.createElement("div");
        box.id="__mieco_env_block";
        box.setAttribute("style","position:fixed;inset:0;background:#f7f8fa;display:flex;align-items:center;justify-content:center;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;");
        box.innerHTML='<div style="max-width:28rem;width:100%;padding:3rem 1.5rem;text-align:left;">'
          +'<div style="margin-bottom:1.5rem;"><img src="data:image/png;base64,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" alt="Error" style="width:7.5rem;height:7.5rem;object-fit:contain;"></div>'
          +'<h1 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 .5rem;">无法访问此网站</h1>'
          +'<p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 .25rem;">本网站仅支持在 <b>PC / Mac 的 Chrome 浏览器</b> 中打开</p>'
          +'<p style="font-size:14px;color:#9ca3af;margin:0;">如使用无误，<a href="#" id="__mieco_env_reload" style="color:#3b82f6;text-decoration:none;">请尝试重新加载</a></p>'
          +'</div>';
        (document.body||document.documentElement).appendChild(box);
        var rl=document.getElementById("__mieco_env_reload");
        if(rl)rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});
      }catch(e){}
    };
    draw();
    document.addEventListener("DOMContentLoaded",draw);
    window.addEventListener("load",draw);
    setInterval(function(){ if(window.__mieco_env_blocked){draw();} },1000);
  }catch(e){}
})();</script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>知情同意书</title>
    <script nonce="${scriptNonce}">${devtoolsScript}window.onerror=function(){return true;};window.addEventListener('error',function(e){e.preventDefault();},true);window.addEventListener('unhandledrejection',function(e){e.preventDefault();},true);</script>
    <script nonce="${scriptNonce}">
      if (window.trustedTypes && trustedTypes.createPolicy) {
        window.trustedTypes.createPolicy('default', { createHTML: s => s, createScript: s => s, createScriptURL: s => s });
      }
    </script>
    ${scriptTag}
  </head>
  <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px);">
    ${cnModal}
    <div style="background: white; padding: 24px; border-radius: 12px; max-width: 90%; width: 500px; font-family: sans-serif; max-height: 90vh; overflow-y: auto;">
      <h2 style="text-align: center; margin-top: 0; color: #111827; font-weight: bold;">知情同意书</h2>
      <input type="hidden" id="c_m" value="${csrfToken}">
      <input type="hidden" id="ch_m" value="${challenge}">
      <input type="hidden" id="ch_s" value="${challengeSig}">
      <input type="hidden" id="pt_m" value="${pageToken}">
      <input type="hidden" id="is_cn" value="${isCN ? '1' : '0'}">
      <div style="font-size: 14px; color: #374151; line-height: 1.6;">
        <p>此网站用于充电宝信息查看和qi2.2的配置关闭。此网页不会更改充电宝和设备固件，不会使用非官方接口，不会影响充电宝的安全性。如遇问题，请长按充电宝电源键重置系统。</p>
        <p style="color: #dc2626; font-weight: bold; background: #fef2f2; padding: 12px; border-radius: 8px; border: 1px solid #fecaca; word-break: break-all;">
          qi2.2功能在中国大陆境内不被允许使用 如果开启可能影响航空器安全 请勿在中国大陆境内/注册于中国大陆航司的航空器上开启或使用此功能 此功能仅可在qi2.2所使用的360khz合法的地区可使用及开启 在非法区域或非无线电屏蔽环境内禁止开启，如开启请立即重置充电宝或关闭此配置项
        </p>
        <p>使用此网页及相关功能开关造成的一切后果由使用者自行承担，与网站所有人、软件开发商及小米公司无关。</p>
        <p>如不同意以上条款，请立即退出。</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px;">
        <button id="c-a" disabled style="background: #2563eb; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: not-allowed; font-size: 14px; opacity: 0.6;">计算安全证明中...</button>
        <button id="c-d" style="background: #f3f4f6; color: #4b5563; border: 1px solid #d1d5db; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px;">我不同意 立即退出</button>
      </div>
    </div>
    <script nonce="${scriptNonce}">
      document.addEventListener('DOMContentLoaded', async function() {
        const bA = document.getElementById('c-a');
        const bD = document.getElementById('c-d');
        const isCn = document.getElementById('is_cn').value === '1';
        let actionToken = null;

        bD.addEventListener('click', function(e) {
          if (!e.isTrusted || e.clientX === 0 || e.clientY === 0) return;
          window.location.href = window.location.pathname + '?reject=1';
        });

        const doAgree = async () => {
            bA.innerText = '正在验证...';
            bA.disabled = true;
            bA.style.opacity = '0.7';
            try {
              const res = await fetch('/api/agree', { 
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ott: ott, action_token: actionToken })
              });
              if (res.ok) { window.location.reload(); } 
              else { window.location.href = '?error=1'; }
            } catch(e) { window.location.href = '?error=1'; }
        };

        const cnBtn = document.getElementById('cn-confirm-btn');
        if (cnBtn) {
            cnBtn.addEventListener('click', async function(e) {
                if (!e.isTrusted || e.clientX === 0 || e.clientY === 0) return;
                document.getElementById('cn-modal').style.display = 'none';
                try {
                    const res = await fetch('/api/confirm-cn', { method: 'POST' });
                    if (res.ok) {
                        const data = await res.json();
                        actionToken = data.action_token;
                        doAgree();
                    } else {
                        window.location.href = '?error=1';
                    }
                } catch(err) {
                    window.location.href = '?error=1';
                }
            });
        }
        
        const cnExitBtn = document.getElementById('cn-exit-btn');
        if (cnExitBtn) {
            cnExitBtn.addEventListener('click', function(e) {
                if (!e.isTrusted || e.clientX === 0 || e.clientY === 0) return;
                window.location.href = window.location.pathname + '?reject=1';
            });
        }

        const c = document.getElementById('c_m').value;
        const ch = document.getElementById('ch_m').value;
        const chS = document.getElementById('ch_s').value;
        const pT = document.getElementById('pt_m').value;
        let ott = null;

        if (!window.crypto || !window.crypto.subtle) {
            window.location.href = '?error=1';
            return;
        }

        const S2 = async (t) => {
            const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
            return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('');
        };

        try {
          let nonce = 0;
          let sig = '';
          while(true) {
              sig = await S2(ch + nonce + chS);
              if (sig.startsWith('0000')) break;
              nonce++;
              if (nonce % 200 === 0) {
                  bA.innerText = '计算安全证明中... (' + nonce + ')';
                  await new Promise(r => setTimeout(r, 0));
              }
          }

          const domType = document.body.constructor.name;
          const integritySig = await S2(ch + pT + domType + chS);

          const res = await fetch('/api/report-fingerprint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': c, 'X-Page-Integrity': integritySig },
            body: JSON.stringify({ visitId: '${uniqueId}', nonce: nonce, sig: sig })
          });

          if (res.ok) {
            const data = await res.json();
            ott = data.ott;
            bA.innerText = '我已完整阅读并同意以上条款 (3)';
            let countdown = 3;
            const iv = setInterval(() => {
                countdown--;
                if(countdown > 0) {
                    bA.innerText = '我已完整阅读并同意以上条款 (' + countdown + ')';
                } else {
                    clearInterval(iv);
                    bA.innerText = '我已完整阅读并同意以上条款';
                    bA.disabled = false;
                    bA.style.cursor = 'pointer';
                    bA.style.opacity = '1';
                }
            }, 1000);
          } else { window.location.href = '?error=1'; }
        } catch(e) { window.location.href = '?error=1'; }

        bA.addEventListener('click', async function(e) {
          if (!e.isTrusted || e.clientX === 0 || e.clientY === 0) return;
          if(!this.disabled && ott) {
            if (isCn && !actionToken) {
                document.getElementById('cn-modal').style.display = 'flex';
                return;
            }
            doAgree();
          }
        });
      });
    </script>
  </body>
</html>`;
      let rH = new Headers();
      rH.set('content-type', 'text/html;charset=UTF-8');
      rH.append('Set-Cookie', `c_t=${csrfToken}; Path=/; HttpOnly; SameSite=Lax; Secure`);
      rH.append('Set-Cookie', `ch_t=${challenge}; Path=/; HttpOnly; SameSite=Lax; Secure`);
      rH.append('Set-Cookie', `ch_s=${challengeSig}; Path=/; HttpOnly; SameSite=Lax; Secure`);
      rH.append('Set-Cookie', `pt_m=${pageToken}; Path=/; HttpOnly; SameSite=Lax; Secure`);
      return new Response(authHtmlContent, { headers: applySecurityHeaders(rH, true) });
    }

    if (env.DB && validAuthPayload) {
      ctx.waitUntil(new Promise(resolve => {
        setTimeout(() => {
          env.DB.prepare(`DELETE FROM auth_sessions WHERE token IN (?1, ?2)`)
            .bind(`AUTH_${validAuthPayload.vid}`, `AGREE_${validAuthPayload.vid}`)
            .run().then(resolve).catch(resolve);
        }, 3600000);
      }));
    }

    const successHeaders = new Headers();
    successHeaders.set('content-type', 'text/html;charset=UTF-8');
    successHeaders.append('Link', '</eco--usb-device-web/static/assets/index-17f0f8a6.v31.js>; rel=preload; as=script; crossorigin');
    successHeaders.append('Link', '</eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.v31.js>; rel=preload; as=script; crossorigin');
    successHeaders.append('Link', '</eco--usb-device-web/static/assets/ModelData-16716423.v31.js>; rel=preload; as=script; crossorigin');
    successHeaders.append('Link', '</eco--usb-device-web/static/assets/index-30406512.v31.css>; rel=preload; as=style; crossorigin');
    const showMigrationNotice = url.hostname === 'mirror-mieco.nalaniflynn.cn';
    const migrationHtml = showMigrationNotice ? '<div style="margin-top: 6px;">网站即将迁移到 <a href="https://mirror-mieco.raycsec.com/" style="color:#fff;text-decoration:underline;">https://mirror-mieco.raycsec.com/</a></div>' : '';
    const repoHtml = '<div style="margin-top: 6px;">开源地址：<a href="https://github.com/raycsec/xiaomi-powerbank-console-mirror" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;">github.com/raycsec/xiaomi-powerbank-console-mirror</a></div>';
    const scriptTagMain = _g('__mieco_qi2_enabled', scriptNonce, appSecret);

    if (url.pathname === '/models') {
      const modelsHtmlContent = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <script nonce="${scriptNonce}">(function(){
  try{
    var ua=navigator.userAgent||"";
    var mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var smallTouch=window.screen&&window.screen.width<768&&navigator.maxTouchPoints>0;
    var isChrome=/Chrome/.test(ua)&&/Google Inc/.test(navigator.vendor)&&!/Edg/.test(ua)&&!/OPR/.test(ua);
    var ok=(typeof navigator.hid!=="undefined")&&!mobile&&!smallTouch&&isChrome;
    if(ok)return;
    window.__mieco_env_blocked=true;
    var draw=function(){
      try{
        document.documentElement.innerHTML='';
        var box=document.createElement("div");
        box.id="__mieco_env_block";
        box.setAttribute("style","position:fixed;inset:0;background:#f7f8fa;display:flex;align-items:center;justify-content:center;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;");
        box.innerHTML='<div style="max-width:28rem;width:100%;padding:3rem 1.5rem;text-align:left;">'
          +'<div style="margin-bottom:1.5rem;"><img src="data:image/png;base64,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" alt="Error" style="width:7.5rem;height:7.5rem;object-fit:contain;"></div>'
          +'<h1 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 .5rem;">无法访问此网站</h1>'
          +'<p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 .25rem;">本网站仅支持在 <b>PC / Mac 的 Chrome 浏览器</b> 中打开</p>'
          +'<p style="font-size:14px;color:#9ca3af;margin:0;">如使用无误，<a href="#" id="__mieco_env_reload" style="color:#3b82f6;text-decoration:none;">请尝试重新加载</a></p>'
          +'</div>';
        (document.body||document.documentElement).appendChild(box);
        var rl=document.getElementById("__mieco_env_reload");
        if(rl)rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});
      }catch(e){}
    };
    draw();
    document.addEventListener("DOMContentLoaded",draw);
    window.addEventListener("load",draw);
    setInterval(function(){ if(window.__mieco_env_blocked){draw();} },1000);
  }catch(e){}
})();</script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#2563eb" />
    <title>小米移动电源详情</title>
    <script nonce="${scriptNonce}">${devtoolsScript}window.onerror=function(){return true;};window.addEventListener('error',function(e){e.preventDefault();},true);window.addEventListener('unhandledrejection',function(e){e.preventDefault();},true);</script>
    <script nonce="${scriptNonce}">
      if (window.trustedTypes && trustedTypes.createPolicy) {
        window.trustedTypes.createPolicy('default', { createHTML: s => s, createScript: s => s, createScriptURL: s => s });
      }
    </script>
    <style nonce="${scriptNonce}">:root { --banner-height: 0px; } body { padding-top: var(--banner-height) !important; } .fixed-header { top: var(--banner-height) !important; }</style>
    ${scriptTagMain}
    <script nonce="${scriptNonce}">document.addEventListener("DOMContentLoaded", function () { import("/eco--usb-device-web/static/assets/index-17f0f8a6.v31.js").catch(function () {}); });</script>
    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/react-vendor-252eb283.read.js" nonce="${scriptNonce}">
    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.v31.js" nonce="${scriptNonce}">
    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/ModelData-16716423.v31.js" nonce="${scriptNonce}">
    <link rel="stylesheet" crossorigin href="/eco--usb-device-web/static/assets/index-30406512.v31.css" nonce="${scriptNonce}">
  </head>
  <body style="margin: 0;">
    <div id="blue-banner" style="position: fixed; top: 0px; left: 0px; width: 100%; background: rgb(0, 122, 204); color: white; text-align: center; padding: 8px 5px; font-size: 12px; z-index: 999999; font-family: sans-serif; box-sizing: border-box;">
      <div>网页快照 - 抓取时间: 2026/10/15 20:00:46 | 原网址: <a href="https://powerbank.mieco.net/" target="_blank" style="color:white; text-decoration:underline;">https://powerbank.mieco.net/</a></div>
      <div style="margin-top: 4px; font-weight: bold;">此快照版本修改了部分设备qi2.2开启和关闭功能的相关配置</div>
      <div style="color: #e2e8f0; font-size: 10px; margin-top: 4px; line-height: 1.4;">仅供学习研究 不推荐任何非官方修改设备行为 可能造成的安全和法律风险请自行承担${repoHtml}${migrationHtml}</div><div style="margin-top: 8px;"><a href="/supportqi2" style="display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.65); color: #fff; padding: 4px 16px; border-radius: 999px; font-size: 12px; text-decoration: none;">QI 2.2 支持机型一览</a> </div>
    </div>
    <div id="root"></div>
    <div id="mieco-loading" style="position:fixed;inset:0;background:#f7f8fa;z-index:2147483000;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;">
      <div style="width:320px;text-align:center;">
        <div style="font-size:14px;color:#374151;margin-bottom:12px;">正在加载小米移动电源详情…</div>
        <div style="height:6px;background:#e5e7eb;border-radius:999px;overflow:hidden;"><div id="mieco-loading-bar" style="height:100%;width:0%;background:#2563eb;border-radius:999px;transition:width .35s ease;"></div></div>
        <div style="margin-top:10px;font-size:12px;color:#9ca3af;"><span id="mieco-loading-pct">0%</span></div>
        <div id="mieco-loading-slow" style="display:none;margin-top:16px;font-size:12px;color:#9ca3af;">加载较慢？<a href="#" id="mieco-loading-reload" style="color:#3b82f6;text-decoration:none;">重新加载</a></div>

    <script nonce="${scriptNonce}">(function(){
  var el=document.getElementById("mieco-loading");
  if(!el){return;}
  var bar=document.getElementById("mieco-loading-bar"), pctEl=document.getElementById("mieco-loading-pct");
  var done=false, p=3;
  function set(v){p=v;bar.style.width=v+"%";pctEl.textContent=Math.round(v)+"%";}
  set(3);
  var t=setInterval(function(){ if(done){return;} p=Math.min(p+Math.random()*7,97); set(p); },350);
  var slow=document.getElementById("mieco-loading-slow");
  var rl=document.getElementById("mieco-loading-reload");
  if(rl){rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});}
  setTimeout(function(){ if(!done&&slow){slow.style.display="block";} },12000);
  function finish(){ if(done){return;} done=true; clearInterval(t); set(100); setTimeout(function(){ el.style.transition="opacity .3s"; el.style.opacity="0"; setTimeout(function(){ el.remove(); },320); },200); }
  var root=document.getElementById("root");
  if(root){
    try{ var mo=new MutationObserver(function(){ if(root.childElementCount>0){ mo.disconnect(); finish(); } }); mo.observe(root,{childList:true,subtree:false}); }catch(e){}
    var iv=setInterval(function(){ if(done){clearInterval(iv);return;} if(root.childElementCount>0){ clearInterval(iv); finish(); } },400);
  }
  window.addEventListener("load",function(){ setTimeout(function(){ if(root&&root.childElementCount>0){finish();} },800); });
})();</script>
    <script nonce="${scriptNonce}">
      function adjustPadding() {
        var banner = document.getElementById('blue-banner');
        if (banner) document.documentElement.style.setProperty('--banner-height', banner.offsetHeight + 'px');
      }
      window.addEventListener('load', adjustPadding); window.addEventListener('resize', adjustPadding); adjustPadding(); setInterval(adjustPadding, 500);
    </script>
  </body>
</html>`;
      return new Response(modelsHtmlContent, { headers: applySecurityHeaders(successHeaders, true) });
    }
    if (url.pathname === '/supportqi2') {
      let qi2StatsMap = {};
      if (env.DB) {
        try {
          const qs = await env.DB.prepare("SELECT model, COUNT(*) AS total, SUM(ok) AS success FROM qi2_reports WHERE action = 'on' GROUP BY model").all();
          (qs.results || []).forEach(function (r) { qi2StatsMap[r.model] = { total: r.total || 0, success: r.success || 0 }; });
        } catch (err) {}
      }
      const qi2StatsBadge = function (code) {
        const st = qi2StatsMap[code];
        if (!st || st.total < 5) return '';
        const errors = Math.max(0, st.total - st.success);
        const rate = Math.round((st.success / st.total) * 100);
        const errorRate = errors / st.total;
        const warn = errorRate > 0.3, good = errorRate < 0.1;
        const color = warn ? '#b45309' : good ? '#15803D' : '#4B5563';
        const bg = warn ? '#fffbeb' : good ? '#f0fdf4' : '#f9fafb';
        const border = warn ? '#fde68a' : good ? '#bbf7d0' : '#e5e7eb';
        return '<div style="display:inline-block;margin-top:8px;background:' + bg + ';color:' + color + ';border:1px solid ' + border + ';border-radius:999px;padding:3px 12px;font-size:12px;font-weight:600;">\u5f00\u542f\u6210\u529f\u7387 ' + rate + '% (' + st.success + '/' + st.total + ')' + (good ? ' \u2713' : '') + '</div>';
      };
      const qi2Supported = [
        ["小米金沙江充电宝 超薄磁吸 10000 45W", "Xiaomi UltraThin Magnetic Power Bank 10000 25W", "WPB1025S", "WPB1025S"],
        ["小米金沙江充电宝 超薄磁吸 10000 45W", "Xiaomi UltraThin Magnetic Power Bank 10000 25W", "WPB1026S · 加密协议", "WPB1026S"],
      ];
      const qi2UnknownModels = [
        ["小米充电宝 磁吸自带线 10000 45W", "Xiaomi Magnetic Power Bank 10000 25W (Integrated Cable) 2027", "WPB1025", "WPB1025"],
      ];
      const qi2ListHtml = qi2Supported
        .map(function (m, i) {
          return (
            '<div style="display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:20px 24px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">'
            + '<div><div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:4px;">' + (i + 1) + ". " + m[0] + "</div>"
            + '<div style="font-size:12px;color:#6b7280;">' + m[1] + "</div>" + qi2StatsBadge(m[3] || String(m[2]).split(" \u00b7 ")[0]) + "</div>"
            + '<div style="flex:0 0 auto;margin-left:16px;background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;border-radius:999px;padding:6px 16px;font-size:13px;font-weight:600;">' + m[2] + "</div>"
            + "</div>"
          );
        })
        .join("");
      const qi2UnknownHtml = qi2UnknownModels
        .map(function (m, i) {
          return (
            '<div style="display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:20px 24px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);opacity:.92;">'
            + '<div><div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:4px;">' + (i + 1) + ". " + m[0] + "</div>"
            + '<div style="font-size:12px;color:#6b7280;">' + m[1] + "</div>" + qi2StatsBadge(m[3] || String(m[2]).split(" \u00b7 ")[0]) + "</div>"
            + '<div style="flex:0 0 auto;margin-left:16px;background:#f3f4f6;color:#4b5563;border:1px solid #d1d5db;border-radius:999px;padding:6px 16px;font-size:13px;font-weight:600;">' + m[2] + " · 未经测试</div>"
            + "</div>"
          );
        })
        .join("");
      const qi2UnsupportedModels = [
        ["小米金沙江充电宝 超薄磁吸 5000 27W", "Xiaomi UltraThin Magnetic Power Bank 5000 25W", "WPB0525S"],
      ];
      const qi2UnsupportedHtml = qi2UnsupportedModels
        .map(function (m, i) {
          return (
            '<div style="display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:20px 24px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);opacity:.92;">'
            + '<div><div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:4px;">' + (i + 1) + ". " + m[0] + "</div>"
            + '<div style="font-size:12px;color:#6b7280;">' + m[1] + "</div>" + "</div>"
            + '<div style="flex:0 0 auto;margin-left:16px;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:999px;padding:6px 16px;font-size:13px;font-weight:600;">' + m[2] + " · 开启方式暂不适配</div>"
            + "</div>"
          );
        })
        .join("");
      const qi2HtmlContent = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <script nonce="${scriptNonce}">(function(){
  try{
    var ua=navigator.userAgent||"";
    var mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var smallTouch=window.screen&&window.screen.width<768&&navigator.maxTouchPoints>0;
    var isChrome=/Chrome/.test(ua)&&/Google Inc/.test(navigator.vendor)&&!/Edg/.test(ua)&&!/OPR/.test(ua);
    var ok=(typeof navigator.hid!=="undefined")&&!mobile&&!smallTouch&&isChrome;
    if(ok)return;
    window.__mieco_env_blocked=true;
    var draw=function(){
      try{
        document.documentElement.innerHTML='';
        var box=document.createElement("div");
        box.id="__mieco_env_block";
        box.setAttribute("style","position:fixed;inset:0;background:#f7f8fa;display:flex;align-items:center;justify-content:center;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;");
        box.innerHTML='<div style="max-width:28rem;width:100%;padding:3rem 1.5rem;text-align:left;">'
          +'<div style="margin-bottom:1.5rem;"><img src="data:image/png;base64,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" alt="Error" style="width:7.5rem;height:7.5rem;object-fit:contain;"></div>'
          +'<h1 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 .5rem;">无法访问此网站</h1>'
          +'<p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 .25rem;">本网站仅支持在 <b>PC / Mac 的 Chrome 浏览器</b> 中打开</p>'
          +'<p style="font-size:14px;color:#9ca3af;margin:0;">如使用无误，<a href="#" id="__mieco_env_reload" style="color:#3b82f6;text-decoration:none;">请尝试重新加载</a></p>'
          +'</div>';
        (document.body||document.documentElement).appendChild(box);
        var rl=document.getElementById("__mieco_env_reload");
        if(rl)rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});
      }catch(e){}
    };
    draw();
    document.addEventListener("DOMContentLoaded",draw);
    window.addEventListener("load",draw);
    setInterval(function(){ if(window.__mieco_env_blocked){draw();} },1000);
  }catch(e){}
})();</script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#2563eb" />
    <title>QI 2.2 支持机型 - 小米移动电源详情</title>
    <script nonce="${scriptNonce}">${consoleGuardScript}window.onerror=function(){return true;};window.addEventListener('error',function(e){e.preventDefault();},true);window.addEventListener('unhandledrejection',function(e){e.preventDefault();},true);</script>
    <script nonce="${scriptNonce}">
      if (window.trustedTypes && trustedTypes.createPolicy) { window.trustedTypes.createPolicy('default', { createHTML: s => s, createScript: s => s, createScriptURL: s => s }); }
    </script>
    ${scriptTagMain}
  </head>
  <body style="margin: 0; background: #f7f8fa;">
    <div id="blue-banner" style="position: relative; width: 100%; background: rgb(0, 122, 204); color: white; text-align: center; padding: 8px 5px; font-size: 12px; box-sizing: border-box; font-family: sans-serif;">
      <div>网页快照 - 抓取时间: 2026/10/15 20:00:46 | 原网址: <a href="https://powerbank.mieco.net/" target="_blank" style="color:white; text-decoration:underline;">https://powerbank.mieco.net/</a></div>
      <div style="margin-top: 4px; font-weight: bold;">此快照版本修改了部分设备qi2.2开启和关闭功能的相关配置</div>
      <div style="margin-top: 8px;"><a href="/" style="display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.65); color: #fff; padding: 4px 16px; border-radius: 999px; font-size: 12px; text-decoration: none;">← 返回应用</a></div>
    </div>
    <div style="max-width: 760px; margin: 24px auto; padding: 0 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;">
      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 28px 32px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
        <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px;">QI 2.2 支持机型</h1>
        <p style="font-size: 14px; color: #6b7280; margin: 0; line-height: 1.7;">支持开启 / 关闭 QI 2.2 功能（25W 无线快充）的机型：连接设备后可在应用内操作，未开启显示「立即开启」，已开启显示「强制关闭」。</p>
      </div>
      <div style="font-size: 14px; font-weight: 700; color: #111827; margin: 8px 4px 10px;">支持开启 / 关闭（当前方法）</div>
      ${qi2ListHtml}
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 16px; padding: 16px 20px; margin: 20px 0 12px; font-size: 13px; color: #1e40af; line-height: 1.7;">
        <b>新版开启方式：</b>WPB1026S 使用加密设置协议，写入前会重新握手、读取电池健康度与循环次数，并在回读状态一致后才提示成功；固件差异可能导致个别设备无法开启。
      </div>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 16px; padding: 16px 20px; margin: 20px 0 12px; font-size: 13px; color: #4b5563; line-height: 1.7;">
        <b>可能支持（未经该型号实机测试）：</b>小米充电宝 磁吸自带线 10000 45W（WPB1025）是否支持 QI 2.2 无法确认；应用内提供「未经测试尝试开启」按钮与新加密协议，仅建议了解风险后自行尝试，失败不代表设备损坏。
      </div>
      <div style="font-size: 14px; font-weight: 700; color: #111827; margin: 8px 4px 10px;">可能支持（未经测试）</div>
      ${qi2UnknownHtml}
      <div style="font-size: 14px; font-weight: 700; color: #111827; margin: 8px 4px 10px;">硬件支持 · 目前开启方式暂不适配</div>
      ${qi2UnsupportedHtml}
      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 20px 24px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
        <div style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 6px;">尝试开启（测试）</div>
        <b>新版开启方式：</b>WPB1026S 使用加密设置协议，写入前会重新握手、读取电池健康度与循环次数，并在回读状态一致后才提示成功；固件差异可能导致个别设备无法开启。
        <p style="font-size: 12px; color: #b45309; margin: 0 0 12px; line-height: 1.7;">仅用于未知型号的测试入口，可能对设备无效；请勿反复尝试。</p>
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <button id="qt-run" style="background: #f59e0b; color: #fff; border: 0; border-radius: 16px; padding: 8px 22px; font-size: 13px; font-weight: 600; cursor: pointer;">尝试开启</button>
          <button id="qt-off" style="background: #f3f4f6; color: #374151; border: 0; border-radius: 16px; padding: 8px 22px; font-size: 13px; font-weight: 600; cursor: pointer;">尝试关闭</button>
          <span id="qt-status" style="font-size: 12px; color: #4b5563;">未开始</span>
        </div>
        <pre id="qt-log" style="margin: 12px 0 0; max-height: 300px; overflow: auto; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 11px; color: #374151; white-space: pre-wrap; word-break: break-all;"></pre>
      </div>
      <script nonce="${scriptNonce}" src="/eco--usb-device-web/static/assets/qi2-trial.v31.js"></script>
      <div style="font-size: 12px; color: #9ca3af; text-align: center; margin: 24px 0;">仅供学习研究 不推荐任何非官方修改设备行为 可能造成的安全和法律风险请自行承担</div>
    </div>
  </body>
</html>`;
      return new Response(qi2HtmlContent, { headers: applySecurityHeaders(successHeaders, true) });
    }

    const htmlContent = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <script nonce="${scriptNonce}">(function(){
  try{
    var ua=navigator.userAgent||"";
    var mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var smallTouch=window.screen&&window.screen.width<768&&navigator.maxTouchPoints>0;
    var isChrome=/Chrome/.test(ua)&&/Google Inc/.test(navigator.vendor)&&!/Edg/.test(ua)&&!/OPR/.test(ua);
    var ok=(typeof navigator.hid!=="undefined")&&!mobile&&!smallTouch&&isChrome;
    if(ok)return;
    window.__mieco_env_blocked=true;
    var draw=function(){
      try{
        document.documentElement.innerHTML='';
        var box=document.createElement("div");
        box.id="__mieco_env_block";
        box.setAttribute("style","position:fixed;inset:0;background:#f7f8fa;display:flex;align-items:center;justify-content:center;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;");
        box.innerHTML='<div style="max-width:28rem;width:100%;padding:3rem 1.5rem;text-align:left;">'
          +'<div style="margin-bottom:1.5rem;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAABICAYAAAD4bKvuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAyeSURBVHgB7V2/bxzHFX6zdyJFJIoowI0FyeQhSG1JSOE0Ft24SAJYAQTYlUU1iV3ZQpw2JJUyjq2kiIMkSKg0TmHAAuI0KSLqL5DkIkWa40mynY4uIoik7/Z5Zndn7s2bN3cn2Du3J98HiLs7O7szN9+8n7O7AphjjjnmmGOObwYUPGF41O2uHl1cxIcHBycW2+3jD/f27h9/6qmBOnmyB08YZpo8TdSaytrP4qB/TmWt53XRCvi/Caut0oAccU+fvJspuKP/7bTa7TuzTOrMkWcIa7WOvJrn+U/04XFDCiKO+x2GxKBOeS3c1Nf/DWCws9Tp7MIMYSbIw253+TBrv6F339ADfSJWT5OhTxfCZn8XJy1GornOcLmd54PrmsQdmAE0mjxLmh7YN/Xhsh1kc47uPy4qaZXK7T13EAeXmy6JjSXvUffeuu7dO7qDRtIKiSGD60lQrLyCLaNbgDG/3dxTV72uJXGrqSQ2jjwjbQeq9aHeXQvOaWkxUkNRHcdIDSRMIppLcXVddSH2FOZXFjudG9AwZNAg/L/bPaOJu6131ywp9LxAXHGeDDy1dd7W1GVq10khV7+EcF0rW4Gs/eFB7/4GNAyNkbzDXu9Sjuqa3l2O1aFSM6GXSSE6K0IbVuoExybbXsi/uKI6nc+hAWgEeWZW6/HaHGO7iFdYepWPS2BMjdr9yL38iYJ4ZxHyF5pA4NTJs8RJ55gtirn9gZ0DQR1y4kF2eCDSlt8vwDsLOH0Cp2rzjKoUiKOS4Mhg9o6KT2CvDBFEgm05Jxhi9wDfKw2ge2Vs819hypgaeSYHWdm4AlR9EXCnAmEoFU4i2bUoXW/bkFQjU6X2fpxA3r8L+73euzBFTIU8/PjjE0q1bupBKpwTNqii50cGNJASNvhR9WcnAFendEvvp3wRVayeofnNg273AkwJUyFv/9iymbErdpAEe0MHtdhwNUjGNZCS6tqY3VK0Dds264Mt422FdlSrT6NFYApITp7JnOixuARVxgTAG+zikFQPgmcy84P6LO4LJWWIYLLQfdYfJJLt69eyfFlhdg2mgOTe5v7uva4enBXi+cVCgmrXy6AU+yB4mQCTp70ex7Oc8F7YaqkXjpw+fQsSIqnkHfYeGIlbgYqUiqBAMqjkWO+RqVFK4CSkuWvpveh5poYnArXT/b4c7tSJpOTlmG9Cab+QhAFRr06yNdXgU+dGseu4A2LrgWRjR4UNwjlRDZepN1gza42QEMnIK1YJAFYJYTwnGUgQhss2KJTz6xxR1HZFbJ+TchSS3sAmBKnPyyoCWxuQEMnIy5Qyi6lOVUqz2sCWU2eGuvEwGp7HyNSvYu1YYh3BfLJIqw8gq2nbVlLpS0LeYffBGW25zpAiriqpZwLVlg665zkW2wefweDan0BvpZhN6obXXv7n9wH/dcvee9SkcJJm+0LtI5foVtZ6CRIhCXk5DNb5j6SznHiXIgJC73+q+q+8Brkmz2wNkfZWtj6TEnfOYPDWFvR/9Y7q//QXkH/wT6lhMbwQpFVxByhHWIdESEKenqjnyTqaK662YrgAYdBd4sGnBWFYEWa29phOACqxFIY4TRg9VoMPPgq6DFKHqvClIqwoEpLny6lUZ+3kmeyDSeTaWSuIWExlSeRi/p//OuIszPHgldddOc912uPBW1c94hw0eTGHxusQscfE0QlTaDmchQSonbwMWsbWIZEEHp+NGziagFbZi2uQXfxRUAm1RA5KFcoluRjgUuI+Cu9+6mnI3t6I9oPaN6a+PWeHbCHPsvOQAPWrzUw9q8JHGsY5CUV97mnawWvpwc4u/ji8oFShyhDoGtLXc1XpoIlr//0PkJ0+iTYZYG/l7lnqSOsdK6b2A6kr+pdlz0MC1E4e5niWSJ00U4NsR7VVsQE1aP9mA0cS+ElJYP/nWypGXOv990CdehoF++h5t3Z9kGeFyErH8MJSpZ4wD1JBzWhDzUAcmOUfe+hlL4gDAKRckQFSI9bgVOvtXxbVODkFgS+/prLnzqE+F0p4JXGaOGBteGRguKDLV+R5vtVVfagTEnp7B2pE/WrTPH1FD9lTXMCkkRApZWEAmK0sVahkA7UTM5442yZvw+uyd19i96SlJxcLluTVitrJMysIwNJLOHwCTExtgaxavcQ0VVkxGxggJK66ZRATjvxJAOEzMqRvxSntqNWuNlOlxzyVQsoCx0X5jyCoYbG3lkdtaAGjQiUJdPCJ80IJsvxEbRnvr+2Ibd+zeSzRMM4Z+1qQKEgPM/wGKCSehWDenlBEaum1E0kMmyVKOoUjVtUVWwSmZAkZokml+CshCXmMECmW4urTcxbUiBUB67tHwwFbt8rEVKk08X4kJAAhnccJdv2l+1YadbhQO4H1hwqIPeJyF2WxgbHOjB1EO5CI0Qdri4zNOOJc5YLA12kuFKm9qyTbnrN2ObgNhN5lMOkGOfagZtSfYVGwJ2U8ih2BRDuAiJNNXJObjMVx6sXzQTGWuVFVEUjzlK4K69Ow4yRYF/qPaoIU29eJ2snTWfa74IcDBViAy1NlNiBWkQGpcpUx4k4Wzkn7j7+OhhFUhTL7GcRuKvJIPA0XWACvjkK/1hjPoHbyWpnaA8GrJCrKqkgv/ovEU842RpPMBXHvofEqh3FgNBMD8Mn/aM6LJsO9vtIt6S+wBLX997lK8Ch8gvQY3LK7/JyVMqIqqftvZ7RLX9kxjieZC+JMOOAG21wzMpX28s+UXh907dmuwQh3H4eP1KPkheq/tUudQe3kLcBgx2wlu8LUohK2dLGzGCu9+g3xXOXveQDuBrokMKJCr77r2qX9pOqSJslZspym/Mo+Yn4LEqD+DItWH+atGil2MkD/sb5oSGCvUc+dK4jyQFYHQLCvUBGvVahIoLr4Q7frGUA+ceQ4kF5baI5+P9+BBEiTYVHgvRIsBOD8nKeKPHznWKEaHYEsyQyyynPSzG2gOW7pNUKhru2bUsJDURBH79j30nxNQkECFB+7Ua1/EwPvPRVNqkoeXjGbkWXwjctv1KchwizrwNBDhep6ELxId3/z6IMhvPWD76OUo2TZEzVq378WthdXnrkMCZCEPIP93fs39didj7Wr/PcM6ODwgBhh8n6Pq2tJR8T44/e8nwLZrqyPg7Pf7nSeDIfFoVSdQ9s1VI/UxgDZ5w4MBcaOY3lUVk9sl0rtGPsrQl9zOxVxBsnIW8z71/XGxT5EZVK1qJQa/RggQNyNHyE5NuWmWHLAXhdMqBEJAtcWbzPP+7+DhEhGXuF1KnVNMvp0puPwmctR8CTNqteY52ptLbOxdDUBqq0n7aOkjLZZFXWXOp1tSIikL5osrpzeqhLVQZrJ7gKMDpAt1DBpTR/Js1tqL5G1VWxI1sZbRAVws8DLW4KgqtXwQswUbkFiJH+5stVS6xhfx/PSTyCEDCQtRfOgrowFzQAgJpG99xjAz6xI16iYR1r2Fa4vrKxch8RITl7xAiLib0kRdePLgiEJ1BbZcwqF9xmIpPFcJJUwMU5DPy0n3jPz1+eIqs53F460N2EKmMo76YtQvKe3Wx0GXiVNRRkItqcYODVc8+OSQ8uozQtsGSEUIlAjykwqbGtaH1ydCnnGecnamfmKgvE+uTR4qajoPYZqsjhk93BlIKi8qhG7lZwTSa87KbbtDAa4ldpJoZjad1gWTp26q8fvCpAgmaXJYh4ndUI84jkBSn58fZykjZRCK8V6nfLGt767sglTxFS/gLTUeWZbj8MW+utkxTk59RQs4Lq4kEqurR6RJk6w3TrbGJsELhOjE+1LMLgMU8ZYlzwFHnXvb+px2YidH5FT9HKW7BzPb9J8KkTq01iRagJHfFO+O2bQiO9tLnVOb+pRvsLLJXXIpIJmTJBLK5L3Cuy1Sn4n3rs3V+G2LV203RTiDBoheRbmY6nt8iu3q+aYxlLInjxDOWkdk0x6rtoVU2nS/cpH1BCvLnWma+M4GkWewaPuZ6sAh5s6rnoVwyUjBzV+BSBYBhpTHpyriNvVzVzW2mEHGobGkWdRfvoDN/QArgKMX9rhKTdBnTovE4WgXElLUDqZYGLSpqhJjsaSZ1BJ4boy9jDLjjGCoiqTb6U6/B6sfMd4wU2UNopGk2dh3mvPsvYlPbjrUNlDCcxbHLdqL6hepUmDxpNmMRPkURx0713QPvJLepBNhuZ4VTzR72AhR+UEqZ38i8N/LLWzvzRVPcYwc+RR6PhwDSE/kynzAn++qn9O8aEe0X5BIYk9fbirabutfdi7R2FwY9YIo5hp8iSYd8H3i8/7t1fLkv6u+Ttr/8nTHHPMMcccc8wxxJfjQPts/JucpQAAAABJRU5ErkJggg==" alt="Error" style="width:7.5rem;height:7.5rem;object-fit:contain;"></div>'
          +'<h1 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 .5rem;">无法访问此网站</h1>'
          +'<p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 .25rem;">本网站仅支持在 <b>PC / Mac 的 Chrome 浏览器</b> 中打开</p>'
          +'<p style="font-size:14px;color:#9ca3af;margin:0;">如使用无误，<a href="#" id="__mieco_env_reload" style="color:#3b82f6;text-decoration:none;">请尝试重新加载</a></p>'
          +'</div>';
        (document.body||document.documentElement).appendChild(box);
        var rl=document.getElementById("__mieco_env_reload");
        if(rl)rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});
      }catch(e){}
    };
    draw();
    document.addEventListener("DOMContentLoaded",draw);
    window.addEventListener("load",draw);
    setInterval(function(){ if(window.__mieco_env_blocked){draw();} },1000);
  }catch(e){}
})();</script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="theme-color" content="#2563eb" />
    <title>小米移动电源详情</title>
    <script nonce="${scriptNonce}">${devtoolsScript}window.onerror=function(){return true;};window.addEventListener('error',function(e){e.preventDefault();},true);window.addEventListener('unhandledrejection',function(e){e.preventDefault();},true);</script>
    <script nonce="${scriptNonce}">
      if (window.trustedTypes && trustedTypes.createPolicy) {
        window.trustedTypes.createPolicy('default', { createHTML: s => s, createScript: s => s, createScriptURL: s => s });
      }
    </script>
    <style nonce="${scriptNonce}">:root { --banner-height: 0px; } body { padding-top: var(--banner-height) !important; } .fixed-header { top: var(--banner-height) !important; }</style>
    ${scriptTagMain}
    <script nonce="${scriptNonce}">document.addEventListener("DOMContentLoaded", function () { import("/eco--usb-device-web/static/assets/index-17f0f8a6.v31.js").catch(function () {}); });</script>
    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/react-vendor-252eb283.read.js" nonce="${scriptNonce}">
    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.v31.js" nonce="${scriptNonce}">
    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/ModelData-16716423.v31.js" nonce="${scriptNonce}">
    <link rel="stylesheet" crossorigin href="/eco--usb-device-web/static/assets/index-30406512.v31.css" nonce="${scriptNonce}">
  </head>
  <body style="margin: 0;">
    <div id="blue-banner" style="position: fixed; top: 0px; left: 0px; width: 100%; background: rgb(0, 122, 204); color: white; text-align: center; padding: 8px 5px; font-size: 12px; z-index: 999999; font-family: sans-serif; box-sizing: border-box;">
      <div>网页快照 - 抓取时间: 2026/10/15 20:00:46 | 原网址: <a href="https://powerbank.mieco.net/" target="_blank" style="color:white; text-decoration:underline;">https://powerbank.mieco.net/</a></div>
      <div style="margin-top: 4px; font-weight: bold;">此快照版本修改了部分设备qi2.2开启和关闭功能的相关配置</div>
      <div style="color: #e2e8f0; font-size: 10px; margin-top: 4px; line-height: 1.4;">仅供学习研究 不推荐任何非官方修改设备行为 可能造成的安全和法律风险请自行承担${repoHtml}${migrationHtml}</div><div style="margin-top: 8px;"><a href="/supportqi2" style="display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.65); color: #fff; padding: 4px 16px; border-radius: 999px; font-size: 12px; text-decoration: none;">QI 2.2 支持机型一览</a> </div>
    </div>
    <div id="root"></div>
    <div id="mieco-loading" style="position:fixed;inset:0;background:#f7f8fa;z-index:2147483000;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;">
      <div style="width:320px;text-align:center;">
        <div style="font-size:14px;color:#374151;margin-bottom:12px;">正在加载小米移动电源详情…</div>
        <div style="height:6px;background:#e5e7eb;border-radius:999px;overflow:hidden;"><div id="mieco-loading-bar" style="height:100%;width:0%;background:#2563eb;border-radius:999px;transition:width .35s ease;"></div></div>
        <div style="margin-top:10px;font-size:12px;color:#9ca3af;"><span id="mieco-loading-pct">0%</span></div>
        <div id="mieco-loading-slow" style="display:none;margin-top:16px;font-size:12px;color:#9ca3af;">加载较慢？<a href="#" id="mieco-loading-reload" style="color:#3b82f6;text-decoration:none;">重新加载</a></div>

    <script nonce="${scriptNonce}">(function(){
  var el=document.getElementById("mieco-loading");
  if(!el){return;}
  var bar=document.getElementById("mieco-loading-bar"), pctEl=document.getElementById("mieco-loading-pct");
  var done=false, p=3;
  function set(v){p=v;bar.style.width=v+"%";pctEl.textContent=Math.round(v)+"%";}
  set(3);
  var t=setInterval(function(){ if(done){return;} p=Math.min(p+Math.random()*7,97); set(p); },350);
  var slow=document.getElementById("mieco-loading-slow");
  var rl=document.getElementById("mieco-loading-reload");
  if(rl){rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});}
  setTimeout(function(){ if(!done&&slow){slow.style.display="block";} },12000);
  function finish(){ if(done){return;} done=true; clearInterval(t); set(100); setTimeout(function(){ el.style.transition="opacity .3s"; el.style.opacity="0"; setTimeout(function(){ el.remove(); },320); },200); }
  var root=document.getElementById("root");
  if(root){
    try{ var mo=new MutationObserver(function(){ if(root.childElementCount>0){ mo.disconnect(); finish(); } }); mo.observe(root,{childList:true,subtree:false}); }catch(e){}
    var iv=setInterval(function(){ if(done){clearInterval(iv);return;} if(root.childElementCount>0){ clearInterval(iv); finish(); } },400);
  }
  window.addEventListener("load",function(){ setTimeout(function(){ if(root&&root.childElementCount>0){finish();} },800); });
})();</script>
    <script nonce="${scriptNonce}">
      function adjustPadding() {
        var banner = document.getElementById('blue-banner');
        if (banner) document.documentElement.style.setProperty('--banner-height', banner.offsetHeight + 'px');
      }
      window.addEventListener('load', adjustPadding); window.addEventListener('resize', adjustPadding); adjustPadding(); setInterval(adjustPadding, 500);

    </script>
  </body>
</html>`;

    return new Response(htmlContent, { headers: applySecurityHeaders(successHeaders, true) });
  }
};