import type { HidLogEntry, Qi2Stats } from "../types/domain.js";

export const APP_VERSION = "v39";
export const UI_BADGE_VERSION = "v39";

export interface ReportQi2EventInput {
  model?: string;
  snBytes?: Uint8Array | null;
  fallbackSeed?: string;
  action: boolean;
  ok: boolean;
  detail?: string;
  info?: Record<string, unknown>;
  devLogs?: HidLogEntry[];
  fetchImpl?: typeof fetch | null;
  pageUrl?: string;
}

export async function hashSerialHex(
  snBytes?: Uint8Array | null,
  fallbackSeed = "UNKNOWN",
): Promise<string> {
  const seed =
    snBytes instanceof Uint8Array && snBytes.length > 0
      ? snBytes
      : new TextEncoder().encode(String(fallbackSeed));
  const digest = await crypto.subtle.digest("SHA-256", seed as BufferSource);
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
}: ReportQi2EventInput): Promise<{ sent: boolean; status?: number }> {
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

export async function fetchQi2Stats(
  model: string,
  fetchImpl: typeof fetch | null = typeof fetch === "function" ? fetch : null,
): Promise<Qi2Stats | null> {
  if (!fetchImpl || !model) return null;
  try {
    const res = await fetchImpl(`/api/qi2-stats?model=${encodeURIComponent(model)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Qi2Stats;
    return data?.ok ? data : null;
  } catch {
    return null;
  }
}
