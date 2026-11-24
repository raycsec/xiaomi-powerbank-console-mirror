import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;
import test from "node:test";
import assert from "node:assert/strict";
import { HidClient } from "../src/hid/HidClient.js";
import { MockHidTransport } from "../src/hid/MockHidTransport.js";
import { resolveModelConfig } from "../src/config/models.js";

test("Full HID read flow: handshake, battery, cells, IDs, tempModel, history, heartbeat, disconnect", async () => {
  const transport = new MockHidTransport({ modelId: 16 });
  const client = new HidClient(transport);
  await client.open();

  const hello = await client.handshake();
  assert.equal(hello.isEcho, false);
  assert.equal(hello.modelConfig.model, "WPB1026S");

  const batt = await client.getBatteryInfo();
  assert.equal(batt.level, 86);
  assert.equal(batt.health, 97);

  const cells = await client.getCellStatus(batt.cellCount);
  assert.equal(cells.length, 2);
  assert.equal(cells[0].voltage, 3850);

  const id1 = await client.getBatteryId(1);
  assert.ok(id1.raw.startsWith("ATLN"));

  const tempModel = await client.getTempModel();
  assert.equal(tempModel.lowTemp, -20);
  assert.equal(tempModel.highTemp, 60);
  assert.equal(tempModel.batteryModel, "436678N");

  const history = await client.getHistory(1, 7);
  assert.equal(history.length, 2);

  await client.sendHeartbeat();
  await client.disconnect();
  assert.equal(transport.opened, false);
});

test("WPB1026S Qi2.2 encrypted enable & disable with delayed read-back polling", async () => {
  const transport = new MockHidTransport({ modelId: 16, readbackDelayReads: 2 });
  const client = new HidClient(transport);
  await client.open();
  const hello = await client.handshake();
  assert.deepEqual(hello.modelConfig.capabilities.qi2.protocols, ["encrypted", "encrypted-compat", "legacy"]);

  const onRes = await client.setQi2(true, hello.modelConfig.capabilities.qi2.protocols, { readbackIntervalMs: 5 });
  assert.equal(onRes.protocol, "encrypted");
  assert.equal(onRes.usedFallback, false);
  assert.equal(onRes.attempts, 3);
  assert.equal(onRes.status.enabled, true);

  const offRes = await client.setQi2(false, hello.modelConfig.capabilities.qi2.protocols, { readbackIntervalMs: 5 });
  assert.equal(offRes.status.enabled, false);
  await client.close();
});

test("WPB1025S legacy 0x06 rejected -> automatic fallback to encrypted 0xE6 (and encrypted-compat) succeeds", async () => {
  const transport = new MockHidTransport({
    modelId: 9,
    acceptLegacyQi2: false,
    acceptEncryptedQi2: true,
  });
  const client = new HidClient(transport);
  await client.open();
  const hello = await client.handshake();
  assert.deepEqual(hello.modelConfig.capabilities.qi2.protocols, ["legacy", "encrypted", "encrypted-compat"]);

  const res = await client.setQi2(true, hello.modelConfig.capabilities.qi2.protocols, { readbackIntervalMs: 5 });
  assert.equal(res.protocol, "encrypted");
  assert.equal(res.usedFallback, true);
  assert.equal(res.status.enabled, true);
  await client.close();
});

test("Per-model protocol priority order: WPB0525S (compat first), WPB1026S & WPB1025 (encrypted first), WPB1025S (legacy first)", () => {
  assert.deepEqual(resolveModelConfig(10).capabilities.qi2.protocols, ["encrypted-compat", "encrypted", "legacy"]);
  assert.deepEqual(resolveModelConfig(16).capabilities.qi2.protocols, ["encrypted", "encrypted-compat", "legacy"]);
  assert.deepEqual(resolveModelConfig(12).capabilities.qi2.protocols, ["encrypted", "encrypted-compat", "legacy"]);
  assert.deepEqual(resolveModelConfig(9).capabilities.qi2.protocols, ["legacy", "encrypted", "encrypted-compat"]);
  assert.deepEqual(resolveModelConfig(19).capabilities.qi2.protocols, ["legacy", "encrypted", "encrypted-compat"]);
});

test("WPB0525S rejects all protocols when disabled and active fault blocks encrypted enable", async () => {
  const tFault = new MockHidTransport({ modelId: 16, faultType: 5 });
  const cFault = new HidClient(tFault);
  await cFault.open();
  await assert.rejects(() => cFault.setQi2(true, ["encrypted"], { readbackIntervalMs: 5 }), /active fault/);
  await cFault.close();

  const t0525 = new MockHidTransport({ modelId: 10, acceptLegacyQi2: false, acceptEncryptedQi2: false });
  const c0525 = new HidClient(t0525);
  await c0525.open();
  await assert.rejects(
    () => c0525.setQi2(true, resolveModelConfig(10).capabilities.qi2.protocols, { readbackIntervalMs: 2, commandDelayMs: 0 }),
    /rejected/,
  );
  await c0525.close();
});

