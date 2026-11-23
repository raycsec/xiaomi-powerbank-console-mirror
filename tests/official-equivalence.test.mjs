import { webcrypto, createCipheriv, createHmac } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import test from "node:test";
import assert from "node:assert/strict";
import { buildCommandFrame, buildHelloFrame } from "../src/protocol/codec.js";
import { CMD } from "../src/protocol/constants.js";
import { decodeCellStatus, decodeTempModel } from "../src/protocol/decoders.js";
import { buildEncryptedQi2Payload, decryptEncryptedQi2Payload } from "../src/protocol/qi2Crypto.js";
import { ENTERPRISE_NAMES_ZH, MI_CODE_TABLE, parseBatteryIdString } from "../src/protocol/cellIdentity.js";
import { POWER_BANK_MODELS, resolveModelConfig } from "../src/config/models.js";

function opensslDeviceToHostCcm(snStr, timestamp, command, plaintext) {
  const snBytes = new TextEncoder().encode(snStr);
  const material = Buffer.alloc(12);
  const tail = snBytes.slice(Math.max(0, snBytes.length - 8));
  Buffer.from(tail).copy(material, 8 - tail.length);
  material.writeUInt32BE(timestamp >>> 0, 8);
  const key = createHmac("sha256", Buffer.from("MiXiaomiQi22Key!")).update(material).digest().subarray(0, 16);
  const nonce = Buffer.alloc(13);
  nonce[0] = 0x44; // 'D' device -> host
  nonce.writeUInt32BE(timestamp >>> 0, 1);
  nonce[9] = command & 0xff;
  const cipher = createCipheriv("aes-128-ccm", key, nonce, { authTagLength: 4 });
  const enc = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return new Uint8Array(Buffer.concat([enc, cipher.getAuthTag()]));
}

test("HID send frames match official exact length 4 + payload.length (no 32B zero padding)", () => {
  const { frame: hello } = buildHelloFrame(1760000000000);
  assert.equal(hello.length, 17);
  const battReq = buildCommandFrame(CMD.GET_BATTERY_INFO);
  assert.equal(battReq.length, 4);
  const encReq = buildCommandFrame(CMD.SET_QI2_ENCRYPTED, new Uint8Array(9));
  assert.equal(encReq.length, 13);
});

test("Device-to-host decryptEncryptedQi2Payload (0x44) matches OpenSSL AES-128-CCM & rejects tampered tag", async () => {
  const sn = "DMPB0525S202600000012345";
  const ts = 1760001234;
  const plain = new Uint8Array([0x00, 0x62, 0x00, 0x25, 0x01]);
  const ct = opensslDeviceToHostCcm(sn, ts, 0xe6, plain);

  const okRes = await decryptEncryptedQi2Payload({ ciphertext: ct, snBytes: sn, timestamp: ts, command: 0xe6 });
  assert.equal(okRes.ok, true);
  assert.deepEqual(okRes.plain, plain);

  const tampered = ct.slice();
  tampered[tampered.length - 1] ^= 0x01;
  const badRes = await decryptEncryptedQi2Payload({ ciphertext: tampered, snBytes: sn, timestamp: ts, command: 0xe6 });
  assert.equal(badRes.ok, false);
});

test("0x12 decodeCellStatus parses official 5B/cell format (tempC, -127 no sensor, voltageMV, currentMA) + trailing byte", () => {
  const p = new Uint8Array(1 + 10 + 1);
  const dv = new DataView(p.buffer);
  p[0] = 0;
  p[1] = 28;
  dv.setInt16(2, 3845, true);
  dv.setInt16(4, -620, true);
  p[6] = 129; // -127 signed int8 -> no temp sensor
  dv.setInt16(7, 3850, true);
  dv.setInt16(9, -615, true);
  p[11] = 0x00; // optional trailing byte

  const cells = decodeCellStatus(p);
  assert.equal(cells.length, 2);
  assert.deepEqual(cells[0], { index: 1, voltage: 3845, current: -620, hasTemperatureSensor: true, temperature: 28 });
  assert.deepEqual(cells[1], { index: 2, voltage: 3850, current: -615, hasTemperatureSensor: false, temperature: null });
});

test("0x18 decodeTempModel parses official int16 LE highTemp & lowTemp thresholds + cellModel", () => {
  const model = new TextEncoder().encode("SP436678SQ");
  const p = new Uint8Array(5 + model.length);
  const dv = new DataView(p.buffer);
  p[0] = 0;
  dv.setInt16(1, 65, true);
  dv.setInt16(3, -20, true);
  p.set(model, 5);

  const res = decodeTempModel(p);
  assert.equal(res.success, true);
  assert.equal(res.highTemp, 65);
  assert.equal(res.lowTemp, -20);
  assert.equal(res.batteryModel, "SP436678SQ");
});

test("Complete GB cell database (25 enterprises, 35 Mi codes) & 24 Xiaomi-only models (X005-X010)", () => {
  assert.equal(Object.keys(ENTERPRISE_NAMES_ZH).length, 25);
  assert.equal(Object.keys(MI_CODE_TABLE).length, 35);
  const parsed = parseBatteryIdString("GYZ1CDG3F-1HJQ26A0001");
  assert.equal(parsed.fixed.assemblyFactory, "珠海冠宇电池股份有限公司");
  assert.equal(parsed.miCodeInfo.cellModel, "436678N");

  assert.equal(POWER_BANK_MODELS.length, 24);
  for (const [id, code] of [[24, "X006"], [25, "X007"], [26, "X008"], [27, "X005"], [28, "X009"], [29, "X010"]]) {
    assert.equal(resolveModelConfig(id).model, code);
  }
  // Ensure no non-Xiaomi brands (neoseek / HONOR) are included
  assert.equal(POWER_BANK_MODELS.some((m) => m.id >= 40961), false);
});
