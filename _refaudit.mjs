import fs from "node:fs";
const R = process.cwd();
const files = ["src/index.js","src/XiaomiPowerBankPanel.js","src/ModelSupportPanel.js","src/ModelData.js"];
let stale = 0, missing = [];
for (const f of files) {
  const t = fs.readFileSync(R + "/" + f, "utf8");
  stale += (t.match(/\.read\d+\.js|\.v\d+\.js/g) || []).length;
  for (const ref of new Set(t.match(/\.\/[A-Za-z0-9_.-]+\.js/g) || [])) {
    const p = R + "/src/" + ref.replace("./", "");
    if (!fs.existsSync(p)) missing.push(f + " -> " + ref);
  }
}
console.log(JSON.stringify({ staleVersionRefs: stale, missingImports: missing, qr: fs.existsSync(R + "/assets/sponsor-qr.jpg") }, null, 1));