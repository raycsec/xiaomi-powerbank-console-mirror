import fs from "node:fs";
const en = fs.readFileSync("README.md", "utf8");
const zh = fs.readFileSync("README_ZH.md", "utf8");
const start = (t) => t.indexOf("```text");
const end = (t, s) => t.indexOf("```", s + 7);
const enList = `\`\`\`text
src/worker.js                  # Worker entry point (matches production deployment)
src/index.js                   # Main React application bundle (readable)
src/index-dev.js               # Dev-mode bundle (no device gates)
src/XiaomiPowerBankPanel.js    # Device panel: WebHID I/O, Qi2.2 control, stats UI
src/ModelData.js               # Model metadata table (with Qi2.2 capability flags)
src/ModelSupportPanel.js       # Supported models list component
src/string-*.js                # i18n chunks
src/index.css                  # Stylesheet
src/react-vendor.js            # React runtime
scripts/authored-worker.js     # Hand-maintained Worker source (build input)
scripts/build_worker.mjs       # Build script (outputs src/worker.js)
assets/sponsor-qr.jpg          # Sponsor QR image
docs/CHANGELOG.md              # Detailed changelog of added features
\`\`\``;
const zhList = `\`\`\`text
src/worker.js                  # Worker 入口（与线上部署文件一致）
src/index.js                   # 应用主包（React，可读版）
src/index-dev.js               # 测试模式主包（不含设备门槛）
src/XiaomiPowerBankPanel.js    # 设备面板：WebHID 读写、Qi2.2 控制与统计展示
src/ModelData.js               # 型号数据表（含 Qi2.2 能力标记）
src/ModelSupportPanel.js       # 支持型号列表页面组件
src/string-*.js                # 多语言文本分片
src/index.css                  # 页面样式
src/react-vendor.js            # React 运行时
scripts/authored-worker.js     # 手工维护的 Worker 主体（构建输入）
scripts/build_worker.mjs       # 构建脚本（产出 src/worker.js）
assets/sponsor-qr.jpg          # 赞赏码图片
docs/CHANGELOG.md              # 本仓库补齐的功能与变更说明
\`\`\``;
const e1 = start(en), e2 = end(en, e1);
const en2 = en.slice(0, e1) + enList + en.slice(e2 + 3);
const z1 = start(zh), z2 = end(zh, z1);
const zh2 = zh.slice(0, z1) + zhList + zh.slice(z2 + 3);
fs.writeFileSync("README.md", en2, "utf8");
fs.writeFileSync("README_ZH.md", zh2, "utf8");
console.log("EN refs index-dev:", en2.includes("src/index-dev.js"), "| string chunks:", en2.includes("src/string-*.js"));
console.log("ZH refs index-dev:", zh2.includes("src/index-dev.js"), "| qr:", zh2.includes("assets/sponsor-qr.jpg"));