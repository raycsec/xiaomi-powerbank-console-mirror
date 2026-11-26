# 小米移动电源控制台 · 镜像版（Qi2.2 开关）· v39

[English](README.md) | [简体中文](README_ZH.md)

基于小米官方移动电源详情页的非官方镜像，补全 Qi2.2 的开启 / 关闭能力，兼容明文与加密协议，
并为 WPB0525S 提供独立的实验算法测试页。

- 在线站点（新）：https://mirror-mieco.raycsec.com/
- 在线站点（旧）：https://mirror-mieco.nalaniflynn.cn/ —— 该域名将在几个月后到期且不再续费，请改用新站点
- 项目架构：React 18 + Vite 6 前端，模块化 Cloudflare Worker，R2 静态资源，D1 统计
- 运行要求：支持 WebHID 的桌面端 Chromium 浏览器（Chrome、Edge、Opera、Brave、Vivaldi、Arc）

> 免责声明：本仓库不是小米官方项目，与小米公司无任何隶属或授权关系，仅供学习与研究。

## 功能特性

- 原生 Qi2.2 开关：沿用原面板布局、忙碌锁与错误提示。
  - 旧型号（如 WPB1025S）优先使用明文指令。
  - 加密型号由 Hello 时间戳与设备序列号派生会话密钥，使用 AES-128-CCM 写入，并回读校验。
- 分机型协议降级链：每个支持 Qi2.2 的机型都有独立的 encrypted / encrypted-compat / legacy
  顺序，而不是共用一条链。
- 回读确认：只有写入被接受、且随后 0x07 状态查询返回目标状态，才判定为成功。
- 实验性机型标注：未经实机验证的型号显示「未经测试尝试开启」按钮与黄色提示，注明仍在测试中。
- WPB0525S 测试页（/0525s-test）：单页实验站，算法组由可热改的 pack 文件驱动，
  支持逐组日志、短路执行、强制写入与 JSON 导出。
- 实时数据：连接后自动刷新电量、健康度、循环次数、电芯电压、温度与异常记录。
- 开启成功率统计：每次开关上报一条记录（型号、序列号摘要、动作、结果、失败明细、协议日志），
  在 D1 中按「型号 + 序列号摘要 + 动作」去重。
  - 样本 ≥ 5 且错误率 > 30%：显示黄色警告与实测成功率。
  - 错误率 < 10%：显示绿色勾选与实测成功率。
  - 样本 < 5：暂不显示徽章。
  - 上报失败不影响开关本身。
- 默认控制台日志：原始 TX/RX 帧、解码结果与重试历史默认输出到 DevTools。

## 目录结构

```text
src/
  config/models.ts            # 24 款小米机型与 Qi2.2 能力标记
  protocol/constants.ts       # 指令/响应码、超时、异常映射
  protocol/codec.ts           # CRC-8 帧编解码，紧凑帧与 32 字节补零帧
  protocol/decoders.ts        # 0x10/0x11/0x12/0x13/0x14/0x17/0x18 解码
  protocol/aesCcm.ts          # RFC 3610 AES-128-CCM（node:crypto 或 WebCrypto）
  protocol/qi2Crypto.ts       # 密钥派生与 Qi2.2 载荷加解密
  protocol/qi2Strategies.ts   # encrypted / encrypted-compat / legacy 策略
  hid/                        # WebHID 传输、模拟传输、串行事务队列
  hooks/usePowerBank.ts       # 会话生命周期、自动刷新、开关编排
  services/qi2Telemetry.ts    # 序列号摘要上报载荷与版本常量
  services/wpb0525sPack.ts    # 测试 pack 加载、协议一致性判断、执行器
  components/                 # 设备面板、Qi2 卡片、机型列表、支持页、0525S 测试页
  styles/mirror.css           # 浅色卡片样式，无外部 CDN 与字体
worker/                       # 同意书门控、同源 R2 代理、D1 接口、测试站路由
public/0525s-test-pack.js      # 可热改的测试 pack（不带 Hash 分发）
deploy/                       # R2 上传、Worker 部署、测试 pack 热更新
tests/                        # 协议、固件模拟、Worker 与测试站测试
```

