#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const token = process.env.CF_API_TOKEN;
const accountId = process.argv[2];
const d1Id = process.argv[3];
const scriptName = process.env.WORKER_NAME || "mirror-mieco";
const bucketName = process.env.R2_BUCKET || "xiaomi-mirror";

if (!token || !accountId || !d1Id) {
  console.error("usage: CF_API_TOKEN=... node deploy/deploy.mjs <accountId> <d1DatabaseId>");
  process.exit(1);
}

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const workerDir = path.join(here, "..", "worker");
const modules = fs.readdirSync(workerDir).filter((f) => f.endsWith(".js")).sort();

if (!modules.includes("index.js")) {
  console.error("Missing worker/index.js");
  process.exit(1);
}

const metadata = {
  main_module: "index.js",
  compatibility_date: "2026-05-22",
  bindings: [
    { name: "SECRET_KEY", type: "inherit" },
    { name: "AGREE_SECRET_KEY", type: "inherit" },
    { name: "DB", type: "d1", id: d1Id },
    { name: "XIAOMI_MIRROR", type: "r2_bucket", bucket_name: bucketName },
  ],
};

const form = new FormData();
form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
for (const file of modules) {
  const code = fs.readFileSync(path.join(workerDir, file), "utf8");
  form.append(file, new Blob([code], { type: "application/javascript+module" }), file);
}

const res = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${scriptName}`,
  { method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: form },
);
console.log("deploy", res.status);
console.log((await res.text()).slice(0, 800));
if (!res.ok) process.exit(1);

const check = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${scriptName}/bindings`,
  { headers: { Authorization: `Bearer ${token}` } },
);
const bindings = (await check.json()).result || [];
console.log("bindings:", bindings.map((b) => `${b.name}:${b.type}`).join(", "));
if (!bindings.some((b) => b.name === "DB") || !bindings.some((b) => b.name === "XIAOMI_MIRROR")) {
  console.error("WARNING: DB or XIAOMI_MIRROR binding missing after deploy");
  process.exit(2);
}
console.log("OK: bindings intact");