test("0xFE echo handshake is handled gracefully without throwing", async () => {
  const transport = new MockHidTransport({ echoOnHello: true });
  const client = new HidClient(transport);
  await client.open();
  const res = await client.handshake();
  assert.equal(res.isEcho, true);
  await client.close();
});

test("WPB0525S 27B Hello (24B SN) encrypted Qi2.2 enable & disable succeeds end-to-end", async () => {
  const t0525 = new MockHidTransport({ modelId: 10, helloPayloadLength: 27, serial: "DMPB0525S202600000012345" });
  const c0525 = new HidClient(t0525);
  await c0525.open();
  const hello = await c0525.handshake();
  assert.equal(hello.snBytes.length, 24);
  assert.equal(hello.serialNumber, "DMPB0525S202600000012345");
  assert.deepEqual(hello.modelConfig.capabilities.qi2.protocols, ["encrypted-compat", "encrypted", "legacy"]);
  assert.equal(hello.modelConfig.capabilities.qi2.allowDisable, true);

  const onRes = await c0525.setQi2(true, ["encrypted"], { readbackIntervalMs: 5, commandDelayMs: 0 });
  assert.equal(onRes.protocol, "encrypted");
  assert.equal(onRes.status.enabled, true);

  const offRes = await c0525.setQi2(false, ["encrypted"], { readbackIntervalMs: 5, commandDelayMs: 0 });
  assert.equal(offRes.status.enabled, false);
  await c0525.close();
});

test("DevTools consoleLog emits structured TX/RX raw & decoded payloads without prose", async () => {
  const captured = [];
  const origLog = console.log;
  console.log = (...args) => captured.push(args);
  try {
    const t = new MockHidTransport({ modelId: 10, helloPayloadLength: 27, serial: "DMPB0525S202600000012345" });
    const c = new HidClient(t, { consoleLog: true });
    await c.open();
    await c.handshake();
    await c.getBatteryInfo();
    await c.close();
  } finally {
    console.log = origLog;
  }
  const txLogs = captured.filter((a) => a[0] === "[HID TX]");
  const rxLogs = captured.filter((a) => a[0] === "[HID RX]");
  assert.ok(txLogs.length >= 2);
  assert.ok(rxLogs.length >= 2);
  const helloRx = rxLogs.find((a) => a[1].cmd === "0x10");
  assert.equal(helloRx[1].decoded.modelId, 10);
  assert.equal(helloRx[1].decoded.snLen, 24);
  const battRx = rxLogs.find((a) => a[1].cmd === "0x11");
  assert.equal(battRx[1].decoded.health, 97);
});

test("HidClient re-handshakes on each 0xE6 retry (cycles=0 / raw-sn) so invalidated timestamps are refreshed", async () => {
  const { buildCommandFrame } = await import("../src/protocol/codec.js");
  const { buildEncryptedQi2Payload } = await import("../src/protocol/qi2Crypto.js");
  const logs = [];
  let qi2Enabled = false;
  let helloCount = 0;
  let activeTs = 0;
  let tsInvalidated = false;
  const snBytes = new Uint8Array([
    ...new TextEncoder().encode("84129/EZADJF6Y3000Q6"),
    0x00, 0x00, 0x00, 0x00,
  ]);
  const handlers = new Set();
  const mockTransport = {
    kind: "demo",
    info: { productName: "XiaomiPowerBank", vendorId: 0x2717, productId: 0x5116 },
    async open() {},
    async close() {},
    onInputReport(fn) { handlers.add(fn); return () => handlers.delete(fn); },
    onDisconnect() { return () => {}; },
    async send(frame) {
      const cmd = frame[1];
      const emit = (respCmd, payload) => {
        const resp = buildCommandFrame(respCmd, payload);
        for (const fn of handlers) fn(resp);
      };
      if (cmd === 0x00) {
        helloCount += 1;
        activeTs = new DataView(frame.buffer, frame.byteOffset + 3, 4).getUint32(0, true);
        tsInvalidated = false;
        const p = new Uint8Array(2 + snBytes.length + 1);
        p[0] = 10; p[1] = 0; p.set(snBytes, 2); p[p.length - 1] = 1;
        emit(0x10, p);
      } else if (cmd === 0x07) {
        emit(0x17, new Uint8Array([0, qi2Enabled ? 1 : 0]));
      } else if (cmd === 0x01) {
        const p = new Uint8Array(18);
        p[0] = 0; p[1] = 1; p[2] = 15; p[3] = 0; p[4] = 98; p[5] = 0; // cycles=15, health=98
        p[11] = 0x11; p[12] = 100; p[13] = 23; p[14] = 0x6d; p[15] = 0x0f;
        emit(0x11, p);
      } else if (cmd === 0xe6) {
        if (tsInvalidated) {
          emit(0xf6, new Uint8Array([2]));
          return;
        }
        const sent = frame.slice(3, 3 + frame[2]);
        const expectedRaw = await buildEncryptedQi2Payload({
          snBytes,
          timestamp: activeTs,
          health: 98,
          cycles: 15,
          enabled: true,
          useRawSerialBytes: true,
        });
        const matchRaw = sent.length === expectedRaw.length && sent.every((b, i) => b === expectedRaw[i]);
        if (matchRaw) {
          qi2Enabled = true;
          emit(0xf6, new Uint8Array([0]));
        } else {
          tsInvalidated = true;
          emit(0xf6, new Uint8Array([1]));
        }
      }
    },
  };

  const client = new HidClient(mockTransport, { onLog: (e) => logs.push(e), consoleLog: false });
  await client.open();
  const res = await client.setQi2(true, ["encrypted"], { commandDelayMs: 0, readbackIntervalMs: 0 });
  assert.equal(res.protocol, "encrypted-raw-sn");
  assert.equal(res.status.enabled, true);
  assert.equal(helloCount, 3);
  await client.close();
});

