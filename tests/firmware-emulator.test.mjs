import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import test from "node:test";
import assert from "node:assert/strict";
import { HidClient } from "../src/hid/HidClient.js";
import { MockHidTransport } from "../src/hid/MockHidTransport.js";
import { CMD, RESP } from "../src/protocol/constants.js";
import { buildEncryptedQi2Payload } from "../src/protocol/qi2Crypto.js";
import { POWER_BANK_MODELS, resolveModelConfig } from "../src/config/models.js";

test("[抢占] Concurrent heartbeat & refresh do not preempt Qi2.2 encrypted transaction", async () => {
  const transport = new MockHidTransport({ modelId: 16, responseDelayMs: 5 });
  const client = new HidClient(transport);
  await client.open();
  await client.handshake();

  let injectedConcurrent = false;
  let heartbeatPromise = null;
  let refreshPromise = null;

  transport.onBeforeCommand = (parsed) => {
    if (parsed.command === CMD.GET_BATTERY_INFO && !injectedConcurrent) {
      injectedConcurrent = true;
      heartbeatPromise = client.sendHeartbeat();
      refreshPromise = client.getBatteryInfo();
    }
  };

  const qi2Res = await client.setQi2(true, ["encrypted"], { readbackIntervalMs: 5 });
  await Promise.all([heartbeatPromise, refreshPromise]);

  assert.equal(qi2Res.protocol, "encrypted");
  assert.equal(qi2Res.status.enabled, true);

  const cmds = transport.sentFrames.map((f) => f.command);
  const encIdx = cmds.indexOf(CMD.SET_QI2_ENCRYPTED);
  const txHelloIdx = cmds.lastIndexOf(CMD.HELLO, encIdx);
  assert.ok(txHelloIdx >= 0 && encIdx > txHelloIdx);
  assert.equal(cmds.slice(txHelloIdx + 1, encIdx).includes(CMD.HELLO), false);
  await client.close();
});

test("[中断] Physical disconnect mid-transaction rejects cleanly without hanging", async () => {
  let disconnectCalled = false;
  const transport = new MockHidTransport({
    modelId: 16,
    onBeforeCommand: (parsed, mock) => {
      if (parsed.command === CMD.SET_QI2_ENCRYPTED) {
        queueMicrotask(() => mock.triggerDisconnect());
      }
    },
  });
  const client = new HidClient(transport, {
    onDisconnect: () => {
      disconnectCalled = true;
    },
  });
  await client.open();
  await client.handshake();

  await assert.rejects(
    () => client.setQi2(true, ["encrypted"], { readbackIntervalMs: 5 }),
    /disconnected/i,
  );
  assert.equal(disconnectCalled, true);
  assert.equal(client.opened, false);
});

test("[假成功] Rejects when firmware acks 0xF6=0x00 but 6 read-backs remain disabled", async () => {
  const transport = new MockHidTransport({ modelId: 16, fakeWriteSuccess: true });
  const client = new HidClient(transport);
  await client.open();
  await client.handshake();

  await assert.rejects(
    () => client.setQi2(true, ["encrypted"], { readbackIntervalMs: 2, readbackRetries: 6 }),
    /read-back mismatch/i,
  );
  const statusQueries = transport.sentFrames.filter((f) => f.command === CMD.GET_QI2_STATUS);
  assert.equal(statusQueries.length, 7);
  await client.close();
});

test("[假成功/超时] Write timeout rejects and subsequent reads still work", async () => {
  const transport = new MockHidTransport({
    modelId: 16,
    dropResponseCommands: [CMD.SET_QI2_LEGACY],
  });
  const client = new HidClient(transport);
  await client.open();

  await assert.rejects(
    () => client.request(CMD.SET_QI2_LEGACY, RESP.SET_QI2_LEGACY, 30, new Uint8Array([1])),
    /timed out/i,
  );
  const status = await client.getQi2Status();
  assert.equal(status.success, true);
  await client.close();
});

test("[6] Firmware rejects stale-timestamp ciphertext & skips redundant write when already enabled", async () => {
  const transport = new MockHidTransport({ modelId: 16, qi2Enabled: false });
  const client = new HidClient(transport);
  await client.open();
  const hello = await client.handshake();

  const stalePayload = await buildEncryptedQi2Payload({
    snBytes: hello.snBytes,
    timestamp: hello.timestamp - 120,
    health: 97,
    cycles: 37,
    enabled: true,
  });
  const staleResp = await client.request(CMD.SET_QI2_ENCRYPTED, RESP.SET_QI2_ENCRYPTED, 1000, stalePayload);
  assert.equal(staleResp[0], 2);

  const onRes = await client.setQi2(true, ["encrypted"], { readbackIntervalMs: 2 });
  assert.equal(onRes.status.enabled, true);
  const writeCountAfterOn = transport.sentFrames.filter((f) => f.command === CMD.SET_QI2_ENCRYPTED).length;

  const idemRes = await client.setQi2(true, ["encrypted"], { readbackIntervalMs: 2 });
  assert.equal(idemRes.skipped, true);
  assert.equal(
    transport.sentFrames.filter((f) => f.command === CMD.SET_QI2_ENCRYPTED).length,
    writeCountAfterOn,
  );
  await client.close();
});

test("[7] All 18 models & extreme hardware boundaries (WPB1007ZX, P25, -20C, -3000mA, unknown ID)", async () => {
  assert.equal(POWER_BANK_MODELS.length, 24);
  for (const m of POWER_BANK_MODELS) {
    assert.ok(m.id > 0 && m.model && m.name && m.nameEn && m.connection);
    assert.ok(m.capabilities?.qi2 && m.display);
  }

  const wpb1007 = resolveModelConfig(11);
  assert.equal(wpb1007.display.showSerialNumber, false);
  assert.equal(wpb1007.display.showCellSerialNumber, false);
  assert.equal(wpb1007.display.maxTemperatureSensors, 1);
  assert.equal(wpb1007.capabilities.historyMinTimestamp, 1772323200);

  const p25 = resolveModelConfig(6);
  assert.equal(p25.tempRange, "-20℃~70℃");

  const transport = new MockHidTransport({
    modelId: 99,
    temperature: -20,
    current: -3000,
    cycleCount: 65535,
    level: 0,
  });
  const client = new HidClient(transport);
  await client.open();
  const hello = await client.handshake();
  assert.equal(hello.modelConfig.isUnknown, true);
  assert.equal(hello.modelConfig.model, "ID_99");
  assert.deepEqual(hello.modelConfig.capabilities.qi2.protocols, ["encrypted", "encrypted-compat", "legacy"]);

  const batt = await client.getBatteryInfo();
  assert.equal(batt.temperature, -20);
  assert.equal(batt.current, -3000);
  assert.equal(batt.cycleCount, 65535);
  assert.equal(batt.level, 0);

  const history = await client.getHistory(1, 7, wpb1007.capabilities.historyMinTimestamp);
  assert.equal(history.length, 1);
  assert.equal(history[0].timestamp, 1775000000);
  await client.close();
});
