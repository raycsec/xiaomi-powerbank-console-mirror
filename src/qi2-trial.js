const APP_VERSION = window.__MIECO_APP_VERSION || "v30";
const HEAD = 165;
const FRAME_SIZE = 32;
const CMD = { HELLO: 0x00, BATT: 0x01, QI2_GET: 0x07, QI2_SET: 0x06, ENC: 0xE6, R_HELLO: 0x10, R_BATT: 0x11, R_QI2_GET: 0x17, R_QI2_SET: 0x16, R_ENC: 0xF6, ECHO: 0xFE };
const MODEL_NAMES = { 9: "WPB1025S", 19: "WPB1025S", 16: "WPB1026S", 10: "WPB0525S", 11: "WPB1007ZX", 12: "WPB1025" };

const logEl = document.getElementById("qt-log");
const statusEl = document.getElementById("qt-status");
const entries = [];
let busy = false;

function hex(bytes) {
  return Array.from(bytes || [])
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

function push(kind, label, bytes, extra) {
  const row = { t: new Date().toISOString(), kind, label, hex: bytes ? hex(bytes) : "", extra: extra || null };
  entries.push(row);
  if (entries.length > 400) entries.splice(0, entries.length - 400);
  if (logEl) {
    logEl.textContent += "#" + entries.length + " " + row.t + " " + kind + " " + label + (row.extra ? " " + JSON.stringify(row.extra) : "") + "\n  " + row.hex + "\n";
    logEl.scrollTop = logEl.scrollHeight;
  }
  try {
    console.log("[QI2-TRIAL] " + kind + " " + label + (row.extra ? " " + JSON.stringify(row.extra) : "") + "\n" + row.hex);
  } catch (e) {}
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
    for (let i = 0; i < 8; i++) c = c & 0x80 ? ((c << 1) ^ 0x07) & 0xff : (c << 1) & 0xff;
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
  frame[6] = (ts >>> 24) & 0xff;
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
  return {
    command: "0x" + bytes[1].toString(16).padStart(2, "0").toUpperCase(),
    commandId: bytes[1],
    payload,
    payloadHex: Array.from(payload).map((b) => b.toString(16).padStart(2, "0").toUpperCase()),
    crc: bytes[3 + len],
    crcOk: bytes[3 + len] === crc8(bytes.subarray(0, 3 + len)),
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

async function sha16(bytes) {
  const buf = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(buf)).slice(0, 16).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function run(target) {
  const picked = (await navigator.hid.requestDevice({ filters: [{ vendorId: 10007 }, { vendorId: 6790 }] }))[0];
  if (!picked) {
    setStatus("未选择设备", "#b45309");
    return;
  }
  setStatus("正在握手…", "#2563eb");
  await picked.open();
  push("INFO", "device", null, { productName: picked.productName, vendorId: picked.vendorId, productId: picked.productId, target });
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
  picked.addEventListener("inputreport", onReport);
  const send = async (frame, label) => {
    push("TX", label, frame, { length: frame.length });
    await picked.sendReport(0, padFrame(frame));
  };
  const wait = (command, ms) =>
    new Promise((resolve) => {
      const timer = setTimeout(() => {
        const index = waiters.findIndex((w) => w.timer === timer);
        if (index >= 0) waiters.splice(index, 1);
        resolve(null);
      }, ms || 4000);
      waiters.push({ command, resolve, timer });
    });
  const queryStatus = async () => {
    const w = wait(CMD.R_QI2_GET, 3000);
    await send(buildFrame(CMD.QI2_GET, []), "查询 QI2 状态");
    const res = await w;
    if (!res) return null;
    return { statusCode: res.payload[0], isEnabled: res.payload[1] === 1 };
  };
  const querySettled = async (target) => {
    let last = null;
    for (let i = 0; i < 6; i++) {
      if (i) await new Promise((r) => setTimeout(r, 700));
      last = await queryStatus();
      push("INFO", "回读尝试 " + (i + 1), null, last || { note: "无响应" });
      if (last && last.statusCode === 0 && last.isEnabled === target) return last;
    }
    return last;
  };

  let modelName = "GENERIC";
  try {
    const helloFrame = buildHello();
    const helloWait = wait(CMD.R_HELLO, 2500);
    await send(helloFrame, "Hello");
    const hello = await helloWait;
    const ts = new DataView(helloFrame.buffer).getUint32(3, true);
    push("INFO", "timestamp", null, { ts, tsHex: ts.toString(16) });
    let snBytes = new Uint8Array(0);
    let modelDec = -1;
    if (hello && hello.commandId === CMD.R_HELLO && hello.payload.length >= 23) {
      const p = hello.payload;
      modelDec = p[0] | (p[1] << 8);
      snBytes = new Uint8Array(p.subarray(2, 22));
      modelName = MODEL_NAMES[modelDec] || "ID_" + modelDec;
      push("INFO", "hello", null, { modelDec, modelName, snLen: snBytes.length, snHex: hex(snBytes) });
    } else {
      modelName = "ECHO_" + (picked.productId || 0).toString(16).toUpperCase();
      push("WARN", "hello", null, { note: hello ? "设备未返回设备信息（" + hello.command + "），仅尝试明文路径" : "未收到 Hello 响应，仅尝试明文路径" });
    }

    const before = await queryStatus();
    if (!before) throw new Error("查询 QI2.2 状态无响应");
    push("INFO", "当前状态", null, before);
    if (before.statusCode !== 0) throw new Error("状态查询返回非 0：" + before.statusCode);
    if (before.isEnabled === target) {
      const msg = target ? "已经是开启状态，无需写入" : "已经是关闭状态，无需写入";
      push("INFO", "result", null, { ok: true, skipped: true, message: msg });
      setStatus(msg, "#15803D");
      return;
    }

    let writeStatus = -1;
    let usedPath = "none";
    let fault = 0;
    let chgState = 0;
    let health = 0;
    let cycles = 0;
    let wrote = false;

    if (snBytes.length) {
      const battWait = wait(CMD.R_BATT, 3500);
      await send(buildFrame(CMD.BATT, []), "读取电池信息");
      const batt = await battWait;
      if (batt && batt.payload.length >= 18) {
        const bp = batt.payload;
        health = (bp[5] << 8) | bp[4];
        cycles = (bp[3] << 8) | bp[2];
        fault = bp[6] & 63;
        chgState = (bp[6] >> 6) & 3;
        push("INFO", "电池信息", null, { health, cycles, chgState, fault, faultRaw: bp[6], level: bp[12], temp: bp[13] > 127 ? bp[13] - 256 : bp[13] });
        if (target && fault !== 0) {
          push("WARN", "加密路径跳过", null, { reason: "故障码 " + fault });
        } else {
          try {
            const tag = await ccm(snBytes, ts, health, cycles, target);
            const encWait = wait(CMD.R_ENC, 6000);
            await send(buildFrame(CMD.ENC, Array.from(tag)), target ? "设置 QI2（加密 开启）" : "设置 QI2（加密 关闭）");
            const enc = await encWait;
            writeStatus = enc ? enc.payload[0] : -1;
            push("INFO", "加密写入结果", null, { status: writeStatus, responded: !!enc });
            if (enc && writeStatus === 0) {
              usedPath = "encrypted";
              wrote = true;
            }
          } catch (err) {
            push("WARN", "加密路径异常", null, { message: String((err && err.message) || err) });
          }
        }
      } else {
        push("WARN", "电池信息", null, { note: "无响应或长度不足，跳过加密路径" });
      }
    }

    if (!wrote) {
      const legacyWait = wait(CMD.R_QI2_SET, 5000);
      await send(buildFrame(CMD.QI2_SET, [target ? 1 : 0]), target ? "设置 QI2（明文 开启）" : "设置 QI2（明文 关闭）");
      const legacy = await legacyWait;
      writeStatus = legacy ? legacy.payload[0] : -1;
      usedPath = legacy && writeStatus === 0 ? "legacy" : "legacy-rejected";
      push("INFO", "明文写入结果", null, { status: writeStatus, responded: !!legacy });
    }

    const after = await querySettled(target);
    const ok = !!after && after.statusCode === 0 && after.isEnabled === target;

    try {
      const snHash = await sha16(snBytes.length ? snBytes : new TextEncoder().encode(modelName + ":" + picked.productId));
      await fetch("/api/qi2-report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          model: modelName.toUpperCase(),
          snHash,
          action: target ? "on" : "off",
          appVersion: APP_VERSION,
          reportedAt: new Date().toISOString(),
          pageUrl: location.origin + location.pathname,
          ok,
          detail: ok ? "trial-" + usedPath + "-ok" : "trial-" + usedPath + "-readback-mismatch",
          info: { protocol: "trial:" + usedPath, modelDec, health, cycles, chgState, fault, writeStatus, readback: after ? after.isEnabled : "error" },
          devLogs: entries,
        }),
      });
    } catch (e) {}

    setStatus(ok ? (target ? "尝试成功：已开启 QI 2.2" : "尝试成功：已关闭 QI 2.2") : "尝试完成但回读不一致", ok ? "#15803D" : "#b45309");
  } catch (err) {
    push("ERROR", "exception", null, { message: String((err && err.message) || err) });
    setStatus("尝试失败：" + String((err && err.message) || err), "#dc2626");
  } finally {
    picked.removeEventListener("inputreport", onReport);
    try {
      await picked.close();
    } catch (e) {}
  }
}

function bindButton(id, target) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("click", async (event) => {
    if (event && (!event.isTrusted || event.clientX === 0 || event.clientY === 0)) return;
    if (busy) return;
    busy = true;
    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = target ? "正在尝试开启…" : "正在尝试关闭…";
    try {
      await run(target);
    } catch (err) {
      setStatus("尝试失败：" + String((err && err.message) || err), "#dc2626");
    }
    busy = false;
    btn.disabled = false;
    btn.textContent = label;
  });
}

bindButton("qt-run", true);
bindButton("qt-off", false);