test("WPB0525S prioritizes encrypted-compat first (32B padded frames, 20B SN slice, cycles=0, 32B 0x07 readback) & supports disable", async () => {
  const { buildCommandFrame } = await import("../src/protocol/codec.js");
  const { buildEncryptedQi2Payload } = await import("../src/protocol/qi2Crypto.js");
  const model0525 = resolveModelConfig(10);
  assert.deepEqual(model0525.capabilities.qi2.protocols, ["encrypted-compat", "encrypted", "legacy"]);
  assert.equal(model0525.capabilities.qi2.allowDisable, true);

  let qi2Enabled = false;
  const full24Sn = new TextEncoder().encode("84129/EZADJF6Y3000Q6ABCD");
  const slice20Sn = full24Sn.slice(0, 20);
  const handlers = new Set();
  const txFrames = [];

  const mockTransport = {
    kind: "demo",
    info: { productName: "XiaomiPowerBank", vendorId: 0x2717, productId: 0x5116 },
    async open() {},
    async close() {},
    onInputReport(fn) { handlers.add(fn); return () => handlers.delete(fn); },
    onDisconnect() { return () => {}; },
    async send(frame) {
      txFrames.push(frame);
      if (frame.length !== 32) {
        if (frame[1] === 0xe6) {
          for (const fn of handlers) fn(buildCommandFrame(0xf6, new Uint8Array([1])));
        }
        return;
      }

      const cmd = frame[1];
      if (cmd === 0x00) {
        const p = new Uint8Array(27);
        p[0] = 10; p[1] = 0; p.set(full24Sn, 2); p[26] = 1;
        for (const fn of handlers) fn(buildCommandFrame(0x10, p));
      } else if (cmd === 0x07) {
        for (const fn of handlers) fn(buildCommandFrame(0x17, new Uint8Array([0, qi2Enabled ? 1 : 0])));
      } else if (cmd === 0x01) {
        const p = new Uint8Array(18);
        p[0] = 0; p[1] = 1; p[2] = 42; p[3] = 0; p[4] = 99; p[5] = 0;
        p[11] = 0x11; p[12] = 88; p[13] = 25; p[14] = 0x6d; p[15] = 0x0f;
        for (const fn of handlers) fn(buildCommandFrame(0x11, p));
      } else if (cmd === 0xe6) {
        const sent = frame.slice(3, 3 + frame[2]);
        const baseTs = (Math.floor(Date.now() / 1000) + 8 * 3600) >>> 0;
        let matched = false;
        let targetState = true;
        for (const candidateState of [true, false]) {
          for (let dt = -2; dt <= 2; dt += 1) {
            const expected = await buildEncryptedQi2Payload({
              snBytes: slice20Sn,
              timestamp: (baseTs + dt) >>> 0,
              health: 99,
              cycles: 0,
              enabled: candidateState,
              useRawSerialBytes: true,
            });
            if (sent.length === expected.length && sent.every((b, i) => b === expected[i])) {
              matched = true;
              targetState = candidateState;
              break;
            }
          }
        }
        if (matched) {
          qi2Enabled = targetState;
          for (const fn of handlers) fn(buildCommandFrame(0xf6, new Uint8Array([0])));
        } else {
          for (const fn of handlers) fn(buildCommandFrame(0xf6, new Uint8Array([1])));
        }
      }
    },
  };

  const client = new HidClient(mockTransport, { consoleLog: false });
  await client.open();

  // WPB0525S prioritizes encrypted-compat FIRST -> usedFallback is false!
  const enableRes = await client.setQi2(true, model0525.capabilities.qi2.protocols, {
    commandDelayMs: 0,
    readbackIntervalMs: 0,
  });
  assert.equal(enableRes.usedFallback, false);
  assert.equal(enableRes.protocol, "encrypted-compat-cycles0");
  assert.equal(enableRes.status.enabled, true);
  assert.equal(enableRes.diagnostics.padded32, true);
  assert.equal(enableRes.diagnostics.snMode, "slice20-raw");
  assert.equal(enableRes.diagnostics.cyclesEncoded, 0);

  // Verify ALL sent frames in WPB0525S primary flow were 32-byte padded reports
  assert.equal(txFrames.every((f) => f.length === 32), true);

  // Disable via WPB0525S chain
  const disableRes = await client.setQi2(false, model0525.capabilities.qi2.protocols, {
    commandDelayMs: 0,
    readbackIntervalMs: 0,
  });
  assert.equal(disableRes.usedFallback, false);
  assert.equal(disableRes.protocol, "encrypted-compat-cycles0");
  assert.equal(disableRes.status.enabled, false);
  await client.close();
});

