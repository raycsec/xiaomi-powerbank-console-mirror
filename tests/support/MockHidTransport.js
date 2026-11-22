import { CMD, FRAME_HEAD, HID_FRAME_SIZE, RESP } from "../../src/protocol/constants.js";
import { calculateCrc8 } from "../../src/protocol/crc8.js";
import { parseFrame } from "../../src/protocol/frames.js";
import { buildEncryptedQi2Payload } from "../../src/protocol/qi2Ccm.js";

function makeResponseFrame(cmd, payload) {
  const body = new Uint8Array(3 + payload.length);
  body[0] = FRAME_HEAD;
  body[1] = cmd;
  body[2] = payload.length;
  body.set(payload, 3);
  const out = new Uint8Array(HID_FRAME_SIZE);
  out.set(body);
  out[body.length] = calculateCrc8(body);
  return out;
}

export class MockHidTransport {
  constructor(config = {}) {
    this.kind = "demo";
    this.modelId = config.modelId ?? 16; // 默认 WPB1026S
    this.serial = config.serial ?? "DMPB1026S0001";
    this.snBytes = config.snBytes ?? new TextEncoder().encode(this.serial.padEnd(20, "\0").slice(0, 20));
    this.helloPayloadLength = config.helloPayloadLength ?? 23;
    this.echoOnHello = config.echoOnHello ?? false;
    this.acceptLegacyQi2 = config.acceptLegacyQi2 ?? (this.modelId === 9 || this.modelId === 19);
    this.acceptEncryptedQi2 = config.acceptEncryptedQi2 ?? this.modelId === 16;
    this.readbackDelayReads = config.readbackDelayReads ?? 0;
    this.fakeWriteSuccess = config.fakeWriteSuccess ?? false;
    this.dropResponseCommands = new Set(config.dropResponseCommands ?? []);
    this.responseDelayMs = config.responseDelayMs ?? 0;
    this.onBeforeCommand = config.onBeforeCommand ?? null;

    this.state = {
      qi2Enabled: config.qi2Enabled ?? false,
      pendingQi2Enabled: null,
      remainingDelayReads: 0,
      health: config.health ?? 97,
      cycleCount: config.cycleCount ?? 37,
      faultType: config.faultType ?? 0,
      chargeState: config.chargeState ?? 1, // 充电中
      level: config.level ?? 86,
      temperature: config.temperature ?? 30,
      voltage: config.voltage ?? 7700,
      current: config.current ?? 1190,
      cellCount: config.cellCount ?? 2,
      lastHelloTimestamp: 0,
    };

    this.info = {
      productName: config.productName ?? "XiaomiPowerBank",
      vendorId: 0x2717,
      productId: 0x1026,
    };
    this.reportListeners = new Set();
    this.disconnectListeners = new Set();
    this.opened = false;
    this.sentFrames = [];
  }

  async open() {
    this.opened = true;
  }

  async close() {
    this.opened = false;
  }

  triggerDisconnect() {
    this.opened = false;
    for (const cb of this.disconnectListeners) cb();
  }

  onInputReport(handler) {
    this.reportListeners.add(handler);
    return () => this.reportListeners.delete(handler);
  }

  onDisconnect(handler) {
    this.disconnectListeners.add(handler);
    return () => this.disconnectListeners.delete(handler);
  }

  emit(frame) {
    const fire = () => {
      if (!this.opened) return;
      for (const cb of this.reportListeners) cb(frame);
    };
    if (this.responseDelayMs > 0) {
      setTimeout(fire, this.responseDelayMs);
    } else {
      queueMicrotask(fire);
    }
  }

