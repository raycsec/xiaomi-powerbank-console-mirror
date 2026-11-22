const ROOT_KEY_BYTES = new TextEncoder().encode("MiXiaomiQi22Key!");

function normalizeSerialBytes(serial) {
  if (serial instanceof Uint8Array) return serial;
  if (typeof serial === "string") return new TextEncoder().encode(serial);
  return new Uint8Array(0);
}

export async function buildEncryptedQi2Payload({ snBytes, timestamp, health, cycles, enabled }) {
  const rawSn = normalizeSerialBytes(snBytes);
  if (!rawSn.length) throw new Error("Empty device serial bytes");
  if (!Number.isInteger(timestamp) || timestamp < 0 || timestamp > 0xffffffff) {
    throw new Error("Invalid Hello timestamp");
  }
  if (!Number.isInteger(health) || health < 0 || health > 100) {
    throw new Error("Invalid battery health");
  }
  if (!Number.isInteger(cycles) || cycles < 0 || cycles > 0xffff) {
    throw new Error("Invalid cycle count");
  }
  if (typeof enabled !== "boolean") {
    throw new Error("Invalid target enabled state");
  }

  const subtle = globalThis.crypto?.subtle;
  if (!subtle) throw new Error("Web Crypto API is unavailable");

  const material = new Uint8Array(12);
  const tail = rawSn.slice(Math.max(0, rawSn.length - 8));
  material.set(tail, 8 - tail.length);
  new DataView(material.buffer).setUint32(8, timestamp, false);

  const hmacKey = await subtle.importKey(
    "raw",
    ROOT_KEY_BYTES,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await subtle.sign("HMAC", hmacKey, material);
  const aesKey = await subtle.importKey("raw", mac.slice(0, 16), "AES-CBC", false, ["encrypt"]);

  const nonce = new Uint8Array(13);
  nonce[0] = 0x48;
  new DataView(nonce.buffer).setUint32(1, timestamp, false);
  nonce[9] = 0xe6;

  const plaintext = new Uint8Array(5);
  const plainView = new DataView(plaintext.buffer);
  plainView.setUint16(0, health, false);
  plainView.setUint16(2, cycles, false);
  plaintext[4] = enabled ? 1 : 0;

  const aesEncryptBlock = async (block) =>
    new Uint8Array(
      await subtle.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, aesKey, block),
    ).slice(0, 16);

  const b0 = new Uint8Array(16);
  b0[0] = 0x09; // flags: no AAD, t=4 -> (4-2)/2=1 -> 0x08, q=2 -> q-1=1 -> 0x01
  b0.set(nonce, 1);
  b0[15] = plaintext.length;

  const macInput = await aesEncryptBlock(b0);
  for (let i = 0; i < plaintext.length; i += 1) macInput[i] ^= plaintext[i];
  const cbcMac = await aesEncryptBlock(macInput);

  const ctr = new Uint8Array(16);
  ctr[0] = 0x01; // q - 1 = 1
  ctr.set(nonce, 1);
  const s0 = await aesEncryptBlock(ctr);
  ctr[15] = 0x01;
  const s1 = await aesEncryptBlock(ctr);

  const output = new Uint8Array(9);
  for (let i = 0; i < 5; i += 1) output[i] = plaintext[i] ^ s1[i];
  for (let i = 0; i < 4; i += 1) output[5 + i] = cbcMac[i] ^ s0[i];
  return output;
}
