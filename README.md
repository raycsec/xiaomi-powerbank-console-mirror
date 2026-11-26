# Xiaomi Power Bank Console Mirror (Qi2.2 Control) - v39

[English](README.md) | [简体中文](README_ZH.md)

An unofficial mirror of the Xiaomi Power Bank WebHID console. It adds Qi2.2 on/off control across
plaintext and encrypted protocols, plus a dedicated experimental test page for WPB0525S.

- Live Site (New): https://mirror-mieco.raycsec.com/
- Live Site (Legacy): https://mirror-mieco.nalaniflynn.cn/ - this domain expires in a few months and
  will not be renewed, please use the new site instead
- Architecture: React 18 + Vite 6 frontend, modular Cloudflare Worker, R2 static assets, D1 stats
- Browser Requirement: desktop Chromium browsers with WebHID (Chrome, Edge, Opera, Brave, Vivaldi, Arc)

> Disclaimer: This repository is not an official Xiaomi project and has no affiliation with or
> authorization from Xiaomi Corporation. For learning and research purposes only.

## Features

- Native Qi2.2 switch: keeps the original panel layout, busy locks and error prompts.
  - Legacy models (for example WPB1025S) use the plaintext command first.
  - Encrypted models derive a session key from the Hello timestamp and the device serial, then
    write with AES-128-CCM and verify the result by reading the state back.
- Per-model protocol fallback chains: every Qi2.2-capable model has its own ordered chain
  (encrypted / encrypted-compat / legacy) instead of one shared order.
- Read-back confirmation: a toggle is reported successful only when the write is accepted and the
  following 0x07 status query returns the requested state.
- Experimental model labelling: models without hardware verification show "Try Enabling (Untested)"
  plus a yellow notice that the feature is still under test.
- WPB0525S test page (/0525s-test): a single-page lab that runs algorithm groups loaded from a
  hot-editable pack file, with per-group logs, short-circuit runs, force-write runs and JSON export.
- Live data: battery level, health, cycles, cell voltages, temperatures and fault history refresh
  automatically while a device is connected.
- Success-rate statistics: each toggle posts one record (model, serial hash, action, result, failure
  detail, protocol logs), deduplicated by model + serial hash + action in D1.
  - Samples >= 5 and error rate > 30%: yellow warning with the measured rate.
  - Error rate < 10%: green check with the measured rate.
  - Samples < 5: no badge is shown yet.
  - A failed report never blocks the toggle itself.
- Developer console logging: raw TX/RX frames, decoded payloads and retry history are printed to
  the DevTools console by default.

## Directory Structure

```text
src/
  config/models.ts            # 24 Xiaomi models with per-model Qi2.2 capability flags
  protocol/constants.ts       # command and response codes, timeouts, fault maps
  protocol/codec.ts           # CRC-8 frame codec, compact and 32-byte padded frames
  protocol/decoders.ts        # 0x10/0x11/0x12/0x13/0x14/0x17/0x18 decoders
  protocol/aesCcm.ts          # RFC 3610 AES-128-CCM (node:crypto or WebCrypto backend)
  protocol/qi2Crypto.ts       # key derivation and Qi2.2 payload seal/open
  protocol/qi2Strategies.ts   # encrypted / encrypted-compat / legacy strategies
  hid/                        # WebHID transport, mock transport, serialized client queue
  hooks/usePowerBank.ts       # session lifecycle, auto refresh, toggle orchestration
  services/qi2Telemetry.ts    # hashed-serial report payload and version constants
  services/wpb0525sPack.ts    # test pack loading, protocol match check, runner
  components/                 # device panel, Qi2 card, model list, support page, test page
  styles/mirror.css           # light card layout, no external CDN or fonts
worker/                       # consent gate, same-origin R2 proxy, D1 API, test routes
public/0525s-test-pack.js      # hot-editable test pack served without hashing
deploy/                       # R2 upload, Worker deploy, test-pack hot upload
tests/                        # protocol, firmware emulator, Worker and test-site suites
```

## Version History

### v39

- Merged the main site and the WPB0525S algorithm test page into one Worker and one frontend
  project; the test page lives at /0525s-test.
- Test algorithms, version strings, protocol markers and log/summary/telemetry formatters moved
  into public/0525s-test-pack.js, which is served unhashed with no-cache.
- The main site compares its protocol marker with the one in the pack: a mismatch shows a notice
  and a "go to the 0525S test page" button, a match shows nothing extra.
- WPB0525S on the main site now runs the same ten algorithm groups as the test page.
- App version and UI badge are both v39; dev builds show v39-dev.
- Only the timestamped Hello is sent first; the empty 32-byte Hello is a fallback only, so the
  device session timestamp always matches the derived key.
- Restored the untested-model wording, the ongoing-testing notice and the consent snapshot line
  that earlier packages had dropped.

### v38

- Unified the app version and the UI badge, and made the timestamped Hello the primary handshake.

### v37

- Added the encrypted-compat strategy (32-byte padded frames, 20-byte serial slice, cycles=0) to
  fix WPB0525S enable failures, with per-model protocol chains.
- Re-sends Hello before every encrypted retry so a rejected timestamp is never reused.

### v35.1 / v35 / v34

- Full TypeScript migration, AES-CCM module split, official-frame verification for WPB0525S and
  the earlier protocol alignment work. Older notes are kept in docs/CHANGELOG.md.

## Deployment

1. Prepare a Cloudflare account with a D1 database, an R2 bucket and a Worker custom domain.
2. Configure bindings:
   - DB: D1 database (tables are created on first request).
   - XIAOMI_MIRROR: R2 bucket with prefix eco--usb-device-web/static/.
   - SECRET_KEY and AGREE_SECRET_KEY: session and consent token secrets.
3. Build and upload:

```bash
npm install
npm run typecheck
npm test
npm run build
CF_API_TOKEN=<token> node deploy/upload-assets.mjs <accountId>
CF_API_TOKEN=<token> node deploy/deploy.mjs <accountId> <d1DatabaseId>
```

4. Editing the test pack alone does not require a rebuild:

```bash
CF_API_TOKEN=<token> node deploy/upload-test-pack.mjs <accountId>
```

> Never commit the API token, the report access key or real device serial numbers.

## API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | /api/qi2-stats?model=WPB1026S | Sample count, success count and error rate for a model |
| POST | /api/qi2-report | Submit one toggle result (requires a valid session) |
| GET | /api/0525s-test/meta | Test pack metadata and protocol marker |
| POST | /api/0525s-test/report | Submit one test-page run (requires a valid session) |

## Statistics Table

```sql
CREATE TABLE qi2_reports (
  model TEXT,
  sn_hash TEXT,   -- first 16 bytes (hex) of SHA-256(serial); plaintext serial is never stored
  action TEXT,    -- on / off
  ok INTEGER,
  detail TEXT,
  created_at INTEGER,
  updated_at INTEGER,
  PRIMARY KEY (model, sn_hash, action)
);
```

## Credits

- Xiaomi official frontend (powerbank.mieco.net): original page layout, device HID protocol, UI
  style and base model data. All trademarks and copyrights belong to Xiaomi.
- yunhaocloud-collab/xiaomi-powerbank-console-WPB1026S: public implementation of the WPB1026S
  encrypted setup protocol. The encrypted write path here adapts that logic to the panel style.

All remaining code (mirror Worker, panel integration, test page and statistics) was written for
this repository without other third-party open-source code. If you are a rights holder and believe
this repository contains content that should not be public, please open an issue.

## License

[MIT License](LICENSE). Original project copyright notices are preserved above and in LICENSE.
