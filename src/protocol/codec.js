import { CMD, FRAME_HEAD, MAX_HID_FRAME_SIZE } from "./constants.js";

const HELLO_MAGIC = new TextEncoder().encode("xiaomi-pb");
const BEIJING_OFFSET_SECONDS = 8 * 60 * 60;

const CRC8_TABLE = (() => {
  const table = new Uint8Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let bit = 0; bit < 8; bit += 1) {
      c = c & 0x80 ? ((c << 1) ^ 0x07) & 0xff : (c << 1) & 0xff;
    }
    table[i] = c;
  }
  return table;
})();

export function calculateCrc8(bytes) {
  let crc = 0;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = CRC8_TABLE[crc ^ bytes[i]];
  }
  return crc;
}

export function bytesToHex(bytes, spaced = false) {
  const parts = Array.from(bytes, (b) => b.toString(16).padStart(2, "0").toUpperCase());
  return spaced ? parts.join(" ") : parts.join("");
}

export function buildCommandFrame(command, payload = new Uint8Array(0)) {
  if (payload.length > MAX_HID_FRAME_SIZE - 4) {
    throw new Error(`Payload exceeds max HID frame size: ${payload.length}`);
  }
  const frame = new Uint8Array(4 + payload.length);
  frame[0] = FRAME_HEAD;
  frame[1] = command;
  frame[2] = payload.length;
  frame.set(payload, 3);
  frame[3 + payload.length] = calculateCrc8(frame.subarray(0, 3 + payload.length));
  return frame;
}

export function buildHelloFrame(nowMs = Date.now()) {
  const timestamp = (Math.floor(nowMs / 1000) + BEIJING_OFFSET_SECONDS) >>> 0;
  const payload = new Uint8Array(13);
  new DataView(payload.buffer).setUint32(0, timestamp, true);
  payload.set(HELLO_MAGIC, 4);
  return { frame: buildCommandFrame(CMD.HELLO, payload), timestamp };
}

export function parseFrame(rawBytes) {
  if (rawBytes.length < 4 || rawBytes[0] !== FRAME_HEAD) return null;
  const payloadLength = rawBytes[2];
  const totalLength = 4 + payloadLength;
  if (rawBytes.length < totalLength) return null;
  const payload = rawBytes.slice(3, 3 + payloadLength);
  const checksum = rawBytes[3 + payloadLength];
  const expectedChecksum = calculateCrc8(rawBytes.subarray(0, 3 + payloadLength));
  return {
    head: rawBytes[0],
    command: rawBytes[1],
    length: payloadLength,
    payload,
    checksum,
    expectedChecksum,
    crcValid: checksum === expectedChecksum,
    raw: rawBytes.slice(0, totalLength),
  };
}

export function extractFrames(buffer) {
  const frames = [];
  let offset = 0;
  while (offset < buffer.length) {
    if (buffer[offset] !== FRAME_HEAD) {
      offset += 1;
      continue;
    }
    if (buffer.length - offset < 3) break;
    const totalLength = 4 + buffer[offset + 2];
    if (buffer.length - offset < totalLength) break;
    const parsed = parseFrame(buffer.subarray(offset, offset + totalLength));
    if (parsed) frames.push(parsed);
    offset += totalLength;
  }
  return { frames, remaining: buffer.slice(offset) };
}
