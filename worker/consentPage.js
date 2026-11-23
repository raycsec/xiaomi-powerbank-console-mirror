export const WEBHID_GATE_SCRIPT = `(function(){
  try{
    var hasHid = typeof navigator !== "undefined" && !!navigator.hid && typeof navigator.hid.requestDevice === "function";
    if (hasHid) return;
    window.__mieco_env_blocked = true;
    var draw = function(){
      try{
        document.body.innerHTML = '<div style="position:fixed;inset:0;background:#f7f8fa;display:flex;align-items:center;justify-content:center;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Microsoft YaHei,sans-serif;">'
          + '<div style="max-width:440px;width:90%;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:32px 28px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.06);">'
          + '<div style="display:inline-block;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:999px;padding:3px 12px;font-size:12px;font-weight:600;margin-bottom:14px;">WebHID Unavailable</div>'
          + '<h1 style="font-size:20px;font-weight:700;color:#111827;margin:0 0 10px;">当前浏览器不支持 WebHID</h1>'
          + '<p style="font-size:14px;color:#6b7280;line-height:1.7;margin:0 0 20px;">本工具需要浏览器原生支持 WebHID API（支持桌面端 Chrome、Edge、Opera、Brave、Vivaldi、Arc 等 Chromium 内核浏览器）。当前浏览器未检测到 navigator.hid。</p>'
          + '<a href="#" id="__mieco_env_reload" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:10px 22px;border-radius:10px;font-size:14px;font-weight:600;">重新加载</a>'
          + '</div></div>';
        var rl = document.getElementById("__mieco_env_reload");
        if (rl) rl.addEventListener("click", function(ev){ ev.preventDefault(); window.location.reload(); });
      }catch(e){}
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", draw);
    else draw();
  }catch(e){}
})();`;

export function renderErrorPage({ pathname, scriptNonce }) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#ef4444" />
  <title>校验失败</title>
  <script nonce="${scriptNonce}">${WEBHID_GATE_SCRIPT}</script>
</head>
<body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:rgba(0,0,0,0.85);backdrop-filter:blur(5px);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC',sans-serif;">
  <div style="background:#fff;padding:30px;border-radius:12px;text-align:center;max-width:400px;width:90%;box-shadow:0 4px 20px rgba(0,0,0,0.3);">
    <svg style="width:64px;height:64px;color:#ef4444;margin:0 auto 16px;display:block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>
    <h2 style="margin-top:0;color:#111827;">安全令牌校验失败</h2>
    <p style="color:#4b5563;line-height:1.6;font-size:14px;margin-bottom:24px;">您的访问凭证已失效（因非法请求、篡改、网络异常或协议超时）。为保障安全，请重新签署授权流程。</p>
    <a href="${pathname}" style="display:block;box-sizing:border-box;text-decoration:none;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;width:100%;">重新获取安全凭证</a>
  </div>
