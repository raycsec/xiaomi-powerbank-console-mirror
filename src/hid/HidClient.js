import { CMD, RESP, TIMEOUT_MS } from "../protocol/constants.js";
import {
  decodeBatteryId,
  decodeBatteryInfo,
  decodeCellStatus,
  decodeHelloResponse,
  decodeHistoryBatch,
  decodeQi2Status,
  decodeTempModel,
} from "../protocol/decoders.js";
import { buildCommandFrame, buildHelloFrame, bytesToHex, extractFrames } from "../protocol/frames.js";
import { QI2_STRATEGIES } from "../protocol/qi2Strategies.js";

export class HidClient {
  constructor(transport, callbacks = {}) {
    this.transport = transport;
    this.callbacks = callbacks;
    this.pending = new Map();
    this.inputBuffer = new Uint8Array(0);
    this.opened = false;
    this.sessionVersion = 0;
    this.commandQueue = Promise.resolve();
    this.detachReport = null;
    this.detachDisconnect = null;
  }

  async open() {
    await this.transport.open();
    this.opened = true;
    this.detachReport = this.transport.onInputReport((data) => this.handleInputReport(data));
    this.detachDisconnect = this.transport.onDisconnect(() => this.handleUnexpectedDisconnect());
    this.emitLog("INFO", "HID session opened", null, this.transport.info);
  }

  async close() {
    this.sessionVersion += 1;
    this.opened = false;
    this.rejectAll(new Error("Session closed"));
    this.detachReport?.();
    this.detachDisconnect?.();
    this.detachReport = null;
    this.detachDisconnect = null;
    this.inputBuffer = new Uint8Array(0);
    await this.transport.close();
  }

  async disconnect() {
    if (!this.opened) return;
    try {
      const frame = buildCommandFrame(CMD.DISCONNECT);
      this.emitLog("TX", "Disconnect", frame);
      await this.transport.send(frame);
    } catch {
    }
    await this.close();
  }

  async handshake() {
    const { frame, timestamp } = buildHelloFrame();
    const payload = await this.enqueue(() =>
      this.requestRawUnlocked(CMD.HELLO, [RESP.HELLO, RESP.ECHO], TIMEOUT_MS.HELLO, frame, "Hello"),
    );
    if (payload.__command === RESP.ECHO) {
      return {
        isEcho: true,
        timestamp,
        modelId: null,
        snBytes: new Uint8Array(0),
        serialNumber: "",
        chargeState: 0,
        modelConfig: null,
      };
    }
    return { isEcho: false, timestamp, ...decodeHelloResponse(payload) };
  }

  async sendHeartbeat() {
    if (!this.opened) return;
    const version = this.sessionVersion;
    try {
      const { frame } = buildHelloFrame();
      await this.enqueue(() =>
        this.requestRawUnlocked(CMD.HELLO, [RESP.HELLO, RESP.ECHO], TIMEOUT_MS.HELLO, frame, "Heartbeat"),
      );
    } catch (error) {
      this.emitLog("ERROR", "Heartbeat failed", null, { message: error.message });
      if (version === this.sessionVersion) {
        this.handleUnexpectedDisconnect();
      }
    }
  }

  async getBatteryInfo() {
    const payload = await this.request(CMD.GET_BATTERY_INFO, RESP.BATTERY_INFO, TIMEOUT_MS.COMMAND);
    return decodeBatteryInfo(payload);
  }

  async getCellStatus(cellCount) {
    if (cellCount <= 0) return [];
    const payload = await this.request(
      CMD.GET_CELL_STATUS,
      RESP.CELL_STATUS,
      TIMEOUT_MS.COMMAND,
      new Uint8Array([1, Math.min(255, cellCount)]),
    );
    return decodeCellStatus(payload);
  }

  async getBatteryId(cellIndex) {
    const payload = await this.request(
      CMD.GET_BATTERY_ID,
      RESP.BATTERY_ID,
      TIMEOUT_MS.BATTERY_ID,
      new Uint8Array([cellIndex]),
    );
    return decodeBatteryId(payload);
  }

  async getTempModel() {
    const payload = await this.request(CMD.GET_CELL_TEMP_MODEL, RESP.CELL_TEMP_MODEL, TIMEOUT_MS.COMMAND);
    return decodeTempModel(payload);
  }

  async getHistory(start, end, historyMinTimestamp = 0) {
    const reqPayload = new Uint8Array([
      start & 0xff,
      (start >>> 8) & 0xff,
      end & 0xff,
      (end >>> 8) & 0xff,
    ]);
    const payload = await this.request(CMD.GET_HISTORY, RESP.HISTORY, TIMEOUT_MS.HISTORY, reqPayload);
    return decodeHistoryBatch(payload, historyMinTimestamp);
  }

