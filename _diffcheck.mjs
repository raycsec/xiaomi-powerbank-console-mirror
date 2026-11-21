import fs from "node:fs";
import crypto from "node:crypto";
const repo = fs.readFileSync("src/XiaomiPowerBankPanel.js", "utf8");
const builtRead = fs.readFileSync("C:/Users/Nalani/Documents/Codex/2026-10-16/https-dash-cloudflare-com-48a272b3edae24eeb4cf1aa374aee478-workers/work/public/eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.read14.js", "utf8");
const builtV = fs.readFileSync("C:/Users/Nalani/Documents/Codex/2026-10-16/https-dash-cloudflare-com-48a272b3edae24eeb4cf1aa374aee478-workers/work/public/eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.v14.js", "utf8");
const refDiff = (t) => [...new Set(t.match(/\.\/[A-Za-z0-9_-]+\.js/g) || [])].sort().join(",");
console.log("repo bytes:", repo.length, "| builtRead bytes:", builtRead.length, "| builtV bytes:", builtV.length);
console.log("refs repo:", refDiff(repo));
console.log("refs builtRead:", refDiff(builtRead));
const diff = [];
const a = repo, b = builtRead;
if (a.length === b.length) {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff.push(i);
  console.log("first diff offsets:", diff.slice(0, 5));
  if (diff.length) {
    const k = diff[0];
    console.log("repo ctx:", JSON.stringify(a.slice(Math.max(0, k - 90), k + 90)));
    console.log("build ctx:", JSON.stringify(b.slice(Math.max(0, k - 90), k + 90)));
  }
} else {
  console.log("length mismatch");
  const ha = crypto.createHash("sha256").update(a).digest("hex").slice(0, 12);
  const hb = crypto.createHash("sha256").update(b).digest("hex").slice(0, 12);
  console.log("sha repo", ha, "build", hb);
}