</body>
</html>`;
}

export function renderConsentPage({ scriptNonce, csrfToken, challenge, challengeSig, pageToken, uniqueId, isCN }) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>知情同意书</title>
  <script nonce="${scriptNonce}">${WEBHID_GATE_SCRIPT}</script>
</head>
<body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:rgba(0,0,0,0.85);backdrop-filter:blur(5px);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC',sans-serif;">
  <div id="cn-modal" style="position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:none;justify-content:center;align-items:center;">
    <div style="background:#fff;padding:30px;border-radius:12px;max-width:400px;width:90%;text-align:center;">
      <h2 style="color:#dc2626;margin-top:0;">⚠️ 地域限制提醒</h2>
      <p style="color:#374151;font-size:14px;line-height:1.6;text-align:left;">
        检测到您可能处于中国大陆地区。<br><br>
        qi2.2功能在中国大陆境内<strong style="color:#ea580c;font-size:17px;font-weight:900;">不被允许</strong>使用，如果开启可能影响航空器安全。<br><br>
        如果您觉得我们的识别有误，请点击下方按钮确认您<strong>不在</strong>中国大陆地区，否则请<strong style="color:#ea580c;font-size:17px;font-weight:900;">立即</strong>退出。
      </p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:20px;">
        <button id="cn-confirm-btn" style="background:#dc2626;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:700;cursor:pointer;width:100%;">确认我不在中国大陆地区</button>
        <button id="cn-exit-btn" style="background:#f3f4f6;color:#4b5563;border:1px solid #d1d5db;padding:12px;border-radius:8px;font-weight:700;cursor:pointer;width:100%;">立即退出</button>
      </div>
    </div>
  </div>

  <div style="background:#fff;padding:24px;border-radius:12px;max-width:90%;width:500px;max-height:90vh;overflow-y:auto;">
    <h2 style="text-align:center;margin-top:0;color:#111827;font-weight:700;">知情同意书</h2>
    <input type="hidden" id="c_m" value="${csrfToken}" />
    <input type="hidden" id="ch_m" value="${challenge}" />
    <input type="hidden" id="ch_s" value="${challengeSig}" />
    <input type="hidden" id="pt_m" value="${pageToken}" />
    <input type="hidden" id="is_cn" value="${isCN ? "1" : "0"}" />
    <div style="font-size:14px;color:#374151;line-height:1.6;">
      <p>此快照版本修改了部分设备qi2.2开启和关闭功能的相关配置。</p>
      <p>此网站用于充电宝信息查看和qi2.2的配置关闭。此网页不会更改充电宝和设备固件，不会使用非官方接口，不会影响充电宝的安全性。如遇问题，请长按充电宝电源键重置系统。</p>
      <p style="color:#dc2626;font-size:16px;font-weight:800;text-decoration:underline;text-underline-offset:4px;line-height:1.7;background:#fef2f2;padding:14px;border-radius:8px;border:1px solid #fecaca;word-break:break-word;">
        qi2.2功能在中国大陆境内<strong style="color:#ea580c;font-size:18px;font-weight:900;">不被允许</strong>使用 如果开启可能影响航空器安全 <strong style="color:#ea580c;font-size:18px;font-weight:900;">请勿</strong>在中国大陆境内/注册于中国大陆航司的航空器上开启或使用此功能 此功能仅可在qi2.2所使用的360khz合法的地区可使用及开启 在非法区域或非无线电屏蔽环境内<strong style="color:#ea580c;font-size:18px;font-weight:900;">禁止</strong>开启，如开启请<strong style="color:#ea580c;font-size:18px;font-weight:900;">立即</strong>重置充电宝或关闭此配置项
      </p>
      <p>使用此网页及相关功能开关造成的一切后果由使用者自行承担，与网站所有人、软件开发商及小米公司无关。</p>
      <p>如不同意以上条款，请<strong style="color:#ea580c;font-size:17px;font-weight:900;">立即</strong>退出。</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;margin-top:24px;">
      <button id="c-a" disabled style="background:#2563eb;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:700;cursor:not-allowed;font-size:14px;opacity:0.6;">计算安全证明中...</button>
      <button id="c-d" style="background:#f3f4f6;color:#4b5563;border:1px solid #d1d5db;padding:12px;border-radius:8px;font-weight:700;cursor:pointer;font-size:14px;">我不同意 立即退出</button>
    </div>
  </div>

  <script nonce="${scriptNonce}">
    document.addEventListener("DOMContentLoaded", async function () {
      const btnAgree = document.getElementById("c-a");
      const btnDeny = document.getElementById("c-d");
      const cnModal = document.getElementById("cn-modal");
      const cnConfirm = document.getElementById("cn-confirm-btn");
      const cnExit = document.getElementById("cn-exit-btn");
      const isCn = document.getElementById("is_cn").value === "1";
      const isHumanClick = (e) => !!(e && e.isTrusted && e.clientX !== 0 && e.clientY !== 0);

      let ott = null;
      let actionToken = null;

      btnDeny.addEventListener("click", (e) => {
        if (!isHumanClick(e)) return;
        window.location.href = window.location.pathname + "?reject=1";
      });
      cnExit.addEventListener("click", (e) => {
        if (!isHumanClick(e)) return;
        window.location.href = window.location.pathname + "?reject=1";
      });

      const submitAgree = async () => {
        btnAgree.innerText = "正在验证...";
        btnAgree.disabled = true;
        btnAgree.style.opacity = "0.7";
        try {
          const res = await fetch("/api/agree", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ott, action_token: actionToken }),
          });
          if (res.ok) window.location.reload();
          else window.location.href = "?error=1";
        } catch {
          window.location.href = "?error=1";
        }
      };

      cnConfirm.addEventListener("click", async (e) => {
        if (!isHumanClick(e)) return;
        cnModal.style.display = "none";
        try {
          const res = await fetch("/api/confirm-cn", { method: "POST" });
          if (!res.ok) { window.location.href = "?error=1"; return; }
          const data = await res.json();
          actionToken = data.action_token;
          await submitAgree();
        } catch {
          window.location.href = "?error=1";
        }
      });

      if (!window.crypto?.subtle) { window.location.href = "?error=1"; return; }

      const sha256Hex = async (text) => {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
        return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
      };

      try {
        const csrf = document.getElementById("c_m").value;
        const ch = document.getElementById("ch_m").value;
        const chSig = document.getElementById("ch_s").value;
        const pageTok = document.getElementById("pt_m").value;

        let nonce = 0;
        let sig = "";
        while (true) {
          sig = await sha256Hex(ch + nonce + chSig);
          if (sig.startsWith("0000")) break;
          nonce += 1;
          if (nonce % 200 === 0) {
            btnAgree.innerText = "计算安全证明中... (" + nonce + ")";
            await new Promise((r) => setTimeout(r, 0));
          }
        }

        const integritySig = await sha256Hex(ch + pageTok + document.body.constructor.name + chSig);
        const res = await fetch("/api/report-fingerprint", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf, "X-Page-Integrity": integritySig },
          body: JSON.stringify({ visitId: "${uniqueId}", nonce, sig }),
        });
        if (!res.ok) { window.location.href = "?error=1"; return; }
        ott = (await res.json()).ott;

        let countdown = 3;
        btnAgree.innerText = "我已完整阅读并同意以上条款 (" + countdown + ")";
        const timer = setInterval(() => {
          countdown -= 1;
          if (countdown > 0) {
            btnAgree.innerText = "我已完整阅读并同意以上条款 (" + countdown + ")";
          } else {
            clearInterval(timer);
            btnAgree.innerText = "我已完整阅读并同意以上条款";
            btnAgree.disabled = false;
            btnAgree.style.cursor = "pointer";
            btnAgree.style.opacity = "1";
          }
        }, 1000);
      } catch {
        window.location.href = "?error=1";
      }

      btnAgree.addEventListener("click", (e) => {
        if (!isHumanClick(e) || btnAgree.disabled || !ott) return;
        if (isCn && !actionToken) {
          cnModal.style.display = "flex";
          return;
        }
        void submitAgree();
      });
    });
  </script>
</body>
</html>`;
}
