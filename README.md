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