import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import test from "node:test";
import assert from "node:assert/strict";
import { HidClient } from "../src/hid/HidClient.js";
import { MockHidTransport } from "../src/hid/MockHidTransport.js";
import { APP_VERSION, UI_BADGE_VERSION, hashSerialHex, reportQi2Event } from "../src/services/qi2Telemetry.js";

test("[v32] WPB1025S (modelId=19) with all-0xFF non-printable SN falls back from 0x06 to 0xE6", async () => {
  const allFfSn = new Uint8Array(20).fill(0xff);
  const transport = new MockHidTransport({
    modelId: 19,
    snBytes: allFfSn,
    acceptLegacyQi2: false,
    acceptEncryptedQi2: true,
  });
  const client = new HidClient(transport);
  await client.open();
  const hello = await client.handshake();
  assert.equal(hello.modelId, 19);
  assert.equal(hello.snBytes.length, 20);
  assert.equal(hello.snBytes[0], 0xff);
  assert.equal(hello.isNonAsciiSerial, true);
  assert.ok(hello.serialNumber.startsWith("HEX: FFFF"));

  const res = await client.setQi2(true, hello.modelConfig.capabilities.qi2.protocols, { readbackIntervalMs: 2 });
  assert.equal(res.protocol, "encrypted");
  assert.equal(res.usedFallback, true);
  assert.equal(res.status.enabled, true);
  await client.close();
});

test("[v32] qi2Telemetry posts complete payload with APP_VERSION=v38, UI_BADGE_VERSION=v38, hashed raw snBytes and devLogs", async () => {
  assert.equal(APP_VERSION, "v38");
  assert.equal(UI_BADGE_VERSION, "v38");
  let captured = null;
  const mockFetch = async (url, init) => {
    captured = { url, body: JSON.parse(init.body) };
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };
  const sn = new Uint8Array(20).fill(0xff);
  const res = await reportQi2Event({
    model: "WPB1025S",
    snBytes: sn,
    action: true,
    ok: true,
    detail: "encrypted-fallback",
    info: { protocol: "encrypted", readbackTries: 1 },
    devLogs: [{ direction: "TX", label: "0xE6", hex: "A5E6" }],
    fetchImpl: mockFetch,
    pageUrl: "https://mirror-mieco.raycsec.com/",
  });
  assert.equal(res.sent, true);
  assert.equal(captured.url, "/api/qi2-report");
  assert.equal(captured.body.appVersion, "v38");
  assert.equal(captured.body.snHash, await hashSerialHex(sn));
  assert.equal(captured.body.devLogs.length, 1);
});