  async getQi2Status() {
    const payload = await this.request(CMD.GET_QI2_STATUS, RESP.QI2_STATUS, TIMEOUT_MS.COMMAND);
    return decodeQi2Status(payload);
  }

  async setQi2(targetEnabled, protocolChain = ["encrypted", "legacy"], options = {}) {
    if (!protocolChain.length) {
      throw new Error("Qi2.2 toggle is not supported for this model");
    }
    return this.enqueue(async () => {
      const errors = [];
      for (let i = 0; i < protocolChain.length; i += 1) {
        const strategyId = protocolChain[i];
        const strategy = QI2_STRATEGIES[strategyId];
        if (!strategy) continue;
        try {
          const result = await strategy.execute(this, targetEnabled, options);
          return {
            ...result,
            usedFallback: i > 0,
            errors,
          };
        } catch (err) {
          errors.push({ protocol: strategyId, message: err.message });
          this.emitLog("WARN", `Qi2.2 ${strategyId} strategy failed`, null, { message: err.message });
          if (!this.opened) break;
        }
      }
      const summary = errors.map((e) => `${e.protocol}: ${e.message}`).join(" | ");
      throw new Error(summary || "All Qi2.2 protocols failed");
    });
  }

  enqueue(operation) {
    const version = this.sessionVersion;
    const next = this.commandQueue.then(() => {
      if (!this.opened || version !== this.sessionVersion) {
        throw new Error("Device is not connected");
      }
      return operation();
    });
    this.commandQueue = next.catch(() => undefined);
    return next;
  }

  request(command, expectedResp, timeoutMs, payload = new Uint8Array(0)) {
    const frame = buildCommandFrame(command, payload);
    return this.enqueue(() => this.requestRawUnlocked(command, expectedResp, timeoutMs, frame));
  }

  requestUnlocked(command, expectedResp, timeoutMs, payload = new Uint8Array(0)) {
    return this.requestRawUnlocked(command, expectedResp, timeoutMs, buildCommandFrame(command, payload));
  }

  async requestRawUnlocked(command, expectedResp, timeoutMs, frame, label) {
    if (!this.opened) throw new Error("Device is not connected");
    const expectedList = Array.isArray(expectedResp) ? expectedResp : [expectedResp];

    const responsePromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        for (const key of expectedList) this.pending.delete(key);
        reject(new Error(`HID command 0x${command.toString(16).toUpperCase()} timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      const entry = { expectedList, resolve, reject, timer };
      for (const key of expectedList) this.pending.set(key, entry);
    });
    void responsePromise.catch(() => undefined);

    this.emitLog("TX", label || `CMD 0x${command.toString(16).toUpperCase()}`, frame);
    try {
      await this.transport.send(frame);
    } catch (error) {
      const entry = this.pending.get(expectedList[0]);
      if (entry) {
        clearTimeout(entry.timer);
        for (const key of entry.expectedList) this.pending.delete(key);
        entry.reject(error);
      }
      throw error;
    }
    return responsePromise;
  }

  handleInputReport(chunk) {
    if (!this.opened) return;
    const merged = new Uint8Array(this.inputBuffer.length + chunk.length);
    merged.set(this.inputBuffer);
    merged.set(chunk, this.inputBuffer.length);
    const { frames, remaining } = extractFrames(merged);
    this.inputBuffer = remaining.length > 1024 ? new Uint8Array(0) : remaining;

    for (const frame of frames) {
      this.emitLog(
        "RX",
        `RESP 0x${frame.command.toString(16).toUpperCase()}`,
        frame.raw,
        { crcValid: frame.crcValid, length: frame.length },
      );

      const waiter = this.pending.get(frame.command);
      if (!waiter) continue;
      clearTimeout(waiter.timer);
      for (const key of waiter.expectedList) this.pending.delete(key);

      if (!frame.crcValid) {
        waiter.reject(new Error(`CRC-8 mismatch on 0x${frame.command.toString(16).toUpperCase()}`));
      } else {
        const result = frame.payload;
        result.__command = frame.command;
        waiter.resolve(result);
      }
    }
  }

  handleUnexpectedDisconnect() {
    if (!this.opened) return;
    this.opened = false;
    this.sessionVersion += 1;
    this.rejectAll(new Error("Device disconnected"));
    this.callbacks.onDisconnect?.();
  }

  rejectAll(error) {
    const visited = new Set();
    for (const entry of this.pending.values()) {
      if (visited.has(entry)) continue;
      visited.add(entry);
      clearTimeout(entry.timer);
      entry.reject(error);
    }
    this.pending.clear();
  }

  emitLog(direction, label, bytes = null, extra = null) {
    this.callbacks.onLog?.({
      at: new Date().toISOString(),
      direction,
      label,
      hex: bytes ? bytesToHex(bytes, true) : "",
      extra,
    });
  }
}
