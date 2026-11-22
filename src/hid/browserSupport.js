export function checkWebHidSupport(nav = typeof navigator !== "undefined" ? navigator : null) {
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
