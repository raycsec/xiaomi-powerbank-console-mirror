import fs from "node:fs";
const panel = fs.readFileSync("src/XiaomiPowerBankPanel.js", "utf8");
const i = panel.indexOf("_qi2Encrypted = async");
const j = panel.indexOf("\n      },", i);
const fn = panel.slice(i, j);
const marks = [
  ["hello", fn.indexOf("sendCommand(e4, o2")],
  ["statusBefore", fn.indexOf("_qi2QueryNow")],
  ["batteryRead", fn.indexOf("sendBatteryInfoCommand")],
  ["write", fn.indexOf("sendEncryptedQi2Command")],
  ["statusAfter", fn.lastIndexOf("_qi2QueryNow")],
];
console.log("encrypted order:", marks.map(([k, v]) => k + "@" + v).join(" -> "));
console.log("early-return:", /if \(c2 && c2\.success && c2\.isEnabled === t2\) return void _setQi2On\(t2\)/.test(fn));
console.log("readback checks status+enabled only:", fn.includes("m2.isEnabled !== t2"), "| health/cycle compare:", /batteryHealth\s*!==|cycleCount\s*!==/.test(fn));
const built = fs.readFileSync("C:/Users/Nalani/Documents/Codex/2026-10-16/https-dash-cloudflare-com-48a272b3edae24eeb4cf1aa374aee478-workers/work/public/eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.read14.js", "utf8");
console.log("repo panel == built read14:", panel === built);