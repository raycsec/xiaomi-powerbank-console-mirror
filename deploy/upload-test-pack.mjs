#!/usr/bin/env node
/**
 * 单独热更新 public/0525s-test-pack.js 至 R2（无需重新编译主站）
 * 用法: CF_API_TOKEN=... node deploy/upload-test-pack.mjs <accountId>
 */
import fs from "node:fs";
import path from "node:path";

const token = process.env.CF_API_TOKEN;
const accountId = process.argv[2];
const bucket = process.env.R2_BUCKET || "xiaomi-mirror";

if (!token || !accountId) {
  console.error("usage: CF_API_TOKEN=... node deploy/upload-test-pack.mjs <accountId>");
  process.exit(1);
}

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const packFile = path.join(here, "..", "public", "0525s-test-pack.js");

if (!fs.existsSync(packFile)) {
  console.error("Missing public/0525s-test-pack.js");
  process.exit(1);
}

const key = "eco--usb-device-web/static/0525s-test-pack.js".split("/").map(encodeURIComponent).join("/");
const res = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucket}/objects/${key}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/javascript; charset=utf-8",
    },
    body: fs.readFileSync(packFile),
  },
);

if (!res.ok) {
  console.error("FAILED", res.status, (await res.text()).slice(0, 200));
  process.exit(1);
}
console.log(`uploaded public/0525s-test-pack.js -> r2://${bucket}/eco--usb-device-web/static/0525s-test-pack.js`);
