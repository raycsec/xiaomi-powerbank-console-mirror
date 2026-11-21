const HEAD = 165;
const FRAME_SIZE = 32;
const CMD = { HELLO: 0x10, BATT: 0x01, QI2_GET: 0x07, QI2_SET: 0x06, ENC: 0xE6, R_HELLO: 0x10, R_BATT: 0x11, R_QI2_GET: 0x17, R_ENC: 0xF6 };
const MODEL_NAMES = {
  9: "WPB1025S",
  16: "WPB1026S",
  10: "WPB0525S",
  11: "WPB1007ZX",
  12: "WPB1025",
};

const logEl = document.getElementById("qt-log");
const statusEl = document.getElementById("qt-status");
const btn = document.getElementById("qt-run");
const entries = [];
let enabled = true;

function hex(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

function push(kind, label, bytes, extra) {
  if (!enabled) return;
  const row = {
    t: new Date().toISOString(),
    kind,
    label,
    hex: bytes ? hex(bytes) : "",
    extra: extra || null,
  };
  entries.push(row);
  if (entries.length > 300) entries.splice(0, entries.length - 300);
  if (logEl) {
    const extraText = row.extra ? " " + JSON.stringify(row.extra) : "";
    logEl.textContent += "#" + entries.length + " " + row.t + " " + row.kind + " " + row.label + extraText + "\n  " + row.hex + "\n";
    logEl.scrollTop = logEl.scrollHeight;
  }
}

function setStatus(text, color) {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.style.color = color || "#4b5563";
}

function crc8(bytes) {
  let c = 0;
  for (const b of bytes) {
    c ^= b;
    for (let i = 0; i < 8; i++) {
      c = c & 0x80 ? ((c << 1) ^ 0x07) & 0xff : (c << 1) & 0xff;
    }
  }
  return c;
}

function buildFrame(cmd, payload) {
  const body = new Uint8Array([HEAD, cmd, payload.length, ...payload]);
  const out = new Uint8Array(body.length + 1);
  out.set(body, 0);
  out[body.length] = crc8(body);
  return out;
}

function buildHello() {
  const frame = new Uint8Array(FRAME_SIZE);
  frame[0] = HEAD;
  frame[1] = CMD.HELLO;
  frame[2] = 13;
  const ts = Math.floor(Date.now() / 1000) + 28800;
  frame[3] = ts & 0xff;
  frame[4] = (ts >> 8) & 0xff;
  frame[5] = (ts >> 16) & 0xff;
  frame[6] = (ts >> 24) & 0xff;
  frame.set(new TextEncoder().encode("xiaomi-pb"), 7);
  frame[16] = crc8(frame.subarray(0, 16));
  return frame;
}

function padFrame(bytes) {
  const frame = new Uint8Array(FRAME_SIZE);
  frame.set(bytes.subarray(0, FRAME_SIZE));
  return frame;
}

function parseFrame(bytes) {
  if (bytes.length < 4 || bytes[0] !== HEAD) return null;
  const len = bytes[2];
  if (bytes.length < len + 4) return { error: "length mismatch", len };
  const payload = bytes.subarray(3, 3 + len);
  const crc = bytes[3 + len];
  const calc = crc8(bytes.subarray(0, 3 + len));
  return {
    command: "0x" + bytes[1].toString(16).padStart(2, "0").toUpperCase(),
    commandId: bytes[1],
    payload,
    payloadHex: Array.from(payload).map((b) => b.toString(16).padStart(2, "0").toUpperCase()),
    crc,
    crcOk: crc === calc,
  };
}

async function ccm(snBytes, timestamp, health, cycles, target) {
  const material = new Uint8Array(12);
  const tail = snBytes.slice(Math.max(0, snBytes.length - 8));
  material.set(tail, 8 - tail.length);
  new DataView(material.buffer).setUint32(8, timestamp, false);
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode("MiXiaomiQi22Key!"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, material);
  const aesKey = await crypto.subtle.importKey("raw", mac.slice(0, 16), "AES-CBC", false, ["encrypt"]);
  const nonce = new Uint8Array(13);
  nonce[0] = 0x48;
  new DataView(nonce.buffer).setUint32(1, timestamp, false);
  nonce[9] = 0xe6;
  const plain = new Uint8Array(5);
  const pv = new DataView(plain.buffer);
  pv.setUint16(0, health, false);
  pv.setUint16(2, cycles, false);
  plain[4] = target ? 1 : 0;
  const enc = async (input) => new Uint8Array(await crypto.subtle.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, aesKey, input)).slice(0, 16);
  const a = new Uint8Array(16);
  a[0] = 9;
  a.set(nonce, 1);
  a[15] = plain.length;
  const s0 = await enc(a);
  for (let i = 0; i < plain.length; i++) s0[i] ^= plain[i];
  const s1 = await enc(s0);
  const b = new Uint8Array(16);
  b[0] = 1;
  b.set(nonce, 1);
  const t0 = await enc(b);
  b[15] = 1;
  const t1 = await enc(b);
  const tag = new Uint8Array(9);
  for (let i = 0; i < 5; i++) tag[i] = plain[i] ^ t1[i];
  for (let i = 0; i < 4; i++) tag[5 + i] = s1[i] ^ t0[i];
  return tag;
}

function sha16(bytes) {
  return crypto.subtle.digest("SHA-256", bytes).then((buf) =>
    Array.from(new Uint8Array(buf))
      .slice(0, 16)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
  );
}

