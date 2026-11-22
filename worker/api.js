import { createSignedToken, sha256Hex, signHmac, verifySignedToken } from "./crypto.js";

const usedJtiMemory = new Set();
const cnTokenMemory = new Set();
let tablesInitialized = false;

export function parseCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    if (part.slice(0, idx).trim() === name) return part.slice(idx + 1).trim();
  }
  return null;
}

export async function ensureTables(env) {
  if (!env.DB || tablesInitialized) return;
  try {
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS auth_sessions (token TEXT PRIMARY KEY, created_at INTEGER)").run();
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS used_tokens (jti TEXT PRIMARY KEY, used_at INTEGER)").run();
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS cn_tokens (token TEXT PRIMARY KEY, created_at INTEGER)").run();
    await env.DB.prepare(
      "CREATE TABLE IF NOT EXISTS qi2_reports (model TEXT, sn_hash TEXT, action TEXT, ok INTEGER, detail TEXT, info TEXT, dev_logs TEXT, app_version TEXT, reported_at TEXT, created_at INTEGER, updated_at INTEGER, PRIMARY KEY (model, sn_hash, action))",
    ).run();
    tablesInitialized = true;
  } catch {}
}

export async function isSessionAuthorized(request, env, authSecret, agreeSecret) {
  const cookie = request.headers.get("cookie") || "";
  const sid = parseCookie(cookie, "m_sid");
  const agree = parseCookie(cookie, "m_agree");
  if (!sid || !agree) return { authorized: false, payload: null };

  const authPayload = await verifySignedToken(sid, authSecret);
  const agreePayload = await verifySignedToken(agree, agreeSecret);
  if (
    !authPayload ||
    !agreePayload ||
    authPayload.vid !== agreePayload.vid ||
    Date.now() > agreePayload.exp
  ) {
    return { authorized: false, payload: null };
  }

  if (env.DB) {
    try {
      const rows = await env.DB.prepare("SELECT token FROM auth_sessions WHERE token IN (?1, ?2)")
        .bind(`AUTH_${authPayload.vid}`, `AGREE_${authPayload.vid}`)
        .all();
      if (!rows?.results || rows.results.length !== 2) {
        return { authorized: false, payload: null };
      }
    } catch {}
  }
  return { authorized: true, payload: authPayload };
}

export async function handleDestroyToken(request, env, authSecret, headers) {
  const sid = parseCookie(request.headers.get("cookie") || "", "m_sid");
  if (sid && env.DB) {
    const payload = await verifySignedToken(sid, authSecret);
    if (payload?.vid) {
      await env.DB.prepare("DELETE FROM auth_sessions WHERE token IN (?1, ?2)")
        .bind(`AUTH_${payload.vid}`, `AGREE_${payload.vid}`)
        .run()
        .catch(() => {});
    }
  }
  return new Response("OK", { status: 200, headers });
}

export async function handleConfirmCn(env, authSecret, headers) {
  const now = Date.now();
  const actionToken = await createSignedToken({ jti: crypto.randomUUID(), type: "CN_CONFIRM" }, authSecret);
  if (env.DB) {
    await env.DB.prepare("INSERT INTO cn_tokens (token, created_at) VALUES (?1, ?2)").bind(actionToken, now).run();
  } else {
    cnTokenMemory.add(actionToken);
  }
  return Response.json({ action_token: actionToken }, { headers });
}

export async function handleQi2Stats(url, env, headers) {
  const model = String(url.searchParams.get("model") || "").toUpperCase().slice(0, 40);
  if (!/^[A-Z0-9_-]{1,40}$/.test(model)) {
    return Response.json({ ok: false, error: "invalid_model" }, { status: 400, headers });
  }
  if (!env.DB) {
    return Response.json({ ok: true, model, total: 0, success: 0, errors: 0, successRate: 0, errorRate: 0 }, { headers });
  }
  const row = await env.DB.prepare(
    "SELECT COUNT(*) AS total, SUM(ok) AS success FROM qi2_reports WHERE model = ?1 AND action = 'on'",
  )
    .bind(model)
    .first();
  const total = row?.total || 0;
  const success = row?.success || 0;
  const errors = Math.max(0, total - success);
  return Response.json(
    { ok: true, model, total, success, errors, successRate: total ? success / total : 0, errorRate: total ? errors / total : 0 },
    { headers },
  );
}

export async function handleQi2Report(request, env, authSecret, agreeSecret, headers) {
  const { authorized } = await isSessionAuthorized(request, env, authSecret, agreeSecret);
  if (!authorized && env.MIRROR_DEV_MODE !== "1") {
    return Response.json({ ok: false, error: "forbidden" }, { status: 403, headers });
  }
  const data = await request.json();
  const model = String(data.model || "").toUpperCase().slice(0, 40);
  const snHash = String(data.snHash || "").toLowerCase().slice(0, 64);
  const action = data.action === "off" ? "off" : "on";
  if (!/^[A-Z0-9_-]{1,40}$/.test(model) || !/^[a-f0-9]{16,64}$/.test(snHash)) {
    return Response.json({ ok: false, error: "invalid_payload" }, { status: 400, headers });
  }
  if (!env.DB) {
    return Response.json({ ok: true, stored: false }, { headers });
  }
  const now = Date.now();
  await env.DB.prepare(
    "INSERT INTO qi2_reports (model, sn_hash, action, ok, detail, info, dev_logs, app_version, reported_at, created_at, updated_at) " +
      "VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11) " +
      "ON CONFLICT(model, sn_hash, action) DO UPDATE SET ok=?4, detail=?5, info=?6, dev_logs=?7, app_version=?8, reported_at=?9, updated_at=?11",
  )
    .bind(
      model, snHash, action, data.ok ? 1 : 0,
      String(data.detail || "").slice(0, 400),
      JSON.stringify(data.info || {}).slice(0, 4000),
      data.devLogs ? JSON.stringify(data.devLogs).slice(0, 60000) : "",
      String(data.appVersion || "").slice(0, 40),
      String(data.reportedAt || new Date().toISOString()),
      now, now,
    )
    .run();
  return Response.json({ ok: true, stored: true }, { headers });
}

