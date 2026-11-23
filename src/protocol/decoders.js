import { bytesToHex } from "./codec.js";
import { resolveModelConfig } from "../config/models.js";
import { parseBatteryIdString } from "./cellIdentity.js";
import { HISTORY_FAULT_NAMES, HISTORY_STATE_NAMES } from "./constants.js";

const BEIJING_OFFSET_SECONDS = 8 * 60 * 60;

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

function decodeNullTerminatedAscii(bytes) {
  const zeroIdx = bytes.indexOf(0x00);
  const effective = zeroIdx >= 0 ? bytes.subarray(0, zeroIdx) : bytes;
  let out = "";
  for (let i = 0; i < effective.length; i += 1) {
    const b = effective[i];
    if (b >= 0x20 && b <= 0x7e) out += String.fromCharCode(b);
  }
  return out.trim();
}

export function formatHistoryValue(faultCode, rawVal) {
  if (faultCode === 1 || faultCode === 2) return `${(rawVal / 1000).toFixed(2)} V`;
  if (faultCode === 5 || faultCode === 6) return `${(rawVal / 1000).toFixed(2)} A`;
  if (faultCode === 3 || faultCode === 4) return `${rawVal} °C`;
  if (faultCode === 7) return `${rawVal} mV`;
  return String(rawVal);
}

export function decodeHelloResponse(payload) {
  if (!payload || payload.length < 23) {
    throw new Error(`Hello payload too short: ${payload?.length ?? 0}`);
  }
  const modelId = readUint16LE(payload, 0);
  const snBytes = payload.slice(2, payload.length - 1);
  const asciiSerial = decodeNullTerminatedAscii(snBytes);
  const isNonAsciiSerial = !asciiSerial && snBytes.some((b) => b !== 0x00);
  const serialNumber = asciiSerial || (isNonAsciiSerial ? `HEX: ${bytesToHex(snBytes)}` : "");
  const chargeState = payload[payload.length - 1];
  return {
    modelId,
    snBytes,
    serialNumber,
    isNonAsciiSerial,
    chargeState,
    modelConfig: resolveModelConfig(modelId),
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
  const errorValue = readUint16LE(payload, 7);
  const historyErrorCount = readUint16LE(payload, 9);
  const connByte = payload[11];
  const series = Math.max(1, (connByte >> 4) & 0x0f);
  const parallel = Math.max(1, connByte & 0x0f);
  const cellCount = series * parallel;
  const level = payload[12];
  const temperature = readInt8(payload[13]);
  const voltage = readUint16LE(payload, 14);
  const current = readInt16LE(payload, 16);

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
    series,
    parallel,
    cellCount,
    level,
    temperature,
    voltage,
    current,
  };
}

// 0x12 official layout: status(1B) + N * 5B (tempC:int8, voltageMV:int16LE, currentMA:int16LE), optional 1 trailing byte
export function decodeCellStatus(payload) {
  if (!payload || payload.length < 6) return [];
  const dataLen = (payload.length - 1) % 5 === 0 ? payload.length - 1 : payload.length - 2;
  const count = Math.floor(dataLen / 5);
  const cells = [];
  for (let i = 0; i < count; i += 1) {
    const offset = 1 + i * 5;
    const rawTemp = readInt8(payload[offset]);
    const hasTemp = rawTemp !== -127;
    const voltage = readInt16LE(payload, offset + 1);
    const current = readInt16LE(payload, offset + 3);
    cells.push({
      index: i + 1,
      voltage,
      current,
      hasTemperatureSensor: hasTemp,
      temperature: hasTemp ? rawTemp : null,
    });
  }
  return cells;
}

// 0x13 official layout: status(1B) + N * 8B (ts:u32LE, cellId:u8, faultState:u8, value:u16LE)
export function decodeHistoryBatch(payload, historyMinTimestamp = 0) {
  if (!payload || payload.length < 9) return [];
  const count = Math.floor((payload.length - 1) / 8);
  const records = [];
  for (let i = 0; i < count; i += 1) {
    const offset = 1 + i * 8;
    const rawTs = readUint32LE(payload, offset);
    const timestamp = rawTs >= BEIJING_OFFSET_SECONDS ? rawTs - BEIJING_OFFSET_SECONDS : rawTs;
    const cellIndex = payload[offset + 4];
    const faultState = payload[offset + 5];
    const stateCode = faultState & 0xc0;
    const faultCode = faultState & 0x3f;
    const rawUnsigned = readUint16LE(payload, offset + 6);
    const isSignedTemp = faultCode === 3 || faultCode === 4;
    const value = isSignedTemp && rawUnsigned >= 0x8000 ? rawUnsigned - 0x10000 : rawUnsigned;

    if (historyMinTimestamp > 0 && timestamp < historyMinTimestamp) continue;
    const stateLabel = HISTORY_STATE_NAMES[stateCode] || `状态(0x${stateCode.toString(16)})`;
    const faultLabel = HISTORY_FAULT_NAMES[faultCode] || `异常(${faultCode})`;
    const nationalStandardFault =
      faultCode === 0
        ? "正常"
        : faultCode === 1
          ? `${cellIndex}号电芯过压`
          : faultCode === 3 && HISTORY_STATE_NAMES[stateCode]
            ? `${HISTORY_STATE_NAMES[stateCode]}高温`
            : faultLabel;

    records.push({
      timestamp,
      cellIndex,
      stateCode,
      stateLabel,
      errorType: faultCode,
      faultLabel,
      nationalStandardFault,
      value,
      formattedValue: formatHistoryValue(faultCode, value),
    });
  }
  return records;
}

export function decodeBatteryId(payload) {
  if (!payload || payload.length < 2) return { index: 0, raw: "", parsed: null };
  const hasStatusPrefix = payload.length >= 30;
  const index = hasStatusPrefix ? payload[1] : payload[0];
  const raw = decodeNullTerminatedAscii(payload.slice(hasStatusPrefix ? 2 : 1));
  return { index, raw, parsed: parseBatteryIdString(raw) };
}

// 0x18 official layout: status(1B) + highTemp(int16LE) + lowTemp(int16LE) + cellModel(dynamic ASCII)
export function decodeTempModel(payload) {
  if (!payload || payload.length < 6) {
    return { success: false, lowTemp: null, highTemp: null, batteryModel: "" };
  }
  const statusCode = payload[0];
  const highTemp = readInt16LE(payload, 1);
  const lowTemp = readInt16LE(payload, 3);
  const batteryModel = decodeNullTerminatedAscii(payload.slice(5));
  return { success: statusCode === 0, lowTemp, highTemp, batteryModel };
}

export function decodeQi2Status(payload) {
  if (!payload || payload.length < 2) return { success: false, statusCode: -1, enabled: false };
  return { success: payload[0] === 0, statusCode: payload[0], enabled: payload[1] === 1 };
}

export function decodeQi2WriteResponse(payload) {
  if (!payload || payload.length < 1) return { success: false, statusCode: -1 };
  return { success: payload[0] === 0, statusCode: payload[0] };
}
