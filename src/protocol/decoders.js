import { bytesToHex } from "./frames.js";
import { resolveModelConfig } from "../config/models.js";
import { parseBatteryIdString } from "./batteryId.js";

function readInt8(byte) {
  return byte > 127 ? byte - 256 : byte;
}

function readInt16LE(bytes, offset) {
  const value = bytes[offset] | (bytes[offset + 1] << 8);
  return value > 0x7fff ? value - 0x10000 : value;
}

function readUint16LE(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUint32LE(bytes, offset) {
  return (
    (bytes[offset] |
      (bytes[offset + 1] << 8) |
      (bytes[offset + 2] << 16) |
      (bytes[offset + 3] << 24)) >>>
    0
  );
}

export function decodeHelloResponse(payload) {
  if (!payload || payload.length < 23) {
    throw new Error(`Hello payload too short: ${payload?.length ?? 0}`);
  }
  const modelId = readUint16LE(payload, 0);
  const snBytes = payload.slice(2, 22);
  const asciiSerial = Array.from(snBytes)
    .filter((b) => b >= 0x20 && b <= 0x7e)
    .map((b) => String.fromCharCode(b))
    .join("")
    .trim();
  const isNonAsciiSerial = !asciiSerial && snBytes.some((b) => b !== 0x00);
  const serialNumber = asciiSerial || (isNonAsciiSerial ? `HEX: ${bytesToHex(snBytes)}` : "");
  const chargeStateByte = payload[payload.length - 1];
  const modelConfig = resolveModelConfig(modelId);

  return {
    modelId,
    snBytes,
    serialNumber,
    isNonAsciiSerial,
    chargeState: chargeStateByte,
    modelConfig,
  };
}

export function decodeBatteryInfo(payload) {
  if (!payload || payload.length < 18) {
    throw new Error(`Battery info payload too short: ${payload?.length ?? 0}`);
  }
  const statusCode = payload[0];
  const activateStatus = payload[1];
  const cycleCount = readUint16LE(payload, 2);
  const health = readUint16LE(payload, 4);
  const statusByte = payload[6];
  const faultType = statusByte & 0x3f;
  const chargeState = (statusByte >> 6) & 0x03;
  const errorValue = payload[7];
  const historyErrorCount = readUint16LE(payload, 8);
  const cellCount = payload[10];
  const level = payload[11];
  const temperature = readInt8(payload[12]);
  const voltage = readUint16LE(payload, 13);
  const current = readInt16LE(payload, 15);

  return {
    statusCode,
    success: statusCode === 0,
    activateStatus,
    cycleCount,
    health,
    chargeState,
    faultType,
    faultRaw: statusByte,
    errorValue,
    historyErrorCount,
    cellCount,
    level,
    temperature,
    voltage,
    current,
  };
}

export function decodeCellStatus(payload) {
  if (!payload || payload.length < 2) return [];
  const count = payload[1];
  const cells = [];
  let offset = 2;

  for (let idx = 0; idx < count && offset + 3 <= payload.length; idx += 1) {
    const index = payload[offset];
    const voltage = readUint16LE(payload, offset + 1);
    const hasTemp = offset + 4 <= payload.length && payload[offset + 3] !== 0xff;
    const temperature = hasTemp ? readInt8(payload[offset + 3]) : null;
    cells.push({ index, voltage, hasTemperatureSensor: hasTemp, temperature });
    offset += 4;
  }
  return cells;
}

export function decodeHistoryBatch(payload, historyMinTimestamp = 0) {
  if (!payload || payload.length < 2) return [];
  const count = payload[1];
  const records = [];
  let offset = 2;

  for (let i = 0; i < count && offset + 8 <= payload.length; i += 1) {
    const timestamp = readUint32LE(payload, offset);
    const errorType = payload[offset + 4];
    const cellIndex = payload[offset + 5];
    const rawValue = readInt16LE(payload, offset + 6);
    offset += 8;
    if (historyMinTimestamp > 0 && timestamp < historyMinTimestamp) continue;
    records.push({ timestamp, errorType, cellIndex, value: rawValue });
  }
  return records;
}

export function decodeBatteryId(payload) {
  if (!payload || payload.length < 2) return { index: 0, raw: "", parsed: null };
  const index = payload[0];
  const raw = Array.from(payload.slice(1))
    .filter((b) => b >= 0x20 && b <= 0x7e)
    .map((b) => String.fromCharCode(b))
    .join("")
    .trim();
  return {
    index,
    raw,
    parsed: parseBatteryIdString(raw),
  };
}

export function decodeTempModel(payload) {
  if (!payload || payload.length < 3) {
    return { success: false, lowTemp: null, highTemp: null, batteryModel: "" };
  }
  const statusCode = payload[0];
  const lowTemp = readInt8(payload[1]);
  const highTemp = readInt8(payload[2]);
  const batteryModel = Array.from(payload.slice(3))
    .filter((b) => b >= 0x20 && b <= 0x7e)
    .map((b) => String.fromCharCode(b))
    .join("")
    .trim();

  return {
    success: statusCode === 0,
    lowTemp,
    highTemp,
    batteryModel,
  };
}

export function decodeQi2Status(payload) {
  if (!payload || payload.length < 2) {
    return { success: false, statusCode: -1, enabled: false };
  }
  return {
    success: payload[0] === 0,
    statusCode: payload[0],
    enabled: payload[1] === 1,
  };
}

export function decodeQi2WriteResponse(payload) {
  if (!payload || payload.length < 1) {
    return { success: false, statusCode: -1 };
  }
  return {
    success: payload[0] === 0,
    statusCode: payload[0],
  };
}