export async function handleReportFingerprint(request, authSecret, isCN, headers) {
  const data = await request.json();
  const cookie = request.headers.get("cookie") || "";
  const csrfCookie = parseCookie(cookie, "c_t");
  const challenge = parseCookie(cookie, "ch_t");
  const challengeSig = parseCookie(cookie, "ch_s");
  const pageToken = parseCookie(cookie, "pt_m");
  const csrfHeader = request.headers.get("X-CSRF-Token");
  const integrityHeader = request.headers.get("X-Page-Integrity");

  if (!csrfHeader || csrfHeader !== csrfCookie || !challenge || !challengeSig || !pageToken || !integrityHeader) {
    return new Response("Forbidden", { status: 403, headers });
  }
  if ((await signHmac(challenge, authSecret)) !== challengeSig) {
    return new Response("Forbidden", { status: 403, headers });
  }
  const expectedPow = await sha256Hex(`${challenge}${data.nonce}${challengeSig}`);
  if (!expectedPow.startsWith("0000") || data.sig !== expectedPow) {
    return new Response("PoW Failed", { status: 403, headers });
  }
  const expectedIntegrity = await sha256Hex(`${challenge}${pageToken}HTMLBodyElement${challengeSig}`);
  if (expectedIntegrity !== integrityHeader) {
    return new Response("Integrity Compromised", { status: 403, headers });
  }
  if (request.cf?.botManagement && request.cf.botManagement.score < 30) {
    return new Response("Bot Detected by CF", { status: 403, headers });
  }

  const now = Date.now();
  const ott = await createSignedToken(
    { vid: data.visitId || crypto.randomUUID(), jti: crypto.randomUUID(), type: "OTT", isCN, iat: now, exp: now + 60000 },
    authSecret,
  );
  return Response.json({ ott }, { headers });
}

export async function handleAgree(request, env, authSecret, agreeSecret, headers, minWaitMs = 3000) {
  const { ott, action_token: actionToken } = await request.json();
  if (!ott) return new Response("Missing OTT", { status: 403, headers });
  const payload = await verifySignedToken(ott, authSecret);
  const now = Date.now();
  if (!payload || payload.type !== "OTT" || now > payload.exp) {
    return new Response("Invalid OTT", { status: 403, headers });
  }
  if (now - payload.iat < minWaitMs) {
    return new Response("Too Fast", { status: 403, headers });
  }

  if (payload.isCN) {
    if (!actionToken) return new Response("Requires Action Token", { status: 403, headers });
    if (env.DB) {
      const row = await env.DB.prepare("SELECT token FROM cn_tokens WHERE token = ?1").bind(actionToken).first();
      if (!row) return new Response("Invalid CN Confirmation", { status: 403, headers });
      await env.DB.prepare("DELETE FROM cn_tokens WHERE token = ?1").bind(actionToken).run();
    } else if (!cnTokenMemory.delete(actionToken)) {
      return new Response("Invalid CN Confirmation", { status: 403, headers });
    }
    const actionPayload = await verifySignedToken(actionToken, authSecret);
    if (!actionPayload || actionPayload.type !== "CN_CONFIRM") {
      return new Response("Invalid CN Confirmation", { status: 403, headers });
    }
  }

  if (env.DB) {
    try {
      await env.DB.prepare("INSERT INTO used_tokens (jti, used_at) VALUES (?1, ?2)").bind(payload.jti, now).run();
    } catch {
      return new Response("Token Already Used", { status: 403, headers });
    }
  } else {
    if (usedJtiMemory.has(payload.jti)) {
      return new Response("Token Already Used", { status: 403, headers });
    }
    usedJtiMemory.add(payload.jti);
  }

  const sidToken = await createSignedToken({ vid: payload.vid, exp: now + 7200000 }, authSecret);
  const agreeToken = await createSignedToken({ vid: payload.vid, exp: now + 7200000 }, agreeSecret);
  if (env.DB) {
    await env.DB.batch([
      env.DB.prepare("INSERT OR REPLACE INTO auth_sessions (token, created_at) VALUES (?1, ?2)").bind(`AUTH_${payload.vid}`, now),
      env.DB.prepare("INSERT OR REPLACE INTO auth_sessions (token, created_at) VALUES (?1, ?2)").bind(`AGREE_${payload.vid}`, now),
    ]);
  }
  const respHeaders = new Headers(headers);
  respHeaders.append("Set-Cookie", `m_sid=${sidToken}; Path=/; HttpOnly; SameSite=Lax; Secure`);
  respHeaders.append("Set-Cookie", `m_agree=${agreeToken}; Path=/; HttpOnly; SameSite=Lax; Secure`);
  return new Response("OK", { status: 200, headers: respHeaders });
}
