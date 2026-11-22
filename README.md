[English](README.md) | [简体中文](README_ZH.md)

# Xiaomi Power Bank Console Mirror (Qi2.2 Control)

An unofficial mirror of the Xiaomi Power Bank WebHID console, adding full **Qi2.2 on/off** control across both legacy and encrypted protocols.

- **Live Site (New)**: https://mirror-mieco.raycsec.com/
- **Live Site (Legacy)**: https://mirror-mieco.nalaniflynn.cn/ — **this domain expires in a few months and will not be renewed, please use the new site instead**
- **Architecture**: React 18 + Vite 6 front end, modular Cloudflare Worker, R2 static assets, D1 statistics
- **Browser Requirement**: Any desktop browser with WebHID support (Chrome, Edge, Opera, Brave, Vivaldi, Arc)

> **Disclaimer**: This repository is not an official Xiaomi project and has no affiliation with or authorization from Xiaomi Corporation. For learning and research purposes only.

## Features

- **Native Qi2.2 Switch**: Integrated directly into the original device panel with matching UI, busy locks, error prompts and automatic read-back verification.
  - **Legacy models** (e.g. `WPB1025S`): uses the original plaintext command first.
  - **Newer models** (`WPB1026S`, `WPB1025`): uses the encrypted protocol first (re-handshake, read battery health and cycle count, derive session key, encrypted write, read-back verification).
  - Every write falls back to the other protocol automatically. Success is reported only when the read-back value matches the requested state.
- **Model Support Labels**: categorized into Supported, Encrypted Protocol, Possibly Supported (Untested) and Hardware supported / enable method not adapted yet. Untested models show a "Try Enabling (Untested)" button with a yellow notice. Legacy-exclusive models (`P25`, `AC1067`, `P15`, `PB2020`) are retained for viewing, 18 models in total.
- **Activation Success Rate Statistics**: each toggle reports one record (model, SN hash, action, result, failure detail, full TX/RX trace), deduplicated by `(model, sn_hash, action)` in Cloudflare D1:
  - Samples >= 5 and error rate > 30%: yellow success-rate notice.
  - Error rate < 10%: green success rate with a checkmark.
  - Samples < 5: no badge is shown on the support page.
  - Reporting failures never block the toggle action or the UI.
- **Live Data Refresh**: battery level, health, cycles, cell voltages, temperatures and error history refresh automatically every 10 seconds while a device is connected. No manual refresh is needed.
- **Diagnostics**: full TX/RX frame logging is always on in the browser console, and every report (including failures) carries the complete enable/disable flow.
- **Privacy**: no IP, user agent, fingerprint or behavioural data is collected. Only hashed serial numbers and the toggle result are stored.

## Directory Structure

```text
src/                          # React front end
  config/models.js            # Model metadata and Qi2.2 capability flags
  protocol/                   # Frame codec, decoders, CRC-8, AES-128-CCM, strategies
  hid/                        # WebHID transport and request/response client
  hooks/usePowerBank.js       # Session lifecycle, auto refresh, Qi2.2 toggle + reporting
  components/                 # Device panel, Qi2.2 card, support pages, banner
  services/qi2Telemetry.js    # Report submission and statistics fetching
  i18n/                       # zh-CN / en locale packs
worker/                       # Cloudflare Worker entry and API
deploy/                       # deploy.mjs, upload-assets.mjs, wrangler.toml
tests/                        # node --test suites (protocol, HID, worker, telemetry)
docs/CHANGELOG.md             # Detailed changelog
docs/assets/sponsor-qr.jpg    # Sponsor QR code
```

## Deployment

1. Prepare a Cloudflare account with a **D1** database, an **R2** bucket for static assets, and a **Workers Custom Domain**.
2. Configure bindings and secrets:
   - `DB`: D1 database, auto-creates `auth_sessions`, `used_tokens`, `cn_tokens`, `qi2_reports` on first request.
   - `XIAOMI_MIRROR`: R2 bucket with asset key prefix `eco--usb-device-web/static/`.
   - `SECRET_KEY`, `AGREE_SECRET_KEY`: required secrets for signing session and consent tokens.
3. Build and upload the front end, then deploy the Worker:
   ```bash
   npm install
   npm run build
   CF_API_TOKEN=... node deploy/upload-assets.mjs <accountId>
   CF_API_TOKEN=... node deploy/deploy.mjs <accountId> <d1DatabaseId>
   ```
4. Bind your Custom Domain in the Worker Custom Domains settings; Cloudflare issues the SSL certificate automatically.

## Statistics Table Schema

```sql
CREATE TABLE qi2_reports (
  model       TEXT,
  sn_hash     TEXT,   -- first 16 bytes (hex) of SHA-256(SN); plaintext SN is never stored
  action      TEXT,   -- on / off
  ok          INTEGER,
  detail      TEXT,   -- protocol name on success, or failure reason
  info        TEXT,   -- structured device, write and read-back info
  dev_logs    TEXT,   -- full TX/RX trace of the flow
  app_version TEXT,
  reported_at TEXT,
  created_at  INTEGER,
  updated_at  INTEGER,
  PRIMARY KEY (model, sn_hash, action)
);
```

Because `sn_hash` is part of the primary key, repeated operations on the same device update the existing record instead of inflating counts.

## API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/qi2-stats?model=WPB1026S` | Returns sample count, success count and error rate for the model |
| `POST` | `/api/qi2-report` | Submits a toggle result, requires a valid session |

## Sponsor

If this project has been helpful to you, feel free to buy me a coffee.

![Sponsor QR](docs/assets/sponsor-qr.jpg)

## Credits

- **Xiaomi Official Frontend** (`powerbank.mieco.net`): original source for page layout, device HID protocol, UI style and base model data. All trademarks and copyrights belong to Xiaomi Corporation.
- **[yunhaocloud-collab/xiaomi-powerbank-console-WPB1026S](https://github.com/yunhaocloud-collab/xiaomi-powerbank-console-WPB1026S)**: public implementation of the `WPB1026S` encrypted setup protocol (handshake, session key derivation, encrypted payload, read-back verification). The encrypted write path here adapts that logic to the original panel style.

All remaining code (mirror Worker, panel integration and statistics) was implemented specifically for this repository without using other third-party open-source code.

Thanks to the authors above for sharing the protocol and implementation. If you are a rights holder and believe this repository contains content that should not be public, please open an issue and it will be handled promptly.

## License

[MIT License](LICENSE). Original project copyright notices are preserved above and in `LICENSE`.
