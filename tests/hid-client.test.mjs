import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;
import test from "node:test";
import assert from "node:assert/strict";
import { HidClient } from "../src/hid/HidClient.js";
import { MockHidTransport } from "../src/hid/MockHidTransport.js";

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
  await client.handshake();

  const onRes = await client.setQi2(true, ["encrypted", "legacy"], { readbackIntervalMs: 5 });
  assert.equal(onRes.protocol, "encrypted");
  assert.equal(onRes.usedFallback, false);
  assert.equal(onRes.attempts, 3);
  assert.equal(onRes.status.enabled, true);

  const offRes = await client.setQi2(false, ["encrypted", "legacy"], { readbackIntervalMs: 5 });
  assert.equal(offRes.status.enabled, false);
  await client.close();
});

test("WPB1025S legacy 0x06 rejected -> automatic fallback to encrypted 0xE6 succeeds", async () => {
  const transport = new MockHidTransport({
    modelId: 9,
    acceptLegacyQi2: false,
    acceptEncryptedQi2: true,
  });
  const client = new HidClient(transport);
  await client.open();
  const hello = await client.handshake();
  assert.deepEqual(hello.modelConfig.capabilities.qi2.protocols, ["legacy", "encrypted"]);

  const res = await client.setQi2(true, hello.modelConfig.capabilities.qi2.protocols, { readbackIntervalMs: 5 });
  assert.equal(res.protocol, "encrypted");
  assert.equal(res.usedFallback, true);
  assert.equal(res.status.enabled, true);
  await client.close();
});

test("WPB0525S rejects both protocols and active fault blocks encrypted enable", async () => {
  const tFault = new MockHidTransport({ modelId: 16, faultType: 5 });
  const cFault = new HidClient(tFault);
  await cFault.open();
  await assert.rejects(() => cFault.setQi2(true, ["encrypted"], { readbackIntervalMs: 5 }), /active fault/);
  await cFault.close();

  const t0525 = new MockHidTransport({ modelId: 10, acceptLegacyQi2: false, acceptEncryptedQi2: false });
  const c0525 = new HidClient(t0525);
  await c0525.open();
  await assert.rejects(() => c0525.setQi2(true, ["encrypted", "legacy"], { readbackIntervalMs: 5 }), /rejected/);
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
