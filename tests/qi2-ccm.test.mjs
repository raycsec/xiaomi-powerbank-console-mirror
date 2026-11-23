import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;
import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { buildEncryptedQi2Payload } from "../src/protocol/qi2Crypto.js";

function referenceOpenSslCcm(snBytes, timestamp, health, cycles, enabled) {
  const material = Buffer.alloc(12);
  const tail = Buffer.from(snBytes).subarray(Math.max(0, snBytes.length - 8));
  tail.copy(material, 8 - tail.length);
  material.writeUInt32BE(timestamp >>> 0, 8);

  const sessionKey = crypto.createHmac("sha256", Buffer.from("MiXiaomiQi22Key!", "utf8")).update(material).digest().subarray(0, 16);
  const nonce = Buffer.alloc(13);
  nonce[0] = 0x48;
  nonce.writeUInt32BE(timestamp >>> 0, 1);
  nonce[9] = 0xe6;

  const plain = Buffer.alloc(5);
  plain.writeUInt16BE(health, 0);
  plain.writeUInt16BE(cycles, 2);
  plain[4] = enabled ? 1 : 0;

  const cipher = crypto.createCipheriv("aes-128-ccm", sessionKey, nonce, { authTagLength: 4 });
  const ct = Buffer.concat([cipher.update(plain), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([ct, tag]);
}

const VECTORS = [
  { name: "standard WPB1026S enable", sn: Buffer.from("DMPB1026S0001"), ts: 1775000000, health: 97, cycles: 37, enabled: true },
  { name: "standard WPB1026S disable", sn: Buffer.from("DMPB1026S0001"), ts: 1775000000, health: 97, cycles: 37, enabled: false },
  { name: "short serial left-zero padded", sn: Buffer.from("AB12"), ts: 0x11223344, health: 100, cycles: 0, enabled: true },
  { name: "non-printable raw snBytes", sn: new Uint8Array([0x01, 0x02, 0xff, 0x00, 0x41, 0x42, 0xfe, 0x10]), ts: 0xffffffff, health: 80, cycles: 65535, enabled: true },
  { name: "zero timestamp boundary", sn: Buffer.from("1234567890ABCDEF"), ts: 0, health: 0, cycles: 1, enabled: false },
];

for (const vec of VECTORS) {
  test(`AES-128-CCM matches Node/OpenSSL natively: ${vec.name}`, async () => {
    const actual = await buildEncryptedQi2Payload({
      snBytes: vec.sn,
      timestamp: vec.ts,
      health: vec.health,
      cycles: vec.cycles,
      enabled: vec.enabled,
    });
    const expected = referenceOpenSslCcm(vec.sn, vec.ts, vec.health, vec.cycles, vec.enabled);
    assert.deepEqual(Buffer.from(actual), expected);
  });
}

test("AES-128-CCM matches official wg for 24B WPB0525S SN, null-padded short SN, and health > 100", async () => {
  const sn24 = new TextEncoder().encode("DMPB0525S202600000012345");
  const out24 = await buildEncryptedQi2Payload({ snBytes: sn24, timestamp: 1760000000, health: 98, cycles: 12, enabled: true });
  const outTail = await buildEncryptedQi2Payload({ snBytes: "00012345", timestamp: 1760000000, health: 98, cycles: 12, enabled: true });
  assert.deepEqual(out24, outTail);

  const snNullPadded = new Uint8Array(24);
  snNullPadded.set(new TextEncoder().encode("DMPB0525S001  "), 0);
  const outNull = await buildEncryptedQi2Payload({ snBytes: snNullPadded, timestamp: 1760000000, health: 105, cycles: 12, enabled: true });
  const outClean = await buildEncryptedQi2Payload({ snBytes: "DMPB0525S001", timestamp: 1760000000, health: 105, cycles: 12, enabled: true });
  assert.deepEqual(outNull, outClean);
});
