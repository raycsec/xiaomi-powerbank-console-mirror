[English](README.md) | [简体中文](README_ZH.md)

# 小米移动电源控制台 · 镜像版（Qi2.2 开关）

基于小米官方移动电源详情页的可用镜像，补全了 Qi2.2 的**开启 / 关闭**能力，兼容旧版明文与新版加密协议。

- **在线站点（新）**：https://mirror-mieco.raycsec.com/
- **在线站点（旧）**：https://mirror-mieco.nalaniflynn.cn/ —— **该域名将在几个月后到期且不再续费，请改用上面的新站点**
- **项目架构**：React 18 + Vite 6 前端，模块化 Cloudflare Worker，R2 静态资源，D1 统计
- **运行要求**：支持 WebHID 的桌面浏览器（Chrome、Edge、Opera、Brave、Vivaldi、Arc）

> **免责声明**：本仓库不是小米官方项目，与小米公司无任何隶属或授权关系，仅供学习与研究。

## 功能特性

- **原生 Qi2.2 开关**：直接接入原面板代码，UI、忙碌锁、错误提示与写入后自动回读校验均保留原样式。
  - **旧型号**（如 `WPB1025S`）：优先沿用原有明文设置指令。
  - **新型号**（`WPB1026S`、`WPB1025`、`WPB0525S`）：优先使用加密设置协议（重新握手、读取电池健康度与循环次数、派生会话密钥、加密写入、回读校验）。
  - 每次写入都会自动降级到另一条协议，仅在回读结果与目标一致时才提示成功。
- **型号分级标注**：共 24 款小米机型（含 X005–X010 系列），分为「支持」「加密协议」「可能支持（未经测试）」「硬件支持 · 开启方式暂不适配」四档。未实机验证的型号按钮显示「未经测试尝试开启」，卡片内附黄色提示；旧版独有型号（`P25`、`AC1067`、`P15`、`PB2020`）仍保留供查看。
- **开启成功率统计**：每次开关上报一次结果（型号、序列号摘要、动作、成功与否、失败明细、完整收发记录），按「型号 + 序列号摘要 + 动作」去重后写入 Cloudflare D1：
  - 样本 ≥ 5 且错误率 > 30%：显示黄色成功率提示。
  - 错误率 < 10%：显示绿色成功率并带勾选标记。
  - 样本 < 5：支持页不显示任何统计徽标。
  - 上报失败不影响开关本身，界面与设备操作互不阻塞。
- **数据自动刷新**：连接设备后电量、健康度、循环次数、分电芯电压、温度与异常记录自动刷新，无需手动点击。
- **诊断能力**：浏览器控制台默认输出完整 TX/RX 原始帧，每次上报（含失败）都携带完整的开启 / 关闭流程。
- **隐私说明**：不采集 IP、User-Agent、指纹或行为信息，仅保存序列号摘要与开关结果。

## 目录结构

```text
src/                          # React 前端
  config/models.js            # 24 款小米机型与 Qi2.2 能力标记
  protocol/codec.js           # CRC-8 与帧编解码（按 4 + payload.length 发送）
  protocol/decoders.js        # 0x10 / 0x11 / 0x12 / 0x13 / 0x14 / 0x17 / 0x18 解码
  protocol/qi2Crypto.js       # 双向 AES-128-CCM
  protocol/qi2Strategies.js   # 明文 0x06 / 加密 0xE6 策略与自动回退
  protocol/cellIdentity.js    # 电芯厂商与型号编码表
  hid/                        # WebHID 传输层与请求/响应客户端
  hooks/usePowerBank.js       # 会话管理、自动刷新、Qi2.2 开关与上报
  components/                 # 设备面板、Qi2.2 卡片、支持页、顶部说明栏
  services/qi2Telemetry.js    # 上报提交与统计读取
  i18n/                       # 中英文语言包
worker/                       # Cloudflare Worker 入口与 API
deploy/                       # deploy.mjs、upload-assets.mjs、wrangler 配置
tests/                        # node --test 测试（协议、HID、Worker、遥测）
docs/CHANGELOG.md             # 详细变更日志
docs/assets/sponsor-qr.jpg    # 赞赏码
```

## 部署指南

1. 准备 Cloudflare 账号、一个 **D1** 数据库、一个 **R2** 存储桶（存放静态资源）以及一个 **Workers 自定义域名**。
2. 配置绑定与密钥：
   - `DB`：D1 数据库，首次请求自动建表 `auth_sessions`、`used_tokens`、`cn_tokens`、`qi2_reports`。
   - `XIAOMI_MIRROR`：R2 存储桶，资源 key 前缀为 `eco--usb-device-web/static/`。
   - `SECRET_KEY`、`AGREE_SECRET_KEY`：**必须配置的密钥**，用于会话与同意令牌签名。
3. 构建并上传前端，然后部署 Worker：
   ```bash
   npm install
   npm run build
   CF_API_TOKEN=... node deploy/upload-assets.mjs <accountId>
   CF_API_TOKEN=... node deploy/deploy.mjs <accountId> <d1DatabaseId>
   ```
4. 在 Worker 的 **Custom Domains** 中绑定自定义域名，SSL 证书由 Cloudflare 自动签发。

## 统计表结构

```sql
CREATE TABLE qi2_reports (
  model       TEXT,
  sn_hash     TEXT,   -- 序列号 SHA-256 前 16 字节（hex），不保存明文
  action      TEXT,   -- on / off
  ok          INTEGER,
  detail      TEXT,   -- 成功时的协议名或失败原因
  info        TEXT,   -- 设备、写入与回读的结构化信息
  dev_logs    TEXT,   -- 完整收发记录
  app_version TEXT,
  reported_at TEXT,
  created_at  INTEGER,
  updated_at  INTEGER,
  PRIMARY KEY (model, sn_hash, action)
);
```

由于序列号摘要位于主键中，同一设备重复操作只会更新对应记录，不会重复计数。

## 统计接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/api/qi2-stats?model=WPB1026S` | 返回该型号样本数、成功数与错误率 |
| `POST` | `/api/qi2-report` | 上报一次开关结果（需已通过会话校验） |

## 赞赏支持

如果这个项目对你有帮助，欢迎请作者喝杯咖啡。

![赞赏码](docs/assets/sponsor-qr.jpg)

## 原项目与鸣谢

- **小米官方前端**（`powerbank.mieco.net`）：页面结构、设备 HID 协议、UI 风格与基础型号数据的原始来源。所有商标与版权归小米公司所有。
- **加密设置协议参考**：因一些保护性原因无法引用。本仓库的加密写入路径参照 `WPB1026S` 加密设置协议逻辑（握手、会话密钥派生、加密载荷、回读校验）改写为原面板代码风格。

本仓库的其余代码（镜像 Worker、面板改写与统计功能）为本项目整理实现，未使用上述项目之外的其他开源代码。

感谢以上作者公开协议与实现。若你是权利人并认为本仓库包含不应公开的内容，请通过 Issue 联系，我们会及时处理。

## 开源许可

基于 [MIT License](LICENSE) 开源，原项目版权声明已在上文与 `LICENSE` 中保留。
