import { CMD, FRAME_HEAD, HID_FRAME_SIZE } from "./constants.js";
import { calculateCrc8 } from "./crc8.js";

const HELLO_MAGIC = new TextEncoder().encode("xiaomi-pb");
const BEIJING_OFFSET_SECONDS = 8 * 60 * 60;

export function bytesToHex(bytes, spaced = false) {
  const parts = Array.from(bytes, (b) => b.toString(16).padStart(2, "0").toUpperCase());
  return spaced ? parts.join(" ") : parts.join("");
}

export function buildCommandFrame(command, payload = new Uint8Array(0)) {
  if (payload.length > HID_FRAME_SIZE - 4) {
    throw new Error(`Payload exceeds max HID frame size: ${payload.length}`);
  }
  const body = new Uint8Array(3 + payload.length);
  body[0] = FRAME_HEAD;
  body[1] = command;
  body[2] = payload.length;
  body.set(payload, 3);

  const frame = new Uint8Array(HID_FRAME_SIZE);
  frame.set(body);
  frame[body.length] = calculateCrc8(body);
  return frame;
}

export function buildHelloFrame(nowMs = Date.now()) {
  const frame = new Uint8Array(HID_FRAME_SIZE);
  const timestamp = (Math.floor(nowMs / 1000) + BEIJING_OFFSET_SECONDS) >>> 0;
  frame[0] = FRAME_HEAD;
  frame[1] = CMD.HELLO;
  frame[2] = 13;
  new DataView(frame.buffer).setUint32(3, timestamp, true);
  frame.set(HELLO_MAGIC, 7);
  frame[16] = calculateCrc8(frame.subarray(0, 16));
  return { frame, timestamp };
}

export function parseFrame(rawBytes) {
  if (rawBytes.length < 4 || rawBytes[0] !== FRAME_HEAD) {
    return null;
  }
  const payloadLength = rawBytes[2];
  const totalLength = 3 + payloadLength + 1;
  if (rawBytes.length < totalLength) {
    return null;
  }
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
    const payloadLength = buffer[offset + 2];
    const totalLength = 3 + payloadLength + 1;
    if (buffer.length - offset < totalLength) break;

    const parsed = parseFrame(buffer.subarray(offset, offset + totalLength));
    if (parsed) frames.push(parsed);
    offset += totalLength;
  }

  return { frames, remaining: buffer.slice(offset) };
}