  async send(frame) {
    if (!this.opened) throw new Error("Mock transport is closed");
    const parsed = parseFrame(frame);
    if (!parsed || !parsed.crcValid) throw new Error("Invalid outgoing frame");
    this.sentFrames.push(parsed);
    if (this.onBeforeCommand) {
      await this.onBeforeCommand(parsed, this);
    }
    if (!this.opened || this.dropResponseCommands.has(parsed.command)) {
      return;
    }

    switch (parsed.command) {
      case CMD.HELLO: {
        this.state.lastHelloTimestamp = new DataView(parsed.payload.buffer, parsed.payload.byteOffset).getUint32(0, true);
        if (this.echoOnHello) {
          this.emit(makeResponseFrame(RESP.ECHO, parsed.payload));
          return;
        }
        const payload = new Uint8Array(this.helloPayloadLength);
        payload[0] = this.modelId & 0xff;
        payload[1] = (this.modelId >> 8) & 0xff;
        payload.set(this.snBytes.slice(0, 20), 2);
        payload[payload.length - 1] = this.state.chargeState;
        this.emit(makeResponseFrame(RESP.HELLO, payload));
        return;
      }

      case CMD.GET_BATTERY_INFO: {
        const p = new Uint8Array(18);
        p[0] = 0;
        p[1] = 1;
        p[2] = this.state.cycleCount & 0xff;
        p[3] = (this.state.cycleCount >> 8) & 0xff;
        p[4] = this.state.health & 0xff;
        p[5] = (this.state.health >> 8) & 0xff;
        p[6] = ((this.state.chargeState & 0x03) << 6) | (this.state.faultType & 0x3f);
        p[7] = 0;
        p[8] = 2; // history count
        p[9] = 0;
        p[10] = this.state.cellCount;
        p[11] = this.state.level;
        p[12] = this.state.temperature & 0xff;
        p[13] = this.state.voltage & 0xff;
        p[14] = (this.state.voltage >> 8) & 0xff;
        const cur = this.state.current < 0 ? 0x10000 + this.state.current : this.state.current;
        p[15] = cur & 0xff;
        p[16] = (cur >> 8) & 0xff;
        this.emit(makeResponseFrame(RESP.BATTERY_INFO, p));
        return;
      }

      case CMD.GET_CELL_STATUS: {
        const p = new Uint8Array([0, 2, 1, 0x0a, 0x0f, 29, 2, 0x0a, 0x0f, 30]); // 3850mV each
        this.emit(makeResponseFrame(RESP.CELL_STATUS, p));
        return;
      }

      case CMD.GET_BATTERY_ID: {
        const cellIdx = parsed.payload[0] || 1;
        const idStr = cellIdx === 1 ? "ATLNDAG3F-1D9A26A0123" : "LWN2AFG3F-1MFH26B0456";
        const bytes = new TextEncoder().encode(idStr);
        const p = new Uint8Array(1 + bytes.length);
        p[0] = cellIdx;
        p.set(bytes, 1);
        this.emit(makeResponseFrame(RESP.BATTERY_ID, p));
        return;
      }

      case CMD.GET_CELL_TEMP_MODEL: {
        const modelBytes = new TextEncoder().encode("436678N");
        const p = new Uint8Array(3 + modelBytes.length);
        p[0] = 0;
        p[1] = 236; // -20C
        p[2] = 60;  // +60C
        p.set(modelBytes, 3);
        this.emit(makeResponseFrame(RESP.CELL_TEMP_MODEL, p));
        return;
      }

      case CMD.GET_HISTORY: {
        const p = new Uint8Array(2 + 16);
        p[0] = 0;
        p[1] = 2;
        const dv = new DataView(p.buffer);
        dv.setUint32(2, 1775000000, true);
        p[6] = 5; // charge high temp
        p[7] = 1;
        dv.setInt16(8, 56, true);
        dv.setUint32(10, 1770000000, true);
        p[14] = 1; // overvoltage
        p[15] = 2;
        dv.setInt16(16, 4450, true);
        this.emit(makeResponseFrame(RESP.HISTORY, p));
        return;
      }

      case CMD.GET_QI2_STATUS: {
        if (this.state.pendingQi2Enabled !== null) {
          if (this.state.remainingDelayReads > 0) {
            this.state.remainingDelayReads -= 1;
          } else {
            this.state.qi2Enabled = this.state.pendingQi2Enabled;
            this.state.pendingQi2Enabled = null;
          }
        }
        this.emit(makeResponseFrame(RESP.QI2_STATUS, new Uint8Array([0, this.state.qi2Enabled ? 1 : 0])));
        return;
      }

      case CMD.SET_QI2_LEGACY: {
        if (!this.acceptLegacyQi2) {
          this.emit(makeResponseFrame(RESP.SET_QI2_LEGACY, new Uint8Array([1])));
          return;
        }
        this.scheduleQi2State(parsed.payload[0] === 1);
        this.emit(makeResponseFrame(RESP.SET_QI2_LEGACY, new Uint8Array([0])));
        return;
      }

      case CMD.SET_QI2_ENCRYPTED: {
        if (!this.acceptEncryptedQi2) {
          this.emit(makeResponseFrame(RESP.SET_QI2_ENCRYPTED, new Uint8Array([1])));
          return;
        }
        const expectedOn = await buildEncryptedQi2Payload({
          snBytes: this.snBytes,
          timestamp: this.state.lastHelloTimestamp,
          health: this.state.health,
          cycles: this.state.cycleCount,
          enabled: true,
        });
        const expectedOff = await buildEncryptedQi2Payload({
          snBytes: this.snBytes,
          timestamp: this.state.lastHelloTimestamp,
          health: this.state.health,
          cycles: this.state.cycleCount,
          enabled: false,
        });
        const matchOn = parsed.payload.length === 9 && parsed.payload.every((b, i) => b === expectedOn[i]);
        const matchOff = parsed.payload.length === 9 && parsed.payload.every((b, i) => b === expectedOff[i]);
        if (!matchOn && !matchOff) {
          this.emit(makeResponseFrame(RESP.SET_QI2_ENCRYPTED, new Uint8Array([2])));
          return;
        }
        this.scheduleQi2State(matchOn);
        this.emit(makeResponseFrame(RESP.SET_QI2_ENCRYPTED, new Uint8Array([0])));
        return;
      }

      case CMD.DISCONNECT:
        return;
    }
  }

  scheduleQi2State(target) {
    if (this.fakeWriteSuccess) return;
    if (this.readbackDelayReads > 0) {
      this.state.pendingQi2Enabled = target;
      this.state.remainingDelayReads = this.readbackDelayReads;
    } else {
      this.state.qi2Enabled = target;
    }
  }
}
