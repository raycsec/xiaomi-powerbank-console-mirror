import type { HidDeviceInfo, HidTransport, ParsedFrame } from "../types/domain.js";
import { CMD, FRAME_HEAD, RESP } from "../protocol/constants.js";
import { calculateCrc8, parseFrame } from "../protocol/codec.js";
import { buildEncryptedQi2Payload } from "../protocol/qi2Crypto.js";

function makeResponseFrame(cmd: number, payload: Uint8Array): Uint8Array {
  const out = new Uint8Array(4 + payload.length);
  out[0] = FRAME_HEAD;
  out[1] = cmd;
  out[2] = payload.length;
  out.set(payload, 3);
  out[3 + payload.length] = calculateCrc8(out.subarray(0, 3 + payload.length));
  return out;
}

export interface MockHidState {
  qi2Enabled: boolean;
  pendingQi2Enabled: boolean | null;
  remainingDelayReads: number;
  health: number;
  cycleCount: number;
  faultType: number;
  errorValue: number;
  historyErrorCount: number;
  chargeState: number;
  level: number;
  temperature: number;
  voltage: number;
  current: number;
  series: number;
  parallel: number;
  lastHelloTimestamp: number;
}

export class MockHidTransport implements HidTransport {
  readonly kind = "demo" as const;
  info: HidDeviceInfo;
  opened: boolean;
  modelId: number;
  helloPayloadLength: number;
  serial: string;
  snBytes: Uint8Array;
  echoOnHello: boolean;
  acceptLegacyQi2: boolean;
  acceptEncryptedQi2: boolean;
  readbackDelayReads: number;
  fakeWriteSuccess: boolean;
  dropResponseCommands: Set<number>;
  responseDelayMs: number;
  onBeforeCommand: ((parsed: ParsedFrame, mock: MockHidTransport) => Promise<void> | void) | null;
  customCommandHandler:
    | ((
        parsed: ParsedFrame,
        mock: MockHidTransport,
        makeResp: typeof makeResponseFrame,
      ) => Promise<boolean> | boolean)
    | null;
  state: MockHidState;
  reportListeners: Set<(data: Uint8Array) => void>;
  disconnectListeners: Set<() => void>;
  sentFrames: ParsedFrame[];

