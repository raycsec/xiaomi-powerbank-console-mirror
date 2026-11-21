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

    if (url.searchParams.get('reject') === '1') {
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
        try { info = JSON.stringify(data.info || {}).slice(0, 800); } catch (err) { info = ''; }
        if (!/^[A-Z0-9_-]{1,40}$/.test(model) || !/^[a-f0-9]{16,64}$/.test(snHash)) {
          return new Response(JSON.stringify({ ok: false, error: 'invalid payload' }), { status: 400, headers: applySecurityHeaders(jsonHeaders) });
        }
        if (!env.DB) return new Response(JSON.stringify({ ok: true, stored: false }), { status: 200, headers: applySecurityHeaders(jsonHeaders) });
        const now = Date.now();
        await env.DB.prepare('INSERT INTO qi2_reports (model, sn_hash, action, ok, detail, info, created_at, updated_at) VALUES (?1,?2,?3,?4,?5,?6,?7,?8) ON CONFLICT(model, sn_hash, action) DO UPDATE SET ok = ?4, detail = ?5, info = ?6, updated_at = ?8')
          .bind(model, snHash, action, okFlag, detail, info, now, now).run();
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

    if (!['/', '/models', '/api/report-fingerprint', '/api/agree', '/api/verify-env', '/api/confirm-cn'].includes(url.pathname)) {
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
        const errorHtmlContent = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><meta name="theme-color" content="#ef4444" /><title>校验失败</title><script nonce="${scriptNonce}">${devtoolsScript}window.onerror=function(){return true;};window.addEventListener('error',function(e){e.preventDefault();},true);window.addEventListener('unhandledrejection',function(e){e.preventDefault();},true);</script></head><body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px);"><div style="background: white; padding: 30px; border-radius: 12px; text-align: center; max-width: 400px; width: 90%; box-shadow: 0 4px 20px rgba(0,0,0,0.3); font-family: sans-serif;"><svg style="width: 64px; height: 64px; color: #ef4444; margin: 0 auto 16px; display: block;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><h2 style="margin-top: 0; color: #111827;">安全令牌校验失败</h2><p style="color: #4b5563; line-height: 1.5; font-size: 14px; margin-bottom: 24px;">您的访问凭证已失效（因非法请求、篡改、网络异常或协议超时）。为保障安全，请重新签署授权流程。</p><a href="${url.pathname}" style="display: block; box-sizing: border-box; text-decoration: none; background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; width: 100%; transition: opacity 0.2s;">重新获取安全凭证</a></div></body></html>`;
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
          window.__mieco_pow_running = true;
          let nonce = 0;
          let sig = '';
          while(true) {
              sig = await S2(ch + nonce + chS);
              if (sig.startsWith('0000')) break;
              nonce++;
              if (nonce % 250 === 0) {
                  bA.innerText = '计算安全证明中... (' + nonce + ')';
                  await new Promise(r => setTimeout(r, 5));
              }
          }
          window.__mieco_pow_running = false;

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
        } catch(e) { window.__mieco_pow_running = false; window.location.href = '?error=1'; }

        bA.addEventListener('click', async function(e) {
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
        }, 10000);
      }));
    }

    const successHeaders = new Headers();
    successHeaders.set('content-type', 'text/html;charset=UTF-8');
    const showMigrationNotice = url.hostname === 'mirror-mieco.nalaniflynn.cn';
    const migrationHtml = showMigrationNotice ? '<div style="margin-top: 6px;">网站即将迁移到 <a href="https://mirror-mieco.raycsec.com/" style="color:#fff;text-decoration:underline;">https://mirror-mieco.raycsec.com/</a></div>' : '';
    const repoHtml = '<div style="margin-top: 6px;">开源地址：<a href="https://github.com/raycsec/xiaomi-powerbank-console-mirror" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;">github.com/raycsec/xiaomi-powerbank-console-mirror</a></div>';
    const scriptTagMain = _g('__mieco_qi2_enabled', scriptNonce, appSecret);

    if (url.pathname === '/models') {
      const modelsHtmlContent = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
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
    <script type="module" crossorigin src="https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/assets/index-DIuXkLo4.js" nonce="${scriptNonce}"></script>
    <link rel="modulepreload" crossorigin href="https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/assets/react-vendor-tpvIM1oe.js" nonce="${scriptNonce}">
    <link rel="stylesheet" crossorigin href="https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/assets/index-DZxvydNm.css" nonce="${scriptNonce}">
  </head>
  <body style="margin: 0;">
    <div id="blue-banner" style="position: fixed; top: 0px; left: 0px; width: 100%; background: rgb(0, 122, 204); color: white; text-align: center; padding: 8px 5px; font-size: 12px; z-index: 999999; font-family: sans-serif; box-sizing: border-box;">
      <div>网页快照 - 抓取时间: 2026/5/22 20:06:28 | 原网址: <a href="https://powerbank.mieco.net/" target="_blank" style="color:white; text-decoration:underline;">https://powerbank.mieco.net/</a></div>
      <div style="margin-top: 4px; font-weight: bold;">此快照版本修改了部分设备qi2.2开启和关闭功能的相关配置</div>
      <div style="color: #e2e8f0; font-size: 10px; margin-top: 4px; line-height: 1.4;">仅供学习研究 不推荐任何非官方修改设备行为 可能造成的安全和法律风险请自行承担${repoHtml}${migrationHtml}</div>
    </div>
    <div id="root"></div>
    <script nonce="${scriptNonce}">
      function adjustPadding() {
        var banner = document.getElementById('blue-banner');
        if (banner) document.documentElement.style.setProperty('--banner-height', banner.offsetHeight + 'px');
      }
      window.addEventListener('load', adjustPadding); window.addEventListener('resize', adjustPadding); adjustPadding(); setInterval(adjustPadding, 500);
      window.addEventListener('load', function() { setTimeout(function() { fetch('/api/destroy-token', { method: 'POST' }).catch(function(){}); }, 1000); });
    </script>
  </body>
</html>`;
      return new Response(modelsHtmlContent, { headers: applySecurityHeaders(successHeaders, true) });
    }

    const htmlContent = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
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
    <script type="module" crossorigin src="https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/assets/index-DIuXkLo4.js" nonce="${scriptNonce}"></script>
    <link rel="modulepreload" crossorigin href="https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/assets/react-vendor-tpvIM1oe.js" nonce="${scriptNonce}">
    <link rel="stylesheet" crossorigin href="https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/assets/index-DZxvydNm.css" nonce="${scriptNonce}">
  </head>
  <body style="margin: 0;">
    <div id="blue-banner" style="position: fixed; top: 0px; left: 0px; width: 100%; background: rgb(0, 122, 204); color: white; text-align: center; padding: 8px 5px; font-size: 12px; z-index: 999999; font-family: sans-serif; box-sizing: border-box;">
      <div>网页快照 - 抓取时间: 2026/5/22 20:06:28 | 原网址: <a href="https://powerbank.mieco.net/" target="_blank" style="color:white; text-decoration:underline;">https://powerbank.mieco.net/</a></div>
      <div style="margin-top: 4px; font-weight: bold;">此快照版本修改了部分设备qi2.2开启和关闭功能的相关配置</div>
      <div style="color: #e2e8f0; font-size: 10px; margin-top: 4px; line-height: 1.4;">仅供学习研究 不推荐任何非官方修改设备行为 可能造成的安全和法律风险请自行承担${repoHtml}${migrationHtml}</div>
    </div>
    <div id="root"></div>
    <script nonce="${scriptNonce}">
      function adjustPadding() {
        var banner = document.getElementById('blue-banner');
        if (banner) document.documentElement.style.setProperty('--banner-height', banner.offsetHeight + 'px');
      }
      window.addEventListener('load', adjustPadding); window.addEventListener('resize', adjustPadding); adjustPadding(); setInterval(adjustPadding, 500);

      (function initMiecoHack_${appSecret}() {
        window.__mieco_qi2_enabled = false; 
        const hookedDevices = new WeakSet();

        function calculateCRC8(dataArray) {
          let t = 0;
          let i = 0;
          let state = 1;
          let byte = 0, j = 0;
          while (state !== 0) {
            switch (state) {
              case 1: if (i < dataArray.length) { byte = dataArray[i]; state = 2; } else { state = 0; } break;
              case 2: t ^= byte; j = 0; state = 3; break;
              case 3: if (j < 8) { state = 4; } else { i++; state = 1; } break;
              case 4: if (t & 128) { t = (t << 1) ^ 7; } else { t <<= 1; } state = 5; break;
              case 5: t &= 255; j++; state = 3; break;
            }
          }
          return t;
        }

        if (window.HIDDevice && HIDDevice.prototype.sendReport) {
            const originalSendReport = HIDDevice.prototype.sendReport;
            HIDDevice.prototype.sendReport = async function(reportId, data) {
              try {
                const buffer = new Uint8Array(data.buffer || data);
                if (buffer.length > 1 && buffer[0] === 0xA5) {
                  const cmd = buffer[1];
                  if (cmd === 0x06) {
                    setTimeout(() => {
                      const frameData = [0xA5, 0x07, 0];
                      frameData.push(calculateCRC8(frameData));
                      const reqBuf = new Uint8Array(32);
                      reqBuf.set(frameData);
                      originalSendReport.call(this, 0, reqBuf);
                    }, 500);
                  } 
                }
              } catch (err) {}
              return originalSendReport.apply(this, arguments);
            };
        }

        function handleInputReport(e) {
          const data = new Uint8Array(e.data.buffer);
          if (data[0] !== 0xA5) return;
          const cmd = data[1];

          if (cmd === 0x17) {
            const isSuccess = data[3] === 0;
            const isEnabled = data[4] === 1; 
            
            if (isSuccess) {
              window.__mieco_qi2_enabled = isEnabled;
              const card = document.getElementById("mieco-qi2-card");
              if (card) {
                card.style.display = isEnabled ? "flex" : "none";
              }
              if (isEnabled) {
                const btn = document.getElementById("btn-disable-qi2");
                if (btn) {
                  btn.innerText = "强制关闭";
                  btn.disabled = false;
                  btn.style.opacity = "1";
                }
              }
            }
          }
          
          if (cmd === 0x16) {
            const status = data[3];
            const btn = document.getElementById("btn-disable-qi2");
            if (status === 0) {
               if (btn) btn.innerText = "关闭成功";
            }
          }
        }

        setInterval(async () => {
          if (!navigator.hid) return;
          try {
            const devices = await navigator.hid.getDevices();
            for (const device of devices) {
              if (device.opened && !hookedDevices.has(device)) {
                hookedDevices.add(device);
                device.addEventListener("inputreport", handleInputReport);
                const frameData = [0xA5, 0x07, 0];
                frameData.push(calculateCRC8(frameData));
                const reqBuf = new Uint8Array(32);
                reqBuf.set(frameData);
                if (HIDDevice.prototype.sendReport) {
                    HIDDevice.prototype.sendReport.call(device, 0, reqBuf);
                }
              }
            }
          } catch(e) {}
        }, 1500);

        setInterval(async () => {
          if (!navigator.hid) return;
          try {
            const devices = await navigator.hid.getDevices();
            for (const device of devices) {
              if (device.opened && hookedDevices.has(device)) {
                const frameData = [0xA5, 0x07, 0];
                frameData.push(calculateCRC8(frameData));
                const reqBuf = new Uint8Array(32);
                reqBuf.set(frameData);
                if (HIDDevice.prototype.sendReport) {
                    HIDDevice.prototype.sendReport.call(device, 0, reqBuf);
                }
              }
            }
          } catch(e) {}
        }, 5000);

        const qi2CardHTML = '<div id="mieco-qi2-card" class="card p-8 flex justify-between items-center" style="display: none; margin-top: 16px; margin-bottom: 16px; border: 1px solid #e5e7eb; border-radius: 16px; background: #fff; padding: 1.5rem 2rem; justify-content: space-between; align-items: center; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); width: 100%; box-sizing: border-box; transition: opacity 0.3s ease;">' +
          '<div>' +
            '<h2 class="text-base font-bold text-gray-900 mb-1" style="margin: 0 0 0.25rem 0; font-size: 16px; font-weight: bold; color: #111827;">此设备已开启 QI 2.2 功能</h2>' +
            '<p class="text-xs text-gray-500" style="margin: 0; font-size: 12px; color: #6b7280;">当前设备支持 25W 无线快充。如遇异常可点击右侧强制关闭。</p>' +
          '</div>' +
          '<div class="flex items-center space-x-3">' +
            '<button id="btn-disable-qi2" class="text-white px-6 py-1.5 rounded text-sm font-medium border-none outline-none" style="background-color: #F5222D; color: white; border-radius: 16px; padding: 6px 24px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; outline: none;">强制关闭</button>' +
          '</div>' +
        '</div>';

        const observer = new MutationObserver(() => {
          const bodyText = document.body.innerText;
          const isQi2Supported = bodyText.includes("WPB1025S") || bodyText.includes("小米金沙江");
          const existingCard = document.getElementById("mieco-qi2-card");
          
          if (isQi2Supported && !existingCard) {
            const cards = document.querySelectorAll(".card");
            if (cards.length > 0) {
              const lastCard = cards[cards.length - 1];
              const tempWrapper = document.createElement("div");
              tempWrapper.innerHTML = qi2CardHTML;
              const newCard = tempWrapper.firstElementChild;
              
              newCard.style.display = window.__mieco_qi2_enabled ? "flex" : "none";
              lastCard.parentNode.insertBefore(newCard, lastCard.nextSibling);
              
              const btn = document.getElementById("btn-disable-qi2");
              btn.addEventListener("click", async (e) => {
                btn.innerText = "写入中...";
                btn.style.opacity = "0.7";
                btn.disabled = true;
                try {
                  const devices = await navigator.hid.getDevices();
                  const device = devices.find(d => d.opened);
                  if (device) {
                    const frameData = [0xA5, 0x06, 1, 0x00];
                    frameData.push(calculateCRC8(frameData));
                    const reqBuf = new Uint8Array(32);
                    reqBuf.set(frameData);
                    
                    await device.sendReport(0, reqBuf);
                  }
                } catch(err) {
                  btn.innerText = "发送失败";
                  setTimeout(() => { btn.innerText = "强制关闭"; btn.disabled = false; btn.style.opacity = "1"; }, 2000);
                }
              });
            }
          } else if (!isQi2Supported && existingCard) {
            existingCard.remove();
          }
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
      })();

      window.addEventListener('load', function() { setTimeout(function() { fetch('/api/destroy-token', { method: 'POST' }).catch(function(){}); }, 1000); });
    </script>
  </body>
</html>`;

    return new Response(htmlContent, { headers: applySecurityHeaders(successHeaders, true) });
  }
};