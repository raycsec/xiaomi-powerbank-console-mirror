# 小米移动电源 WebHID 控制台（重构版本 v34 · 2026/11/23）

开源地址：<https://github.com/raycsec/xiaomi-powerbank-console-mirror>

---

## 一、核心功能与架构分组

```text
src/
├── config/
│   └── models.js              # 24 款小米机型配置（含 X005–X010 及 WPB0525S 实验性支持）
├── protocol/
│   ├── constants.js           # 协议指令/响应码、超时、异常与状态映射（零私有测试指令）
│   ├── codec.js               # CRC-8 与帧编解码（按实际帧长 4 + payload.length 发送）
│   ├── decoders.js            # 0x10/0x11/0x12(5B)/0x13(UTC+8+国标换算)/0x14/0x17/0x18(int16) 解码
│   ├── qi2Crypto.js           # 双向 AES-128-CCM（0x48 主机→设备加密、0x44 设备→主机解密）
│   ├── qi2Strategies.js       # 明文 0x06 / 加密 0xE6 策略、自动回退、150ms 指令节拍与状态回读
│   └── cellIdentity.js        # 完整 25 家生产厂商与 35 组小米电芯型号国标编码解析
├── hid/
│   ├── browserSupport.js      # 基于 navigator.hid 能力检测（支持全部桌面 Chromium 浏览器）
│   ├── WebHidTransport.js     # WebHID 设备传输层
│   ├── MockHidTransport.js    # 仅供自动化测试使用的全协议固件模拟器
│   └── HidClient.js           # 串行事务锁队列、心跳防抢占、断线清理与默认 DevTools 结构化日志
├── hooks/usePowerBank.js      # 会话管理、防冲突自动刷新（3s 轮询，写入期间自动避让）、遥测上报
├── services/qi2Telemetry.js   # v34 完整字段上报（含原始 snBytes SHA-256 脱敏与逐帧 devLogs）
├── components/                # 精简界面组件（DevicePanel / Qi2Card / ModelsPage / SupportQi2Page / ExceptionGuidePage）
└── styles/mirror.css          # 响应式卡片与浅色协议分析样式（零外部 CDN / 零外链字体）

worker/                        # Cloudflare Worker 门控（同意书/PoW/CN弹窗）、同源 R2 代理、边缘缓存与 D1 API
scripts/export-oss.mjs         # 一键导出纯净开源目录并执行零私有代码痕迹审计
tests/                         # 45 项自动化测试（官方等效一致性、固件仿真、Worker 门控、隔离与审计）

```

---

## 二、主要修改内容与更新日志（v34 · 2026/11/23）

1. **协议层完全对齐官方规范**
   - **Hello 动态序列号区**：`decodeHelloResponse` 改为 `payload.slice(2, payload.length - 1)`，兼容 23B（20B SN）与 27B（24B SN，修复 `WPB0525S` 验签失败根因）；常规 ASCII SN 按首个 `0x00` 截断并去空白，全 `0xFF` 等非 ASCII 工程机自动以 `HEX:` 展示并保留原始字节派生密钥；放宽 `health <= 0xFFFF`。
   - **修复 `0x11` 电池组 18 字节偏移**：`errorValue` 改为 2 字节 `uint16 LE`（`[7..8]`），`historyErrorCount`、`connSeriesParallel`（串并联拓扑）、电量、温度、电压、电流全部对齐。
   - **对齐 `0x12`、`0x18`、`0x13` 与发送帧长**：`0x12` 按 5B/节解析单节温度（`-127` 为无温感）、电压与电流；`0x18` 按 `int16 LE` 解析高低温阈值；`0x13` 做 `timestamp - 28800` 校正与国标异常/单位自动换算（V/A/°C）；发送帧改为官方实际帧长 `4 + payload.length`；指令间默认 150ms 节拍。
   - **双向加解密与完整数据表**：`qi2Crypto.js` 补全设备→主机响应解密（方向字节 `0x44` + 恒定时间 Tag 比对）；新增小米 X 系列 6 款机型（`X005`–`X010`，共 24 款小米机型）；补全 25 家电芯厂商与 35 组小米电芯型号。
2. **界面精简、自动防冲突刷新与开发者控制台**
   - 移除演示模式与手动刷新按钮，改为连接后 3 秒自动刷新实时电量/电芯/异常记录，写入 Qi2.2 或上一轮未完成时自动避让并通过 `HidClient.enqueue` 串行队列彻底防冲突。
   - 浏览器环境默认开启 DevTools 控制台 `[HID TX]` / `[HID RX]` 结构化日志（原始帧 + 自动解码对象，无冗余文案）。
   - `/models` 仅展示 24 款小米型号与接口；`/supportqi2` 独立展示「已支持 / 实验性支持」机型、浅色底自动折行并自动滚动到底部的「实验性开启测试」协议框及实时「当前状态」；异常记录仅在存在记录时显示「异常说明」按钮跳转至 `/exception-guide`。
   - 知情同意书与地域限制提醒完整保持原版条款，并对「不被允许 / 请勿 / 禁止 / 立即」采用橙色加大加粗高亮。
3. **国内地区访问优化与全量主站同源代理**
   - 所有 R2 静态资源统一走主站同源 `/eco--usb-device-web/static/...`（零外部 CDN/字体/`r2.dev`）；Worker 接入 `caches.default` 边缘缓存、`ETag`/`304`、60s `index.html` 内存缓存、同源 `Link` 预加载头与 D1 单实例建表缓存；Vite 独立拆分 `react-vendor` 并关闭生产 `sourcemap`。

> 完整历史变更记录见 `docs/CHANGELOG.md`。

---

| 环境 | 编译命令 | 输出目录 / R2 前缀 | Worker 环境变量 | 循环次数模块 |
|---|---|---|---|---|

---

## 四、部署指南（Cloudflare Workers + R2 + D1）

1. **安装依赖并运行全部 45 项自动化测试**
   ```bash
   npm install
   npm test
   ```
2. **构建公开主站前端产物并上传至 R2**
   ```bash
   npm run build
   CF_API_TOKEN=<你的Token> node deploy/upload-assets.mjs <accountId>
   ```
3. **配置密钥与部署主 Worker**（先在 `deploy/wrangler.toml` 中填入 `<D1_DATABASE_ID>` 与自定义域名）
   ```bash
   npx wrangler secret put SECRET_KEY -c deploy/wrangler.toml
   npx wrangler secret put AGREE_SECRET_KEY -c deploy/wrangler.toml
   # 方式 A：Wrangler 部署
   npx wrangler deploy -c deploy/wrangler.toml
   # 方式 B：Cloudflare REST API 多模块直传
   CF_API_TOKEN=<你的Token> node deploy/deploy.mjs <accountId> <d1DatabaseId>
   ```
   ```bash
   npx wrangler deploy -c deploy/wrangler-report.toml
   ```
   ```bash
   npm run build:lab
   ```
6. **导出纯净开源包**
   ```bash
   npm run export:oss
   ```