## 版本记录

### v39

- 主站与 WPB0525S 算法测试站合并为同一份 Worker 与同一份前端工程，测试页位于 /0525s-test。
- 测试算法、版本号、协议标记、日志/汇总/遥测格式化函数抽离到 public/0525s-test-pack.js，
  以 no-cache 且不带 Hash 的方式分发。
- 主站比对自身协议标记与 pack 中的标记：不一致时显示说明与「前往 0525S 测试站」按钮，
  一致时不显示任何额外提示。
- 主站连接 WPB0525S 时执行与测试页一致的 10 组算法。
- 应用版本与界面徽章统一为 v39，开发构建为 v39-dev。
- 优先发送带时间戳的完整 Hello，空载 32 字节 Hello 仅作为兜底，确保设备端会话时间戳
  与派生密钥使用的时间戳一致。
- 恢复此前压缩包丢失的文案：未测机型提示、测试中提示与同意书快照说明。

### v38

- 统一应用版本与界面徽章，并将带时间戳的 Hello 改为首选握手。

### v37

- 新增 encrypted-compat 策略（32 字节补零帧 + 20 字节 SN 切片 + cycles=0），
  修复 WPB0525S 开启失败，并按机型配置协议链。
- 每次加密重试前重新握手，避免复用被固件作废的时间戳。

### v35.1 / v35 / v34

- 全量 TypeScript 迁移、AES-CCM 模块拆分、WPB0525S 官方帧比对，以及更早的协议对齐工作。
  更早的记录保留在 docs/CHANGELOG.md。

## 部署

1. 准备 Cloudflare 账号、一个 D1 数据库、一个 R2 存储桶与一个 Worker 自定义域名。
2. 配置绑定：
   - DB：D1 数据库（首次请求自动建表）。
   - XIAOMI_MIRROR：R2 存储桶，资源前缀 eco--usb-device-web/static/。
   - SECRET_KEY、AGREE_SECRET_KEY：会话与同意令牌签名密钥。
3. 构建与上传：

```bash
npm install
npm run typecheck
npm test
npm run build
CF_API_TOKEN=<token> node deploy/upload-assets.mjs <accountId>
CF_API_TOKEN=<token> node deploy/deploy.mjs <accountId> <d1DatabaseId>
```

4. 只修改测试 pack 时无需重新构建：

```bash
CF_API_TOKEN=<token> node deploy/upload-test-pack.mjs <accountId>
```

> 切勿提交 API Token、报表访问口令或真实设备序列号。

## 接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | /api/qi2-stats?model=WPB1026S | 返回该型号样本数、成功数与错误率 |
| POST | /api/qi2-report | 上报一次开关结果（需通过会话校验） |
| GET | /api/0525s-test/meta | 返回测试 pack 元信息与协议标记 |
| POST | /api/0525s-test/report | 上报一次测试页运行（需通过会话校验） |

## 统计表结构

```sql
CREATE TABLE qi2_reports (
  model TEXT,
  sn_hash TEXT,   -- 序列号 SHA-256 前 16 字节 (hex)，不保存明文
  action TEXT,    -- on / off
  ok INTEGER,
  detail TEXT,
  created_at INTEGER,
  updated_at INTEGER,
  PRIMARY KEY (model, sn_hash, action)
);
```

## 原项目与鸣谢

- 小米官方前端（powerbank.mieco.net）—— 页面结构、设备 HID 协议、UI 风格与基础型号数据的
  原始来源。所有商标与版权归小米公司所有。
- yunhaocloud-collab/xiaomi-powerbank-console-WPB1026S —— WPB1026S 加密设置协议的公开实现，
  本仓库的加密写入路径参照其逻辑改写为原面板代码风格。

本仓库的其余代码（镜像 Worker、面板改写、测试页与统计）为本项目整理实现，未使用上述项目之外的
其他开源代码。若你是权利人并认为本仓库包含不应公开的内容，请通过 Issue 联系，我们会及时处理。

## 开源许可

基于 [MIT License](LICENSE) 开源，原项目版权声明已在上文与 LICENSE 中保留。
