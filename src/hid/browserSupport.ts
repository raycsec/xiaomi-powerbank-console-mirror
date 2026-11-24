export interface WebHidSupportResult {
  supported: boolean;
  reason: string | null;
}

export function checkWebHidSupport(
  nav: Pick<Navigator, "hid"> | null = typeof navigator !== "undefined" ? navigator : null,
): WebHidSupportResult {
  const hasHid = Boolean(
    nav &&
      nav.hid &&
      typeof nav.hid.requestDevice === "function" &&
      typeof nav.hid.getDevices === "function",
  );
  return {
    supported: hasHid,
    reason: hasHid ? null : "webhid_unavailable",
  };
}