test("encrypted-compat must send full 13B Hello so firmware latches session timestamp (not empty 0x00)", async () => {
  const { buildCommandFrame } = await import("../src/protocol/codec.js");
  const { buildEncryptedQi2Payload } = await import("../src/protocol/qi2Crypto.js");
  let qi2Enabled = false;
  let latchedTs = 0; // Only updated by full 13-byte Hello (not empty 0x00)!
  const snBytes = new Uint8Array([
    ...new TextEncoder().encode("84130/EZADJF6XM002WW"),
    0x00, 0x00, 0x00, 0x00,
  ]);
  const handlers = new Set();
  const mockTransport = {
    kind: "demo",
    info: { productName: "XiaomiPowerBank", vendorId: 0x2717, productId: 0x5116 },
    async open() {},
    async close() {},
    onInputReport(fn) { handlers.add(fn); return () => handlers.delete(fn); },
    onDisconnect() { return () => {}; },
    async send(frame) {
      const cmd = frame[1];
      const payloadLen = frame[2];
      const emit = (respCmd, payload) => {
        const resp = buildCommandFrame(respCmd, payload);
        for (const fn of handlers) fn(resp);
      };
      if (cmd === 0x00) {
        if (payloadLen === 13) {
          latchedTs = new DataView(frame.buffer, frame.byteOffset + 3, 4).getUint32(0, true);
        }
        const p = new Uint8Array(2 + snBytes.length + 1);
        p[0] = 10; p[1] = 0; p.set(snBytes, 2); p[p.length - 1] = 1;
        emit(0x10, p);
      } else if (cmd === 0x07) {
        emit(0x17, new Uint8Array([0, qi2Enabled ? 1 : 0]));
      } else if (cmd === 0x01) {
        const p = new Uint8Array(18);
        p[0] = 0; p[1] = 1; p[2] = 2; p[3] = 0; p[4] = 100; p[5] = 0;
        p[11] = 0x11; p[12] = 74; p[13] = 19; p[14] = 0x80; p[15] = 0x10;
        emit(0x11, p);
      } else if (cmd === 0xe6) {
        if (frame.length !== 32 || latchedTs === 0) {
          emit(0xf6, new Uint8Array([1]));
          return;
        }
        const sent = frame.slice(3, 3 + payloadLen);
        const expected = await buildEncryptedQi2Payload({
          snBytes: snBytes.slice(0, 20),
          timestamp: latchedTs,
          health: 100,
          cycles: 2,
          enabled: true,
          useRawSerialBytes: true,
        });
        const ok = sent.length === expected.length && sent.every((b, i) => b === expected[i]);
        if (ok) {
          qi2Enabled = true;
          emit(0xf6, new Uint8Array([0]));
        } else {
          emit(0xf6, new Uint8Array([1]));
        }
      }
    },
  };

  const client = new HidClient(mockTransport, { consoleLog: false });
  await client.open();
  const res = await client.setQi2(true, ["encrypted-compat"], { commandDelayMs: 0, readbackIntervalMs: 0 });
  assert.equal(res.protocol, "encrypted-compat");
  assert.equal(res.status.enabled, true);
  assert.ok(latchedTs > 0);
  await client.close();
});
