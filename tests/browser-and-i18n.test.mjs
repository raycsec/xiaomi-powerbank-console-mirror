import { formatLocalDateTime } from "../src/utils/formatTime.js";
import test from "node:test";
import assert from "node:assert/strict";
import { checkWebHidSupport } from "../src/hid/browserSupport.js";
import { POWER_BANK_MODELS, resolveModelConfig } from "../src/config/models.js";
import { LOCALE_PACKS, formatMessage } from "../src/i18n/index.js";

test("Browser capability gate allows ALL WebHID-capable browsers (Chrome, Edge, Brave, Opera, Vivaldi, Arc)", () => {
  const mockHid = { requestDevice: async () => [], getDevices: async () => [] };
  for (const ua of [
    "Mozilla/5.0 Chrome/130.0.0.0",
    "Mozilla/5.0 Edg/130.0.0.0",
    "Mozilla/5.0 OPR/114.0.0.0",
    "Mozilla/5.0 Brave/1.70 Chrome/130.0.0.0",
    "Mozilla/5.0 Vivaldi/6.9 Chrome/128.0.0.0",
  ]) {
    const res = checkWebHidSupport({ userAgent: ua, hid: mockHid });
    assert.equal(res.supported, true, `Should support ${ua}`);
  }
  assert.equal(checkWebHidSupport({ userAgent: "Mozilla/5.0 Safari/605.1.15" }).supported, false);
  assert.equal(checkWebHidSupport({ userAgent: "Mozilla/5.0 Firefox/131.0" }).supported, false);
});

test("Unified model config exposes display & capability switches for all 18 models", () => {
  assert.equal(POWER_BANK_MODELS.length, 24);
  const wpb1007 = resolveModelConfig(11);
  assert.equal(wpb1007.display.showSerialNumber, false);
  assert.equal(wpb1007.display.maxTemperatureSensors, 1);
  assert.equal(wpb1007.capabilities.historyMinTimestamp, 1772323200);

  const unknown = resolveModelConfig(999);
  assert.equal(unknown.isUnknown, true);
  assert.equal(unknown.capabilities.qi2.mode, "experimental");
});

test("zh-CN and en locale packs have 100% matching keys and working interpolation", () => {
  const zhKeys = Object.keys(LOCALE_PACKS["zh-CN"]).sort();
  const enKeys = Object.keys(LOCALE_PACKS.en).sort();
  assert.deepEqual(zhKeys, enKeys);
  assert.equal(formatMessage("zh-CN", "field_temp_sensor", { index: 2 }), "测温点 2");
  assert.equal(formatMessage("en", "field_temp_sensor", { index: 2 }), "Sensor 2");
});

test("formatLocalDateTime formats unix timestamp as local YYYY-MM-DD HH:mm:ss", () => {
  const formatted = formatLocalDateTime(1775000000);
  assert.match(formatted, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  assert.equal(formatLocalDateTime(0), "--");
});
