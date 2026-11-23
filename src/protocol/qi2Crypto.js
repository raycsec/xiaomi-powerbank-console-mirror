const ROOT_KEY_BYTES = new TextEncoder().encode("MiXiaomiQi22Key!");
const ZERO_IV = new Uint8Array(16);

export function normalizeSerialForKey(serial) {
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

function buildNonce(directionByte, timestamp, command) {
  const nonce = new Uint8Array(13);
  nonce[0] = directionByte;
  new DataView(nonce.buffer).setUint32(1, timestamp, false);
  nonce[9] = command & 0xff;
  return nonce;
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function deriveSessionAesKey(snBytes, timestamp) {
  const keySn = normalizeSerialForKey(snBytes);
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
  return { subtle, aesKey: await subtle.importKey("raw", mac.slice(0, 16), "AES-CBC", false, ["encrypt"]) };
}

async function aesBlock(subtle, aesKey, block) {
  const out = await subtle.encrypt({ name: "AES-CBC", iv: ZERO_IV }, aesKey, block);
  return new Uint8Array(out).slice(0, 16);
}

function makeCtrBlock(nonce, counter) {
  const block = new Uint8Array(16);
  block[0] = 0x01;
  block.set(nonce, 1);
  block[14] = (counter >> 8) & 0xff;
  block[15] = counter & 0xff;
  return block;
}

async function ctrCrypt(subtle, aesKey, nonce, data) {
  const out = new Uint8Array(data.length);
  for (let offset = 0; offset < data.length; offset += 16) {
    const ks = await aesBlock(subtle, aesKey, makeCtrBlock(nonce, Math.floor(offset / 16) + 1));
    const n = Math.min(16, data.length - offset);
    for (let i = 0; i < n; i += 1) out[offset + i] = data[offset + i] ^ ks[i];
  }
  return out;
}

async function computeTag4(subtle, aesKey, nonce, plaintext) {
  const b0 = new Uint8Array(16);
  b0[0] = 0x09;
  b0.set(nonce, 1);
  b0[14] = (plaintext.length >> 8) & 0xff;
  b0[15] = plaintext.length & 0xff;
  let mac = await aesBlock(subtle, aesKey, b0);
  for (let offset = 0; offset < plaintext.length; offset += 16) {
    const block = new Uint8Array(16);
    block.set(plaintext.subarray(offset, offset + Math.min(16, plaintext.length - offset)), 0);
    for (let i = 0; i < 16; i += 1) block[i] ^= mac[i];
    mac = await aesBlock(subtle, aesKey, block);
  }
  const s0 = await aesBlock(subtle, aesKey, makeCtrBlock(nonce, 0));
  const tag = new Uint8Array(4);
  for (let i = 0; i < 4; i += 1) tag[i] = mac[i] ^ s0[i];
  return tag;
}

export async function buildEncryptedQi2Payload({ snBytes, timestamp, health, cycles, enabled, command = 0xe6 }) {
  if (!Number.isInteger(health) || health < 0 || health > 0xffff) throw new Error("Invalid battery health");
  if (!Number.isInteger(cycles) || cycles < 0 || cycles > 0xffff) throw new Error("Invalid cycle count");
  if (typeof enabled !== "boolean") throw new Error("Invalid target enabled state");

  const { subtle, aesKey } = await deriveSessionAesKey(snBytes, timestamp);
  const nonce = buildNonce(0x48, timestamp, command);
  const plaintext = new Uint8Array(5);
  const view = new DataView(plaintext.buffer);
  view.setUint16(0, health, false);
  view.setUint16(2, cycles, false);
  plaintext[4] = enabled ? 1 : 0;

  const cipher = await ctrCrypt(subtle, aesKey, nonce, plaintext);
  const tag = await computeTag4(subtle, aesKey, nonce, plaintext);
  const output = new Uint8Array(cipher.length + 4);
  output.set(cipher, 0);
  output.set(tag, cipher.length);
  return output;
}

export async function decryptEncryptedQi2Payload({ ciphertext, snBytes, timestamp, command = 0xe6 }) {
  if (!(ciphertext instanceof Uint8Array) || ciphertext.length < 4) {
    return { plain: new Uint8Array(0), ok: false };
  }
  const { subtle, aesKey } = await deriveSessionAesKey(snBytes, timestamp);
  const nonce = buildNonce(0x44, timestamp, command);
  const body = ciphertext.subarray(0, ciphertext.length - 4);
  const tag = ciphertext.subarray(ciphertext.length - 4);
  const plain = await ctrCrypt(subtle, aesKey, nonce, body);
  const expectedTag = await computeTag4(subtle, aesKey, nonce, plain);
  return { plain, ok: constantTimeEqual(expectedTag, tag) };
}
