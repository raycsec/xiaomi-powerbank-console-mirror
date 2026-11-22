#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const token = process.env.CF_API_TOKEN;
const accountId = process.argv[2];
const bucket = process.env.R2_BUCKET || "xiaomi-mirror";
const rootPrefix = "eco--usb-device-web/static";

if (!token || !accountId) {
  console.error("usage: CF_API_TOKEN=... node deploy/upload-assets.mjs <accountId>");
  process.exit(1);
}

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const staticDir = path.join(here, "..", "eco--usb-device-web", "static");

if (!fs.existsSync(path.join(staticDir, "index.html"))) {
  console.error("Missing build output: eco--usb-device-web/static/index.html. Run `npm run build` first.");
  process.exit(1);
}

const typeOf = (name) => {
  if (name.endsWith(".html")) return "text/html; charset=utf-8";
  if (name.endsWith(".css")) return "text/css; charset=utf-8";
  if (name.endsWith(".js") || name.endsWith(".mjs")) return "application/javascript; charset=utf-8";
  if (name.endsWith(".json") || name.endsWith(".map")) return "application/json; charset=utf-8";
  if (name.endsWith(".woff2")) return "font/woff2";
  if (name.endsWith(".woff")) return "font/woff";
  if (name.endsWith(".svg")) return "image/svg+xml";
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".ico")) return "image/x-icon";
  return "application/octet-stream";
};

function walkFiles(dir, base = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full, rel));
    else if (entry.isFile()) out.push({ rel, full });
  }
  return out;
}

const files = walkFiles(staticDir);
let ok = 0;
for (const { rel, full } of files) {
  const key = `${rootPrefix}/${rel}`.split("/").map(encodeURIComponent).join("/");
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucket}/objects/${key}`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "content-type": typeOf(rel) },
      body: fs.readFileSync(full),
    },
  );
  if (res.ok) ok++;
  else console.error("FAILED", rel, res.status, (await res.text()).slice(0, 160));
}
console.log(`uploaded ${ok}/${files.length} files to R2 bucket "${bucket}"`);
process.exit(ok === files.length ? 0 : 1);
