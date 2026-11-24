export interface AesCcmParams {
  key: Uint8Array;
  nonce: Uint8Array;
  tagLength: number;
}

export interface AesCcmOpenResult {
  plaintext: Uint8Array;
  ok: boolean;
}

export interface AesCcmBackend {
  readonly name: string;
  seal(params: AesCcmParams, plaintext: Uint8Array): Promise<Uint8Array>;
  open(params: AesCcmParams, ciphertextAndTag: Uint8Array): Promise<AesCcmOpenResult>;
}

const ZERO_IV = new Uint8Array(16);

function assertCcmParams(params: AesCcmParams): { L: number; M: number } {
  const { key, nonce, tagLength } = params;
  if (!(key instanceof Uint8Array) || key.length !== 16) {
    throw new Error("AES-128-CCM requires a 16-byte key");
  }
  if (!(nonce instanceof Uint8Array) || nonce.length < 7 || nonce.length > 13) {
    throw new Error("RFC 3610 CCM nonce length must be between 7 and 13 bytes");
  }
  if (!Number.isInteger(tagLength) || tagLength < 4 || tagLength > 16 || tagLength % 2 !== 0) {
    throw new Error("RFC 3610 CCM tagLength must be an even integer in [4, 16]");
  }
  return { L: 15 - nonce.length, M: tagLength };
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

function encodeLengthBE(target: Uint8Array, offset: number, width: number, value: number): void {
  let v = value;
  for (let i = width - 1; i >= 0; i -= 1) {
    target[offset + i] = v & 0xff;
    v = Math.floor(v / 256);
  }
}

function formatCounterBlock(nonce: Uint8Array, L: number, counter: number): Uint8Array {
  const block = new Uint8Array(16);
  block[0] = (L - 1) & 0x07;
  block.set(nonce, 1);
  encodeLengthBE(block, 1 + nonce.length, L, counter);
  return block;
}

function formatB0Block(nonce: Uint8Array, L: number, M: number, msgLen: number): Uint8Array {
  const block = new Uint8Array(16);
  block[0] = ((((M - 2) / 2) & 0x07) << 3) | ((L - 1) & 0x07);
  block.set(nonce, 1);
  encodeLengthBE(block, 1 + nonce.length, L, msgLen);
  return block;
}

async function webCryptoAesBlock(subtle: SubtleCrypto, aesKey: CryptoKey, block: Uint8Array): Promise<Uint8Array> {
  const out = await subtle.encrypt({ name: "AES-CBC", iv: ZERO_IV as BufferSource }, aesKey, block as BufferSource);
  return new Uint8Array(out).subarray(0, 16);
}

async function webCryptoCtrCrypt(
  subtle: SubtleCrypto,
  aesKey: CryptoKey,
  nonce: Uint8Array,
  L: number,
  data: Uint8Array,
): Promise<Uint8Array> {
  const out = new Uint8Array(data.length);
  for (let offset = 0; offset < data.length; offset += 16) {
    const ks = await webCryptoAesBlock(subtle, aesKey, formatCounterBlock(nonce, L, Math.floor(offset / 16) + 1));
    const n = Math.min(16, data.length - offset);
    for (let i = 0; i < n; i += 1) out[offset + i] = data[offset + i] ^ ks[i];
  }
  return out;
}

async function webCryptoComputeTag(
  subtle: SubtleCrypto,
  aesKey: CryptoKey,
  nonce: Uint8Array,
  L: number,
  M: number,
  plaintext: Uint8Array,
): Promise<Uint8Array> {
  let mac = await webCryptoAesBlock(subtle, aesKey, formatB0Block(nonce, L, M, plaintext.length));
  for (let offset = 0; offset < plaintext.length; offset += 16) {
    const block = new Uint8Array(16);
    block.set(plaintext.subarray(offset, offset + Math.min(16, plaintext.length - offset)), 0);
    for (let i = 0; i < 16; i += 1) block[i] ^= mac[i];
    mac = await webCryptoAesBlock(subtle, aesKey, block);
  }
  const s0 = await webCryptoAesBlock(subtle, aesKey, formatCounterBlock(nonce, L, 0));
  const tag = new Uint8Array(M);
  for (let i = 0; i < M; i += 1) tag[i] = mac[i] ^ s0[i];
  return tag;
}

export const webCryptoAesCcmBackend: AesCcmBackend = {
  name: "webcrypto-rfc3610",
  async seal(params: AesCcmParams, plaintext: Uint8Array): Promise<Uint8Array> {
    const { L, M } = assertCcmParams(params);
    const subtle = globalThis.crypto?.subtle;
    if (!subtle) throw new Error("Web Crypto API is unavailable");
    const aesKey = await subtle.importKey("raw", params.key as BufferSource, "AES-CBC", false, ["encrypt"]);
    const cipher = await webCryptoCtrCrypt(subtle, aesKey, params.nonce, L, plaintext);
    const tag = await webCryptoComputeTag(subtle, aesKey, params.nonce, L, M, plaintext);
    const output = new Uint8Array(cipher.length + M);
    output.set(cipher, 0);
    output.set(tag, cipher.length);
    return output;
  },
  async open(params: AesCcmParams, ciphertextAndTag: Uint8Array): Promise<AesCcmOpenResult> {
    const { L, M } = assertCcmParams(params);
    if (!(ciphertextAndTag instanceof Uint8Array) || ciphertextAndTag.length < M) {
      return { plaintext: new Uint8Array(0), ok: false };
    }
    const subtle = globalThis.crypto?.subtle;
    if (!subtle) throw new Error("Web Crypto API is unavailable");
    const aesKey = await subtle.importKey("raw", params.key as BufferSource, "AES-CBC", false, ["encrypt"]);
    const body = ciphertextAndTag.subarray(0, ciphertextAndTag.length - M);
    const tag = ciphertextAndTag.subarray(ciphertextAndTag.length - M);
    const plaintext = await webCryptoCtrCrypt(subtle, aesKey, params.nonce, L, body);
    const expectedTag = await webCryptoComputeTag(subtle, aesKey, params.nonce, L, M, plaintext);
    return { plaintext, ok: constantTimeEqual(expectedTag, tag) };
  },
};

interface NodeCcmCipherLike {
  update(data: Uint8Array): Uint8Array;
  final(): Uint8Array;
  getAuthTag(): Uint8Array;
}

interface NodeCcmDecipherLike {
  setAuthTag(tag: Uint8Array): void;
  update(data: Uint8Array): Uint8Array;
  final(): Uint8Array;
}

interface NodeCryptoLike {
  createCipheriv(
    algorithm: string,
    key: Uint8Array,
    iv: Uint8Array,
    options: { authTagLength: number },
  ): NodeCcmCipherLike;
  createDecipheriv(
    algorithm: string,
    key: Uint8Array,
    iv: Uint8Array,
    options: { authTagLength: number },
  ): NodeCcmDecipherLike;
}

function concatBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

let cachedNodeCrypto: NodeCryptoLike | null | undefined;

async function getNodeCrypto(): Promise<NodeCryptoLike | null> {
  if (cachedNodeCrypto !== undefined) return cachedNodeCrypto;
  const g = globalThis as unknown as { process?: { versions?: { node?: string } } };
  const isNode = typeof g.process !== "undefined" && Boolean(g.process.versions?.node);
  if (!isNode) {
    cachedNodeCrypto = null;
    return null;
  }
  try {
    const specifier = "node:" + "crypto";
    cachedNodeCrypto = (await import(/* @vite-ignore */ specifier)) as unknown as NodeCryptoLike;
  } catch {
    cachedNodeCrypto = null;
  }
  return cachedNodeCrypto;
}

export const nodeOpenSslAesCcmBackend: AesCcmBackend = {
  name: "node-openssl-ccm",
  async seal(params: AesCcmParams, plaintext: Uint8Array): Promise<Uint8Array> {
    const { M } = assertCcmParams(params);
    const nc = await getNodeCrypto();
    if (!nc) throw new Error("Node OpenSSL crypto backend is unavailable");
    const cipher = nc.createCipheriv("aes-128-ccm", params.key, params.nonce, {
      authTagLength: M,
    });
    const ct = concatBytes(new Uint8Array(cipher.update(plaintext)), new Uint8Array(cipher.final()));
    const tag = new Uint8Array(cipher.getAuthTag());
    return concatBytes(ct, tag);
  },
  async open(params: AesCcmParams, ciphertextAndTag: Uint8Array): Promise<AesCcmOpenResult> {
    const { M } = assertCcmParams(params);
    if (!(ciphertextAndTag instanceof Uint8Array) || ciphertextAndTag.length < M) {
      return { plaintext: new Uint8Array(0), ok: false };
    }
    const nc = await getNodeCrypto();
    if (!nc) throw new Error("Node OpenSSL crypto backend is unavailable");
    const body = ciphertextAndTag.subarray(0, ciphertextAndTag.length - M);
    const tag = ciphertextAndTag.subarray(ciphertextAndTag.length - M);
    try {
      const decipher = nc.createDecipheriv("aes-128-ccm", params.key, params.nonce, {
        authTagLength: M,
      });
      decipher.setAuthTag(tag);
      const pt = concatBytes(new Uint8Array(decipher.update(body)), new Uint8Array(decipher.final()));
      return { plaintext: pt, ok: true };
    } catch {
      return { plaintext: new Uint8Array(0), ok: false };
    }
  },
};

let overrideBackend: AesCcmBackend | null = null;

export function setAesCcmBackend(backend: AesCcmBackend | null): void {
  overrideBackend = backend;
}

export async function getActiveAesCcmBackend(): Promise<AesCcmBackend> {
  if (overrideBackend) return overrideBackend;
  const nc = await getNodeCrypto();
  return nc ? nodeOpenSslAesCcmBackend : webCryptoAesCcmBackend;
}

export async function aes128CcmSeal(params: AesCcmParams, plaintext: Uint8Array): Promise<Uint8Array> {
  const backend = await getActiveAesCcmBackend();
  return backend.seal(params, plaintext);
}

export async function aes128CcmOpen(params: AesCcmParams, ciphertextAndTag: Uint8Array): Promise<AesCcmOpenResult> {
  const backend = await getActiveAesCcmBackend();
  return backend.open(params, ciphertextAndTag);
}
