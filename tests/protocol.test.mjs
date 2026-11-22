import test from "node:test";
import assert from "node:assert/strict";
import { calculateCrc8 } from "../src/protocol/crc8.js";
import { buildCommandFrame, buildHelloFrame, extractFrames, parseFrame } from "../src/protocol/frames.js";
import { decodeBatteryInfo, decodeHelloResponse, decodeHistoryBatch } from "../src/protocol/decoders.js";
import { parseBatteryIdString } from "../src/protocol/batteryId.js";
import { CMD } from "../src/protocol/constants.js";

test("Hello frame layout and CRC-8", () => {
  const { frame, timestamp } = buildHelloFrame(1700000000000);
  assert.equal(frame.length, 32);
  assert.equal(frame[0], 0xa5);
  assert.equal(frame[1], CMD.HELLO);
  assert.equal(frame[2], 13);
  assert.equal(timestamp, 1700000000 + 28800);
  const parsed = parseFrame(frame);
  assert.equal(parsed.crcValid, true);
});

test("extractFrames handles concatenated and partial packets", () => {
  const f1 = buildCommandFrame(CMD.GET_QI2_STATUS).subarray(0, 4);
  const f2 = buildCommandFrame(CMD.SET_QI2_LEGACY, new Uint8Array([1])).subarray(0, 5);
  const partial = new Uint8Array([0xa5, 0x17, 0x02, 0x00]); // missing 2 bytes
  const combined = new Uint8Array(f1.length + f2.length + partial.length);
  combined.set(f1, 0);
  combined.set(f2, f1.length);
  combined.set(partial, f1.length + f2.length);

  const { frames, remaining } = extractFrames(combined);
  assert.equal(frames.length, 2);
  assert.equal(frames[0].crcValid, true);
  assert.equal(frames[1].crcValid, true);
  assert.deepEqual(remaining, partial);
});

test("decodeHelloResponse handles 27-byte WPB0525S payload with trailing charge state", () => {
  const payload = new Uint8Array(27);
  payload[0] = 10; // WPB0525S
  payload.set(new TextEncoder().encode("SN0525S12345"), 2);
  payload[26] = 1; // charging at final byte
  const decoded = decodeHelloResponse(payload);
  assert.equal(decoded.modelId, 10);
  assert.equal(decoded.modelConfig.model, "WPB0525S");
  assert.equal(decoded.chargeState, 1);
});

test("decodeBatteryInfo separates high 2-bit chargeState and low 6-bit faultType + signed current", () => {
  const p = new Uint8Array(18);
  p[0] = 0;
  p[2] = 37; // cycles
  p[4] = 97; // health
  p[6] = (1 << 6) | 0; // charging + no fault
  p[10] = 2;
  p[11] = 86;
  p[12] = 251; // -5C signed int8
  p[13] = 0x14; p[14] = 0x1e; // 7700mV
  p[15] = 0x24; p[16] = 0xfa;

  const info = decodeBatteryInfo(p);
  assert.equal(info.chargeState, 1);
  assert.equal(info.faultType, 0);
  assert.equal(info.temperature, -5);
  assert.equal(info.current, -1500);
});

test("decodeHistoryBatch filters by model historyMinTimestamp", () => {
  const p = new Uint8Array(2 + 16);
  p[1] = 2;
  const dv = new DataView(p.buffer);
  dv.setUint32(2, 1770000000, true);
  dv.setUint32(10, 1775000000, true);
  const filtered = decodeHistoryBatch(p, 1772323200);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].timestamp, 1775000000);
});

test("parseBatteryIdString resolves ATL / Lishen / Liwinon manufacturer & cell model", () => {
  const parsed = parseBatteryIdString("ATLNHJQ3F-1HJQ0001");
  assert.equal(parsed.fixed.enterpriseCode, "ATLN");
  assert.equal(parsed.fixed.assemblyFactory, "宁德新能源科技有限公司");
  assert.equal(parsed.miCodeInfo.cellModel, "436678N");
  assert.equal(calculateCrc8(new Uint8Array([0xa5, 0x07, 0x00])), 0xe3);
});
