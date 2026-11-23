import test from "node:test";
import assert from "node:assert/strict";
import { calculateCrc8 } from "../src/protocol/codec.js";
import { buildCommandFrame, buildHelloFrame, extractFrames, parseFrame } from "../src/protocol/codec.js";
import { decodeBatteryInfo, decodeHelloResponse, decodeHistoryBatch } from "../src/protocol/decoders.js";
import { parseBatteryIdString } from "../src/protocol/cellIdentity.js";
import { CMD } from "../src/protocol/constants.js";

test("Hello frame layout and CRC-8", () => {
  const { frame, timestamp } = buildHelloFrame(1700000000000);
  assert.equal(frame.length, 17);
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

test("decodeHelloResponse handles 27-byte WPB0525S payload (24B SN & null-padded SN)", () => {
  const payload24 = new Uint8Array(27);
  payload24[0] = 10;
  payload24.set(new TextEncoder().encode("DMPB0525S202600000012345"), 2);
  payload24[26] = 1;
  const decoded24 = decodeHelloResponse(payload24);
  assert.equal(decoded24.modelId, 10);
  assert.equal(decoded24.modelConfig.model, "WPB0525S");
  assert.equal(decoded24.snBytes.length, 24);
  assert.equal(decoded24.serialNumber, "DMPB0525S202600000012345");
  assert.equal(decoded24.chargeState, 1);

  const payloadShort = new Uint8Array(27);
  payloadShort[0] = 10;
  payloadShort.set(new TextEncoder().encode("SN0525S12345"), 2);
  payloadShort[26] = 2;
  const decodedShort = decodeHelloResponse(payloadShort);
  assert.equal(decodedShort.snBytes.length, 24);
  assert.equal(decodedShort.serialNumber, "SN0525S12345");
  assert.equal(decodedShort.chargeState, 2);
});

test("decodeBatteryInfo matches official 18-byte layout (2B faultValue, series/parallel, signed current)", () => {
  const p = new Uint8Array(18);
  p[0] = 0;
  p[1] = 1;
  p[2] = 37; // cycles
  p[4] = 97; // health
  p[6] = (1 << 6) | 0; // charging + no fault
  p[7] = 0x34; p[8] = 0x12; // 2-byte faultValue = 0x1234
  p[9] = 5; p[10] = 0; // historyErrorCount = 5
  p[11] = 0x22; // 2S2P -> 4 cells
  p[12] = 86; // level
  p[13] = 251; // -5C signed int8
  p[14] = 0x14; p[15] = 0x1e; // 7700mV
  p[16] = 0x24; p[17] = 0xfa; // -1500mA

  const info = decodeBatteryInfo(p);
  assert.equal(info.chargeState, 1);
  assert.equal(info.faultType, 0);
  assert.equal(info.errorValue, 0x1234);
  assert.equal(info.historyErrorCount, 5);
  assert.equal(info.series, 2);
  assert.equal(info.parallel, 2);
  assert.equal(info.cellCount, 4);
  assert.equal(info.level, 86);
  assert.equal(info.temperature, -5);
  assert.equal(info.voltage, 7700);
  assert.equal(info.current, -1500);
});

test("decodeHistoryBatch decodes official 1+8*N layout with UTC+8 correction & unit conversion", () => {
  const payload = new Uint8Array(1 + 16);
  payload[0] = 0;
  const dv = new DataView(payload.buffer);
  dv.setUint32(1, 1770000000 + 28800, true);
  payload[5] = 1;
  payload[6] = 0 | 1;
  dv.setUint16(7, 4450, true);

  dv.setUint32(9, 1775000000 + 28800, true);
  payload[13] = 2;
  payload[14] = 64 | 3;
  dv.setUint16(15, 56, true);

  const filtered = decodeHistoryBatch(payload, 1772323200);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].timestamp, 1775000000);
  assert.equal(filtered[0].nationalStandardFault, "充电高温");
  assert.equal(filtered[0].formattedValue, "56 °C");

  const all = decodeHistoryBatch(payload, 0);
  assert.equal(all.length, 2);
  assert.equal(all[0].nationalStandardFault, "1号电芯过压");
  assert.equal(all[0].formattedValue, "4.45 V");
});

test("parseBatteryIdString resolves ATL / Lishen / Liwinon manufacturer & cell model", () => {
  const parsed = parseBatteryIdString("ATLNHJQ3F-1HJQ0001");
  assert.equal(parsed.fixed.enterpriseCode, "ATLN");
  assert.equal(parsed.fixed.assemblyFactory, "宁德新能源科技有限公司");
  assert.equal(parsed.miCodeInfo.cellModel, "436678N");
  assert.equal(calculateCrc8(new Uint8Array([0xa5, 0x07, 0x00])), 0xe3);
});