  constructor(config: Record<string, any> = {}) {
    this.modelId = config.modelId ?? 16;
    this.helloPayloadLength = config.helloPayloadLength ?? (this.modelId === 10 ? 27 : 23);
    const snAreaLen = this.helloPayloadLength - 3;
    this.serial = config.serial ?? (this.modelId === 10 ? "DMPB0525S202600000012345" : "DMPB1026S0001");
    this.snBytes =
      config.snBytes ??
      new TextEncoder().encode(this.serial.padEnd(snAreaLen, "\0").slice(0, snAreaLen));
    this.echoOnHello = config.echoOnHello ?? false;
    this.acceptLegacyQi2 = config.acceptLegacyQi2 ?? (this.modelId === 9 || this.modelId === 19);
    this.acceptEncryptedQi2 = config.acceptEncryptedQi2 ?? (this.modelId === 16 || this.modelId === 10);
    this.readbackDelayReads = config.readbackDelayReads ?? 0;
    this.fakeWriteSuccess = config.fakeWriteSuccess ?? false;
    this.dropResponseCommands = new Set(config.dropResponseCommands ?? []);
    this.responseDelayMs = config.responseDelayMs ?? 0;
    this.onBeforeCommand = config.onBeforeCommand ?? null;
    this.customCommandHandler = config.customCommandHandler ?? null;

    this.state = {
      qi2Enabled: config.qi2Enabled ?? false,
      pendingQi2Enabled: null,
      remainingDelayReads: 0,
      health: config.health ?? 97,
      cycleCount: config.cycleCount ?? 37,
      faultType: config.faultType ?? 0,
      errorValue: config.errorValue ?? 0,
      historyErrorCount: config.historyErrorCount ?? 2,
      chargeState: config.chargeState ?? 1,
      level: config.level ?? 86,
      temperature: config.temperature ?? 30,
      voltage: config.voltage ?? 7700,
      current: config.current ?? 1190,
      series: config.series ?? 1,
      parallel: config.parallel ?? (config.cellCount ?? 2),
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

  async open(): Promise<void> {
    this.opened = true;
  }

  async close(): Promise<void> {
    this.opened = false;
  }

  triggerDisconnect(): void {
    this.opened = false;
    for (const cb of this.disconnectListeners) cb();
  }

  onInputReport(handler: (data: Uint8Array) => void): () => void {
    this.reportListeners.add(handler);
    return () => this.reportListeners.delete(handler);
  }

  onDisconnect(handler: () => void): () => void {
    this.disconnectListeners.add(handler);
    return () => this.disconnectListeners.delete(handler);
  }

  emit(frame: Uint8Array): void {
    const fire = () => {
      if (!this.opened) return;
      for (const cb of this.reportListeners) cb(frame);
    };
    if (this.responseDelayMs > 0) setTimeout(fire, this.responseDelayMs);
    else queueMicrotask(fire);
  }

  async send(frame: Uint8Array): Promise<void> {
    if (!this.opened) throw new Error("Mock transport is closed");
    const parsed = parseFrame(frame);
    if (!parsed || !parsed.crcValid) throw new Error("Invalid outgoing frame");
    this.sentFrames.push(parsed);
    if (this.onBeforeCommand) await this.onBeforeCommand(parsed, this);
    if (!this.opened || this.dropResponseCommands.has(parsed.command)) return;
    if (this.customCommandHandler && (await this.customCommandHandler(parsed, this, makeResponseFrame))) return;

    switch (parsed.command) {
      case CMD.HELLO: {
        if (parsed.payload.length >= 4) {
          this.state.lastHelloTimestamp = new DataView(parsed.payload.buffer, parsed.payload.byteOffset).getUint32(0, true);
        }
        if (this.echoOnHello) {
          this.emit(makeResponseFrame(RESP.ECHO, parsed.payload));
          return;
        }
        const payload = new Uint8Array(this.helloPayloadLength);
        const snAreaLen = this.helloPayloadLength - 3;
        payload[0] = this.modelId & 0xff;
        payload[1] = (this.modelId >> 8) & 0xff;
        payload.set(this.snBytes.slice(0, snAreaLen), 2);
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
        p[7] = this.state.errorValue & 0xff;
        p[8] = (this.state.errorValue >> 8) & 0xff;
        p[9] = this.state.historyErrorCount & 0xff;
        p[10] = (this.state.historyErrorCount >> 8) & 0xff;
        p[11] = ((this.state.series & 0x0f) << 4) | (this.state.parallel & 0x0f);
        p[12] = this.state.level;
        p[13] = this.state.temperature & 0xff;
        p[14] = this.state.voltage & 0xff;
        p[15] = (this.state.voltage >> 8) & 0xff;
        const cur = this.state.current < 0 ? 0x10000 + this.state.current : this.state.current;
        p[16] = cur & 0xff;
        p[17] = (cur >> 8) & 0xff;
        this.emit(makeResponseFrame(RESP.BATTERY_INFO, p));
        return;
      }

      case CMD.GET_CELL_STATUS: {
        // 0x12: status(1B) + 2 cells * 5B (tempC:int8, voltageMV:int16LE, currentMA:int16LE)
        const p = new Uint8Array(1 + 10);
        const dv = new DataView(p.buffer);
        p[0] = 0;
        p[1] = 29;
        dv.setInt16(2, 3850, true);
        dv.setInt16(4, 595, true);
        p[6] = 30;
        dv.setInt16(7, 3852, true);
        dv.setInt16(9, 595, true);
        this.emit(makeResponseFrame(RESP.CELL_STATUS, p));
        return;
      }

      case CMD.GET_BATTERY_ID: {
        const cellIdx = parsed.payload[0] || 1;
        const idStr = cellIdx === 1 ? "ATLNDAG3F-1D9A26A0123" : "LWN2AFG3F-1MFH26B0456";
        const bytes = new TextEncoder().encode(idStr);
        const p = new Uint8Array(30);
        p[0] = 0;
        p[1] = cellIdx;
        p.set(bytes.slice(0, 28), 2);
        this.emit(makeResponseFrame(RESP.BATTERY_ID, p));
        return;
      }

      case CMD.GET_CELL_TEMP_MODEL: {
        const modelBytes = new TextEncoder().encode("436678N");
        const p = new Uint8Array(5 + modelBytes.length);
        const dv = new DataView(p.buffer);
        p[0] = 0;
        dv.setInt16(1, 60, true);
        dv.setInt16(3, -20, true);
        p.set(modelBytes, 5);
        this.emit(makeResponseFrame(RESP.CELL_TEMP_MODEL, p));
        return;
      }

      case CMD.GET_HISTORY: {
        const p = new Uint8Array(1 + 16);
        const dv = new DataView(p.buffer);
        p[0] = 0;
        // Record 1: charging high temp 56°C at UTC+8 timestamp
        dv.setUint32(1, 1775000000 + 28800, true);
        p[5] = 1;
        p[6] = 64 | 3;
        dv.setUint16(7, 56, true);
        // Record 2: cell 2 overvoltage 4450mV -> 4.45 V
        dv.setUint32(9, 1770000000 + 28800, true);
        p[13] = 2;
        p[14] = 0 | 1;
        dv.setUint16(15, 4450, true);
        this.emit(makeResponseFrame(RESP.HISTORY, p));
        return;
      }

      case CMD.GET_QI2_STATUS: {
        if (this.state.pendingQi2Enabled !== null) {
          if (this.state.remainingDelayReads > 0) this.state.remainingDelayReads -= 1;
          else {
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

  scheduleQi2State(target: boolean): void {
    if (this.fakeWriteSuccess) return;
    if (this.readbackDelayReads > 0) {
      this.state.pendingQi2Enabled = target;
      this.state.remainingDelayReads = this.readbackDelayReads;
    } else {
      this.state.qi2Enabled = target;
    }
  }
}
