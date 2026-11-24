import { aes128CcmOpen, aes128CcmSeal } from "./aesCcm.js";

const ROOT_KEY_BYTES = new TextEncoder().encode("MiXiaomiQi22Key!");
const QI2_CCM_TAG_LENGTH = 4;
const DIR_HOST_TO_DEVICE = 0x48;
const DIR_DEVICE_TO_HOST = 0x44;

export interface Qi2EncryptInput {
  snBytes: Uint8Array | string;
  timestamp: number;
  health: number;
  cycles: number;
  enabled: boolean;
  command?: number;
  useRawSerialBytes?: boolean;
}

export interface Qi2DecryptInput {
  ciphertext: Uint8Array;
  snBytes: Uint8Array | string;
  timestamp: number;
  command?: number;
  useRawSerialBytes?: boolean;
}

export function normalizeSerialForKey(serial: Uint8Array | string): Uint8Array {
  if (typeof serial === "string") {
    return new TextEncoder().encode(serial.split("\0")[0].trim());
  }
  if (!(serial instanceof Uint8Array)) return new Uint8Array(0);
  const zeroIdx = serial.indexOf(0x00);
  const beforeZero = zeroIdx >= 0 ? serial.subarray(0, zeroIdx) : serial;
  let ascii = "";
  let allAscii = beforeZero.length > 0;
  for (let i = 0; i < beforeZero.length; i += 1) {
    const b = beforeZero[i];
    if (b >= 0x09 && b <= 0x7e) ascii += String.fromCharCode(b);
    else {
      allAscii = false;
      break;
    }
  }
  if (allAscii) {
    const trimmed = ascii.trim();
    if (trimmed.length > 0) return new TextEncoder().encode(trimmed);
  }
  return serial;
}

function buildQi2Nonce(directionByte: number, timestamp: number, command: number): Uint8Array {
  const nonce = new Uint8Array(13);
  nonce[0] = directionByte;
  new DataView(nonce.buffer).setUint32(1, timestamp, false);
  nonce[9] = command & 0xff;
  return nonce;
}

async function deriveSessionKeyBytes(
  snBytes: Uint8Array | string,
  timestamp: number,
  useRawSerialBytes = false,
): Promise<Uint8Array> {
  const keySn = useRawSerialBytes && snBytes instanceof Uint8Array ? snBytes : normalizeSerialForKey(snBytes);
  if (!keySn.length) throw new Error("Empty device serial bytes");
  if (!Number.isInteger(timestamp) || timestamp < 0 || timestamp > 0xffffffff) {
    throw new Error("Invalid Hello timestamp");
  }
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) throw new Error("Web Crypto API is unavailable");

  const material = new Uint8Array(12);
  const tail = keySn.slice(Math.max(0, keySn.length - 8));
  material.set(tail, 8 - tail.length);
  new DataView(material.buffer).setUint32(8, timestamp, false);

  const hmacKey = await subtle.importKey("raw", ROOT_KEY_BYTES, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await subtle.sign("HMAC", hmacKey, material);
  return new Uint8Array(mac).slice(0, 16);
}

export async function buildEncryptedQi2Payload({
  snBytes,
  timestamp,
  health,
  cycles,
  enabled,
  command = 0xe6,
  useRawSerialBytes = false,
}: Qi2EncryptInput): Promise<Uint8Array> {
  if (!Number.isInteger(health) || health < 0 || health > 0xffff) throw new Error("Invalid battery health");
  if (!Number.isInteger(cycles) || cycles < 0 || cycles > 0xffff) throw new Error("Invalid cycle count");
  if (typeof enabled !== "boolean") throw new Error("Invalid target enabled state");

  const key = await deriveSessionKeyBytes(snBytes, timestamp, useRawSerialBytes);
  const nonce = buildQi2Nonce(DIR_HOST_TO_DEVICE, timestamp, command);
  const plaintext = new Uint8Array(5);
  const view = new DataView(plaintext.buffer);
  view.setUint16(0, health, false);
  view.setUint16(2, cycles, false);
  plaintext[4] = enabled ? 1 : 0;

  return aes128CcmSeal({ key, nonce, tagLength: QI2_CCM_TAG_LENGTH }, plaintext);
}

export async function decryptEncryptedQi2Payload({
  ciphertext,
  snBytes,
  timestamp,
  command = 0xe6,
  useRawSerialBytes = false,
}: Qi2DecryptInput): Promise<{ plain: Uint8Array; ok: boolean }> {
  if (!(ciphertext instanceof Uint8Array) || ciphertext.length < QI2_CCM_TAG_LENGTH) {
    return { plain: new Uint8Array(0), ok: false };
  }
  const key = await deriveSessionKeyBytes(snBytes, timestamp, useRawSerialBytes);
  const nonce = buildQi2Nonce(DIR_DEVICE_TO_HOST, timestamp, command);
  const { plaintext, ok } = await aes128CcmOpen({ key, nonce, tagLength: QI2_CCM_TAG_LENGTH }, ciphertext);
  return { plain: plaintext, ok };
}