async function run() {
  const device = (await navigator.hid.requestDevice({ filters: [{ vendorId: 10007 }, { vendorId: 6790 }] }))[0];
  if (!device) {
    setStatus("未选择设备", "#b45309");
    return;
  }
  await device.open();
  push("INFO", "device", null, { productName: device.productName, vendorId: device.vendorId, productId: device.productId });
  const waiters = [];
  const onReport = (event) => {
    const bytes = new Uint8Array(event.data.buffer);
    const parsed = parseFrame(bytes);
    push("RX", parsed && !parsed.error ? parsed.command : "raw", bytes, {
      length: bytes.length,
      payloadHex: parsed && parsed.payloadHex,
      crc: parsed && parsed.crc,
      crcOk: parsed && parsed.crcOk,
      parseError: parsed && parsed.error,
    });
    for (let i = 0; i < waiters.length; i++) {
      if (!parsed || parsed.commandId !== waiters[i].command) continue;
      const w = waiters.splice(i, 1)[0];
      clearTimeout(w.timer);
      w.resolve(parsed);
      return;
    }
  };
  device.addEventListener("inputreport", onReport);
  const send = async (frame, label) => {
    push("TX", label, frame, { length: frame.length });
    await device.sendReport(0, padFrame(frame));
  };
  const wait = (command, ms) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const index = waiters.findIndex((w) => w.timer === timer);
        if (index >= 0) waiters.splice(index, 1);
        reject(new Error("等待响应超时 " + command));
      }, ms || 4000);
      waiters.push({ command, resolve, reject, timer });
    });

  try {
    setStatus("正在握手…", "#2563eb");
    const helloFrame = buildHello();
    const helloWait = wait(CMD.HELLO, 2500);
    await send(helloFrame, "Hello");
    const hello = await helloWait;
    const helloPayload = hello.payload;
    const modelDec = helloPayload[0] | (helloPayload[1] << 8);
    const snBytes = new Uint8Array(helloPayload.subarray(2, 22));
    const modelName = MODEL_NAMES[modelDec] || "ID_" + modelDec;
    push("INFO", "hello", null, { modelDec, modelName, snLen: snBytes.length, snHex: hex(snBytes) });

    const ts = new DataView(helloFrame.buffer).getUint32(3, true);
    push("INFO", "timestamp", null, { ts, tsHex: ts.toString(16) });

    const statusWait = wait(CMD.R_QI2_GET, 3000);
    await send(buildFrame(CMD.QI2_GET, []), "查询 QI2 状态");
    const status = await statusWait;
    const before = { statusCode: status.payload[0], isEnabled: status.payload[1] === 1 };
    push("INFO", "状态查询", null, before);
    if (before.statusCode !== 0) throw new Error("状态查询返回非 0：" + before.statusCode);

    const battWait = wait(CMD.R_BATT, 3500);
    await send(buildFrame(CMD.BATT, []), "读取电池信息");
    const batt = await battWait;
    const bp = batt.payload;
    const health = (bp[5] << 8) | bp[4];
    const cycles = (bp[3] << 8) | bp[2];
    const fault = bp[6] & 63;
    const chgState = (bp[6] >> 6) & 3;
    push("INFO", "电池信息", null, { health, cycles, chgState, fault, faultRaw: bp[6], level: bp[11] });
    if (fault !== 0) throw new Error("设备当前存在故障（代码 " + fault + "），已停止写入");

    const tag = await ccm(snBytes, ts, health, cycles, true);
    const writeWait = wait(CMD.R_ENC, 6000);
    await send(buildFrame(CMD.ENC, Array.from(tag)), "设置 QI2（加密）");
    const writeRes = await writeWait;
    const writeOk = writeRes.payload[0] === 0;
    push("INFO", "写入结果", null, { status: writeRes.payload[0], ok: writeOk });

    const readWait = wait(CMD.R_QI2_GET, 3000);
    await send(buildFrame(CMD.QI2_GET, []), "回读 QI2 状态");
    const after = await readWait;
    const afterState = { statusCode: after.payload[0], isEnabled: after.payload[1] === 1 };
    push("INFO", "回读状态", null, afterState);
    const ok = writeOk && afterState.statusCode === 0 && afterState.isEnabled === true;

    const snHash = await sha16(snBytes);
    fetch("/api/qi2-report", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        model: modelName.toUpperCase(),
        snHash,
        action: "on",
        ok,
        detail: ok ? "trial-success" : "trial-readback-mismatch",
        info: { protocol: "encrypted-trial", modelDec, health, cycles, chgState, fault, writeStatus: writeRes.payload[0], readback: afterState.isEnabled },
        devLogs: entries,
      }),
    }).catch(() => {});

    setStatus(ok ? "尝试成功：已开启 QI 2.2" : "尝试完成但回读不一致", ok ? "#15803D" : "#b45309");
  } catch (err) {
    push("ERROR", "exception", null, { message: String((err && err.message) || err) });
    setStatus("尝试失败：" + String((err && err.message) || err), "#dc2626");
  } finally {
    device.removeEventListener("inputreport", onReport);
    try {
      await device.close();
    } catch (e) {}
  }
}

if (btn) {
  btn.addEventListener("click", async (event) => {
    if (event && (!event.isTrusted || event.clientX === 0 || event.clientY === 0)) return;
    if (btn.disabled) return;
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = "正在尝试…";
    try {
      await run();
    } catch (err) {
      setStatus("尝试失败：" + String((err && err.message) || err), "#dc2626");
    }
    btn.disabled = false;
    btn.textContent = original;
  });
}