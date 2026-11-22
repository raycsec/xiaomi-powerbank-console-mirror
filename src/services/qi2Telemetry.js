export const APP_VERSION = "v33";

export async function hashSerialHex(snBytes, fallbackSeed = "UNKNOWN") {
  const seed =
    snBytes instanceof Uint8Array && snBytes.length > 0
      ? snBytes
      : new TextEncoder().encode(String(fallbackSeed));
  const digest = await crypto.subtle.digest("SHA-256", seed);
  return Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function reportQi2Event({
  model,
  snBytes,
  fallbackSeed,
  action,
  ok,
  detail,
  info = {},
  devLogs = [],
  fetchImpl = typeof fetch === "function" ? fetch : null,
  pageUrl = typeof location !== "undefined" ? location.origin + location.pathname : "",
}) {
  if (!fetchImpl) return { sent: false };
  try {
    const snHash = await hashSerialHex(snBytes, fallbackSeed || model);
    const res = await fetchImpl("/api/qi2-report", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        model: String(model || "GENERIC").toUpperCase(),
        snHash,
        action: action ? "on" : "off",
        appVersion: APP_VERSION,
        reportedAt: new Date().toISOString(),
        pageUrl,
        ok: Boolean(ok),
        detail: String(detail || "").slice(0, 400),
        info,
        devLogs: Array.isArray(devLogs) ? devLogs.slice(-120) : [],
      }),
    });
    return { sent: true, status: res.status };
  } catch {
    return { sent: false };
  }
}

export async function fetchQi2Stats(model, fetchImpl = typeof fetch === "function" ? fetch : null) {
  if (!fetchImpl || !model) return null;
  try {
    const res = await fetchImpl(`/api/qi2-stats?model=${encodeURIComponent(model)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.ok ? data : null;
  } catch {
    return null;
  }
}
