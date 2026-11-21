// Build the final worker source from the base authored worker (clip_worker.js), then apply
// asset/route patches. Anti-debug injection has been removed: no devtools guard, no _n helper.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const WORK = ROOT;

let s = fs.readFileSync(path.join(WORK, "scripts", "authored-worker.js"), "utf8").replace(/\r\n/g, "\n");

// console silencer injected into the worker module scope (templates reference it)
s =
  'const consoleGuardScript = \'for(let k in console){try{console[k]=function(){}}catch(e){}}\';\n' + s;

const count = (h, n) => h.split(n).length - 1;

// ---------- shared HTML pieces ----------
const consoleGuardScript = `for(let k in console){try{console[k]=function(){}}catch(e){}}`;

const gateScript = `(function(){
  try{
    var ua=navigator.userAgent||"";
    var mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    var smallTouch=window.screen&&window.screen.width<768&&navigator.maxTouchPoints>0;
    var isChrome=/Chrome/.test(ua)&&/Google Inc/.test(navigator.vendor)&&!/Edg/.test(ua)&&!/OPR/.test(ua);
    var ok=(typeof navigator.hid!=="undefined")&&!mobile&&!smallTouch&&isChrome;
    if(ok)return;
    window.__mieco_env_blocked=true;
    var draw=function(){
      try{
        document.documentElement.innerHTML='';
        var box=document.createElement("div");
        box.id="__mieco_env_block";
        box.setAttribute("style","position:fixed;inset:0;background:#f7f8fa;display:flex;align-items:center;justify-content:center;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;");
        box.innerHTML='<div style="max-width:28rem;width:100%;padding:3rem 1.5rem;text-align:left;">'
          +'<div style="margin-bottom:1.5rem;"><img src="data:image/png;base64,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" alt="Error" style="width:7.5rem;height:7.5rem;object-fit:contain;"></div>'
          +'<h1 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 .5rem;">无法访问此网站</h1>'
          +'<p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 .25rem;">本网站仅支持在 <b>PC / Mac 的 Chrome 浏览器</b> 中打开</p>'
          +'<p style="font-size:14px;color:#9ca3af;margin:0;">如使用无误，<a href="#" id="__mieco_env_reload" style="color:#3b82f6;text-decoration:none;">请尝试重新加载</a></p>'
          +'</div>';
        (document.body||document.documentElement).appendChild(box);
        var rl=document.getElementById("__mieco_env_reload");
        if(rl)rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});
      }catch(e){}
    };
    draw();
    document.addEventListener("DOMContentLoaded",draw);
    window.addEventListener("load",draw);
    setInterval(function(){ if(window.__mieco_env_blocked){draw();} },1000);
  }catch(e){}
})();`;
const loadingHtml = `<div id="mieco-loading" style="position:fixed;inset:0;background:#f7f8fa;z-index:2147483000;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;">
      <div style="width:320px;text-align:center;">
        <div style="font-size:14px;color:#374151;margin-bottom:12px;">正在加载小米移动电源详情…</div>
        <div style="height:6px;background:#e5e7eb;border-radius:999px;overflow:hidden;"><div id="mieco-loading-bar" style="height:100%;width:0%;background:#2563eb;border-radius:999px;transition:width .35s ease;"></div></div>
        <div style="margin-top:10px;font-size:12px;color:#9ca3af;"><span id="mieco-loading-pct">0%</span></div>
        <div id="mieco-loading-slow" style="display:none;margin-top:16px;font-size:12px;color:#9ca3af;">加载较慢？<a href="#" id="mieco-loading-reload" style="color:#3b82f6;text-decoration:none;">重新加载</a></div>
`;
const loadingJs = `(function(){
  var el=document.getElementById("mieco-loading");
  if(!el){return;}
  var bar=document.getElementById("mieco-loading-bar"), pctEl=document.getElementById("mieco-loading-pct");
  var done=false, p=3;
  function set(v){p=v;bar.style.width=v+"%";pctEl.textContent=Math.round(v)+"%";}
  set(3);
  var t=setInterval(function(){ if(done){return;} p=Math.min(p+Math.random()*7,97); set(p); },350);
  var slow=document.getElementById("mieco-loading-slow");
  var rl=document.getElementById("mieco-loading-reload");
  if(rl){rl.addEventListener("click",function(ev){ev.preventDefault();window.location.reload();});}
  setTimeout(function(){ if(!done&&slow){slow.style.display="block";} },12000);
  function finish(){ if(done){return;} done=true; clearInterval(t); set(100); setTimeout(function(){ el.style.transition="opacity .3s"; el.style.opacity="0"; setTimeout(function(){ el.remove(); },320); },200); }
  var root=document.getElementById("root");
  if(root){
    try{ var mo=new MutationObserver(function(){ if(root.childElementCount>0){ mo.disconnect(); finish(); } }); mo.observe(root,{childList:true,subtree:false}); }catch(e){}
    var iv=setInterval(function(){ if(done){clearInterval(iv);return;} if(root.childElementCount>0){ clearInterval(iv); finish(); } },400);
  }
  window.addEventListener("load",function(){ setTimeout(function(){ if(root&&root.childElementCount>0){finish();} },800); });
})();`;
const bannerButtonHtml = `<div style="margin-top: 8px;"><a href="/supportqi2" style="display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.65); color: #fff; padding: 4px 16px; border-radius: 999px; font-size: 12px; text-decoration: none;">QI 2.2 支持机型一览</a> </div>`;

const skipped = [];
const req = (h, n, expect, label) => {
  const c = count(h, n);
  if (c === 0) { skipped.push(label); return; }
  if (c !== expect) throw new Error(`anchor "${label}": expected ${expect}, found ${c}`);
};
const rep = (h, from, to, label, expect = 1) => {
  const c = count(h, from);
  if (c === 0) { skipped.push(label); return h; }
  if (c !== expect) throw new Error(`anchor "${label}": expected ${expect}, found ${c}`);
  return h.split(from).join(to);
};
// ---------- 4b) consent page: keep real-user gesture checks (no self-destruct) ----------
s = rep(
  s,
  "        bD.addEventListener('click', function(e) {\n          window.location.href = window.location.pathname + '?reject=1';",
  "        bD.addEventListener('click', function(e) {\n          if (!e.isTrusted || e.clientX === 0 || e.clientY === 0) return;\n          window.location.href = window.location.pathname + '?reject=1';",
  "isTrusted bD",
);
s = rep(
  s,
  "            cnBtn.addEventListener('click', async function(e) {\n                document.getElementById('cn-modal').style.display = 'none';",
  "            cnBtn.addEventListener('click', async function(e) {\n                if (!e.isTrusted || e.clientX === 0 || e.clientY === 0) return;\n                document.getElementById('cn-modal').style.display = 'none';",
  "isTrusted cnBtn",
);
s = rep(
  s,
  "            cnExitBtn.addEventListener('click', function(e) {\n                window.location.href = window.location.pathname + '?reject=1';",
  "            cnExitBtn.addEventListener('click', function(e) {\n                if (!e.isTrusted || e.clientX === 0 || e.clientY === 0) return;\n                window.location.href = window.location.pathname + '?reject=1';",
  "isTrusted cnExit",
);
s = rep(
  s,
  "        bA.addEventListener('click', async function(e) {\n          if(!this.disabled && ott) {",
  "        bA.addEventListener('click', async function(e) {\n          if (!e.isTrusted || e.clientX === 0 || e.clientY === 0) return;\n          if(!this.disabled && ott) {",
  "isTrusted bA",
);

// ---------- 4c) consent page: drop leftover guard flag, faster PoW ----------
s = rep(s, "          window.__mieco_pow_running = true;\n", "", "pow flag true");
s = rep(s, "          window.__mieco_pow_running = false;\n\n          const domType", "\n          const domType", "pow flag false");
s = rep(s, "window.__mieco_pow_running = false; window.location.href = '?error=1';", "window.location.href = '?error=1';", "pow flag catch");
s = rep(s, "nonce % 250", "nonce % 200", "pow mod");
s = rep(s, "setTimeout(r, 5)", "setTimeout(r, 0)", "pow yield");

// ---------- 5) remove the qi2 plugin from the app page ----------
{
  const startMark = "(function initMiecoHack_${appSecret}() {";
  const endMark = "window.addEventListener('load', function() { setTimeout(function() { fetch('/api/destroy-token'";
  const start = s.indexOf(startMark);
  if (start < 0) throw new Error("initMiecoHack not found");
  const end = s.indexOf(endMark, start);
  if (end < 0) throw new Error("plugin end not found");
  s = s.slice(0, start) + s.slice(end);
}

// ---------- 6) asset refs -> same-origin new bundles ----------
s = rep(
  s,
  "https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/assets/index-DIuXkLo4.js",
  "/eco--usb-device-web/static/assets/index-17f0f8a6.js",
  "index ref",
  2,
);
s = rep(
  s,
  "https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/assets/react-vendor-tpvIM1oe.js",
  "/eco--usb-device-web/static/assets/react-vendor-252eb283.js",
  "vendor ref",
  2,
);
s = rep(
  s,
  "https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/assets/index-DZxvydNm.css",
  "/eco--usb-device-web/static/assets/index-30406512.css",
  "css ref",
  2,
);
s = rep(
  s,
  "https://xiaomi-mirror.nalaniflynn.cn/eco--usb-device-web/static/xiaomi.svg",
  "/eco--usb-device-web/static/xiaomi.svg",
  "favicon ref",
  1,
);

// ---------- 7) banner date ----------
s = rep(s, "抓取时间: 2026/5/22 20:06:28", "抓取时间: 2026/10/15 20:00:46", "banner date", 2);

// ---------- 7a) session lifetime: 10s -> 1 hour ----------
s = rep(
  s,
  "        }, 10000);",
  "        }, 3600000);",
  "session 1h",
  1,
);

// ---------- 7b) remove auto destroy-token on app pages ----------
s = rep(
  s,
  "\n      window.addEventListener('load', function() { setTimeout(function() { fetch('/api/destroy-token', { method: 'POST' }).catch(function(){}); }, 1000); });",
  "",
  "no auto destroy",
  2,
);

// ---------- 8) env gate (PC/Mac Chrome only) on every page ----------
s = rep(
  s,
  '<meta charset="UTF-8" />',
  '<meta charset="UTF-8" />\n    <script nonce="${scriptNonce}">' + gateScript + "</script>",
  "gate inject",
  4,
);

// ---------- 9) loading progress overlay on app pages ----------
s = rep(
  s,
  '    <div id="root"></div>\n',
  '    <div id="root"></div>\n    ' +
    loadingHtml +
    '\n    <script nonce="${scriptNonce}">' +
    loadingJs +
    "</script>\n",
  "loading overlay",
  2,
);

// ---------- 10) banner button -> /supportqi2 ----------
s = rep(
  s,
  "仅供学习研究 不推荐任何非官方修改设备行为 可能造成的安全和法律风险请自行承担${repoHtml}${migrationHtml}</div>",
  "仅供学习研究 不推荐任何非官方修改设备行为 可能造成的安全和法律风险请自行承担${repoHtml}${migrationHtml}</div>" + bannerButtonHtml,
  "banner button",
  2,
);

// ---------- 11) whitelist /supportqi2 ----------
s = rep(
  s,
  "['/', '/models', '/api/report-fingerprint', '/api/agree', '/api/verify-env', '/api/confirm-cn']",
  "['/', '/models', '/supportqi2', '/api/report-fingerprint', '/api/agree', '/api/verify-env', '/api/confirm-cn']",
  "supportqi2 whitelist",
  1,
);

// ---------- 12) /supportqi2 page ----------
{
  const anchor =
    "      return new Response(modelsHtmlContent, { headers: applySecurityHeaders(successHeaders, true) });\n    }";
  req(s, anchor, 1, "models return anchor");
  const qi2Block = [
    "",
    "    if (url.pathname === '/supportqi2') {",
    "      let qi2StatsMap = {};",
    "      if (env.DB) {",
    "        try {",
    "          const qs = await env.DB.prepare(\"SELECT model, COUNT(*) AS total, SUM(ok) AS success FROM qi2_reports WHERE action = 'on' GROUP BY model\").all();",
    "          (qs.results || []).forEach(function (r) { qi2StatsMap[r.model] = { total: r.total || 0, success: r.success || 0 }; });",
    "        } catch (err) {}",
    "      }",
    "      const qi2StatsBadge = function (code) {",
    "        const st = qi2StatsMap[code];",
    "        if (!st || st.total < 5) return '';",
    "        const errors = Math.max(0, st.total - st.success);",
    "        const rate = Math.round((st.success / st.total) * 100);",
    "        const errorRate = errors / st.total;",
    "        const warn = errorRate > 0.3, good = errorRate < 0.1;",
    "        const color = warn ? '#b45309' : good ? '#15803D' : '#4B5563';",
    "        const bg = warn ? '#fffbeb' : good ? '#f0fdf4' : '#f9fafb';",
    "        const border = warn ? '#fde68a' : good ? '#bbf7d0' : '#e5e7eb';",
    "        return '<div style=\"display:inline-block;margin-top:8px;background:' + bg + ';color:' + color + ';border:1px solid ' + border + ';border-radius:999px;padding:3px 12px;font-size:12px;font-weight:600;\">\\u5f00\\u542f\\u6210\\u529f\\u7387 ' + rate + '% (' + st.success + '/' + st.total + ')' + (good ? ' \\u2713' : '') + '</div>';",
    "      };",
    "      const qi2Supported = [",
    '        ["小米金沙江充电宝 超薄磁吸 10000 45W", "Xiaomi UltraThin Magnetic Power Bank 10000 25W", "WPB1025S", "WPB1025S"],',
    '        ["小米金沙江充电宝 超薄磁吸 10000 45W", "Xiaomi UltraThin Magnetic Power Bank 10000 25W", "WPB1026S · 加密协议", "WPB1026S"],',
    "      ];",
    "      const qi2UnknownModels = [",
    '        ["小米充电宝 磁吸自带线 10000 45W", "Xiaomi Magnetic Power Bank 10000 25W (Integrated Cable) 2027", "WPB1025", "WPB1025"],',
    "      ];",
    "      const qi2ListHtml = qi2Supported",
    "        .map(function (m, i) {",
    "          return (",
    '            \'<div style="display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:20px 24px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">\'',
    '            + \'<div><div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:4px;">\' + (i + 1) + ". " + m[0] + "</div>"',
    '            + \'<div style="font-size:12px;color:#6b7280;">\' + m[1] + "</div>" + qi2StatsBadge(m[3] || String(m[2]).split(" \\u00b7 ")[0]) + "</div>"',
    '            + \'<div style="flex:0 0 auto;margin-left:16px;background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;border-radius:999px;padding:6px 16px;font-size:13px;font-weight:600;">\' + m[2] + "</div>"',
    '            + "</div>"',
    "          );",
    "        })",
    '        .join("");',
    "      const qi2UnknownHtml = qi2UnknownModels",
    "        .map(function (m, i) {",
    "          return (",
    '            \'<div style="display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:20px 24px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);opacity:.92;">\'',
    '            + \'<div><div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:4px;">\' + (i + 1) + ". " + m[0] + "</div>"',
    '            + \'<div style="font-size:12px;color:#6b7280;">\' + m[1] + "</div>" + qi2StatsBadge(m[3] || String(m[2]).split(" \\u00b7 ")[0]) + "</div>"',
    '            + \'<div style="flex:0 0 auto;margin-left:16px;background:#f3f4f6;color:#4b5563;border:1px solid #d1d5db;border-radius:999px;padding:6px 16px;font-size:13px;font-weight:600;">\' + m[2] + " · 未经测试</div>"',
    '            + "</div>"',
    "          );",
    "        })",
    '        .join("");',
    "      const qi2UnsupportedModels = [",
    '        ["小米金沙江充电宝 超薄磁吸 5000 27W", "Xiaomi UltraThin Magnetic Power Bank 5000 25W", "WPB0525S"],',
    "      ];",
    "      const qi2UnsupportedHtml = qi2UnsupportedModels",
    "        .map(function (m, i) {",
    "          return (",
    '            \'<div style="display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:20px 24px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);opacity:.92;">\'',
    '            + \'<div><div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:4px;">\' + (i + 1) + ". " + m[0] + "</div>"',
    '            + \'<div style="font-size:12px;color:#6b7280;">\' + m[1] + "</div>" + qi2StatsBadge(m[3] || String(m[2]).split(" \\u00b7 ")[0]) + "</div>"',
    '            + \'<div style="flex:0 0 auto;margin-left:16px;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:999px;padding:6px 16px;font-size:13px;font-weight:600;">\' + m[2] + " · 不支持</div>"',
    '            + "</div>"',
    "          );",
    "        })",
    '        .join("");',
    "      const qi2HtmlContent = `<!doctype html>",
    '<html lang="zh-CN">',
    "  <head>",
    '    <meta charset="UTF-8" />',
    "    <script nonce=\"${scriptNonce}\">" + gateScript + "</script>",
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '    <meta name="theme-color" content="#2563eb" />',
    "    <title>QI 2.2 支持机型 - 小米移动电源详情</title>",
    '    <script nonce="${scriptNonce}">${consoleGuardScript}window.onerror=function(){return true;};window.addEventListener(\'error\',function(e){e.preventDefault();},true);window.addEventListener(\'unhandledrejection\',function(e){e.preventDefault();},true);</script>',
    '    <script nonce="${scriptNonce}">',
    "      if (window.trustedTypes && trustedTypes.createPolicy) { window.trustedTypes.createPolicy('default', { createHTML: s => s, createScript: s => s, createScriptURL: s => s }); }",
    "    </script>",
    "    ${scriptTagMain}",
    "  </head>",
    '  <body style="margin: 0; background: #f7f8fa;">',
    '    <div id="blue-banner" style="position: relative; width: 100%; background: rgb(0, 122, 204); color: white; text-align: center; padding: 8px 5px; font-size: 12px; box-sizing: border-box; font-family: sans-serif;">',
    '      <div>网页快照 - 抓取时间: 2026/10/15 20:00:46 | 原网址: <a href="https://powerbank.mieco.net/" target="_blank" style="color:white; text-decoration:underline;">https://powerbank.mieco.net/</a></div>',
    '      <div style="margin-top: 4px; font-weight: bold;">此快照版本修改了部分设备qi2.2开启和关闭功能的相关配置</div>',
    '      <div style="margin-top: 8px;"><a href="/" style="display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.65); color: #fff; padding: 4px 16px; border-radius: 999px; font-size: 12px; text-decoration: none;">← 返回应用</a></div>',
    "    </div>",
    '    <div style="max-width: 760px; margin: 24px auto; padding: 0 16px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei\', sans-serif;">',
    '      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 28px 32px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">',
    '        <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px;">QI 2.2 支持机型</h1>',
    '        <p style="font-size: 14px; color: #6b7280; margin: 0; line-height: 1.7;">支持开启 / 关闭 QI 2.2 功能（25W 无线快充）的机型：连接设备后可在应用内操作，未开启显示「立即开启」，已开启显示「强制关闭」。</p>',
    "      </div>",
    '      <div style="font-size: 14px; font-weight: 700; color: #111827; margin: 8px 4px 10px;">支持开启 / 关闭（当前方法）</div>',
    "      ${qi2ListHtml}",
    '      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 16px; padding: 16px 20px; margin: 20px 0 12px; font-size: 13px; color: #1e40af; line-height: 1.7;">',
    "        <b>新版开启方式：</b>WPB1026S 使用加密设置协议，写入前会重新握手、读取电池健康度与循环次数，并在回读状态一致后才提示成功；固件差异可能导致个别设备无法开启。",
    "      </div>",
    '      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 16px; padding: 16px 20px; margin: 20px 0 12px; font-size: 13px; color: #4b5563; line-height: 1.7;">',
    "        <b>可能支持（未经该型号实机测试）：</b>小米充电宝 磁吸自带线 10000 45W（WPB1025）是否支持 QI 2.2 无法确认；应用内提供「未经测试尝试开启」按钮与新加密协议，仅建议了解风险后自行尝试，失败不代表设备损坏。",
    "      </div>",
    '      <div style="font-size: 14px; font-weight: 700; color: #111827; margin: 8px 4px 10px;">可能支持（未经测试）</div>',
    "      ${qi2UnknownHtml}",
    '      <div style="font-size: 14px; font-weight: 700; color: #111827; margin: 8px 4px 10px;">不支持</div>',
    "      ${qi2UnsupportedHtml}",
    '      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 20px 24px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">',
    '        <div style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 6px;">尝试开启（测试）</div>',
    "        <b>新版开启方式：</b>WPB1026S 使用加密设置协议，写入前会重新握手、读取电池健康度与循环次数，并在回读状态一致后才提示成功；固件差异可能导致个别设备无法开启。",
    '        <p style="font-size: 12px; color: #b45309; margin: 0 0 12px; line-height: 1.7;">仅用于未知型号的测试入口，可能对设备无效；请勿反复尝试。</p>',
    '        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">',
    '          <button id="qt-run" style="background: #f59e0b; color: #fff; border: 0; border-radius: 16px; padding: 8px 22px; font-size: 13px; font-weight: 600; cursor: pointer;">尝试开启</button>',
    '          <button id="qt-off" style="background: #f3f4f6; color: #374151; border: 0; border-radius: 16px; padding: 8px 22px; font-size: 13px; font-weight: 600; cursor: pointer;">尝试关闭</button>',
    '          <span id="qt-status" style="font-size: 12px; color: #4b5563;">未开始</span>',
    "        </div>",
    '        <pre id="qt-log" style="margin: 12px 0 0; max-height: 300px; overflow: auto; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 11px; color: #374151; white-space: pre-wrap; word-break: break-all;"></pre>',
    "      </div>",
    '      <script nonce="${scriptNonce}" src="/eco--usb-device-web/static/assets/qi2-trial.v28.js"></script>',
    '      <div style="font-size: 12px; color: #9ca3af; text-align: center; margin: 24px 0;">仅供学习研究 不推荐任何非官方修改设备行为 可能造成的安全和法律风险请自行承担</div>',
    "    </div>",
    "  </body>",
    "</html>`;",
    "      return new Response(qi2HtmlContent, { headers: applySecurityHeaders(successHeaders, true) });",
    "    }",
  ].join("\n");
  s = s.replace(anchor, anchor + qi2Block);
}


// ---------- 13) R2 asset serving route ----------
// 首屏并行预加载：主包 + 面板包 + 模型数据（面板即主界面，必须提前并行拉取）
s = rep(
  s,
  '    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/react-vendor-252eb283.js" nonce="${scriptNonce}">',
  '    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/react-vendor-252eb283.js" nonce="${scriptNonce}">\n    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.js" nonce="${scriptNonce}">\n    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/ModelData-16716423.js" nonce="${scriptNonce}">',
  "modulepreload extras",
  2,
);

// ---------- 13) R2 asset serving route ----------
s = rep(
  s,
  "    if (url.searchParams.get('reject') === '1') {",
  [
    "    if (url.pathname.startsWith('/eco--usb-device-web/')) {",
    "      const assetExt = (url.pathname.match(/[.]([A-Za-z0-9]+)$/) || [])[1] || '';",
    "      const mimeMap = { js: 'application/javascript; charset=utf-8', css: 'text/css; charset=utf-8', json: 'application/json; charset=utf-8', map: 'application/json; charset=utf-8', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', wasm: 'application/wasm', html: 'text/html; charset=utf-8', txt: 'text/plain; charset=utf-8' };",
    "      const assetMime = mimeMap[String(assetExt).toLowerCase()] || '';",
    "      const assetCacheKey = new Request(url.origin + url.pathname, { method: 'GET' });",
    "      const assetCache = caches.default;",
    "      let assetHit = null;",
    "      try { assetHit = await assetCache.match(assetCacheKey); } catch (err) {}",
    "      const assetHitOk = !!(assetHit && (!assetMime || (assetHit.headers.get('content-type') || '') === assetMime));",
    "      if (assetHitOk) {",
    "        return request.method === 'HEAD' ? new Response(null, { headers: assetHit.headers }) : assetHit;",
    "      }",
    "      try {",
    "        const obj = env.XIAOMI_MIRROR ? await env.XIAOMI_MIRROR.get(url.pathname.slice(1)) : null;",
    "        if (obj) {",
    "          const h = new Headers();",
    "          obj.writeHttpMetadata(h);",
    "          if (assetMime) h.set('content-type', assetMime);",
    "          h.set('etag', obj.httpEtag);",
    "          h.set('cache-control', 'public, max-age=31536000, immutable');",
    "          h.set('x-content-type-options', 'nosniff');",
    "          h.set('access-control-allow-origin', '*');",
    "          const assetResp = new Response(obj.body, { headers: h });",
    "          ctx.waitUntil(assetCache.put(assetCacheKey, assetResp.clone()).catch(() => {}));",
    "          return request.method === 'HEAD' ? new Response(null, { headers: h }) : assetResp;",
    "        }",
    "      } catch (err) {}",
    "      return new Response('Not Found', { status: 404, headers: applySecurityHeaders(new Headers()) });",
    "    }",
    "    if (url.searchParams.get('reject') === '1') {",
  ].join("\n"),
  "asset route",
);

// ---------- 13b) serve xiaomi.svg from the worker (cache safe, adds lbs-info) ----------
{
  const svgB64 = "PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAwLjMyNCAxMS43MDE0Qzg5Ljc1NzEgMS4xNzU4NiA3NC41NjQ2IDAgNTUuOTk4NyAwQzM3LjQwOTEgMCAyMi4xOTQ0IDEuMTg5NzEgMTEuNjMyMSAxMS43NDI1QzEuMDcyMzQgMjIuMjkzNiAwIDM3LjQ4MzkgMCA1Ni4wNTNDMCA3NC42MjE4IDEuMDcyMzQgODkuODIwMSAxMS42MzY1IDEwMC4zNzNDMjIuMTk5MiAxMTAuOTI5IDM3LjQxMDIgMTExLjk5NyA1NS45OTg3IDExMS45OTdDNzQuNTg2NSAxMTEuOTk3IDg5Ljc5NzkgMTEwLjkyOSAxMDAuMzYxIDEwMC4zNzNDMTEwLjkyMyA4OS44MTY5IDExMS45OTcgNzQuNjIxOCAxMTEuOTk3IDU2LjA1M0MxMTEuOTk3IDM3LjQ2MDIgMTEwLjkxMSAyMi4yNTI0IDEwMC4zMjQgMTEuNzAxNFoiIGZpbGw9IiNGRjY5MDAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01MS44NzY3IDc2Ljc1MkM1MS44NzY3IDc3LjEyNzggNTEuNTYwMyA3Ny40Mzk1IDUxLjE3NSA3Ny40Mzk1SDQxLjYyNDJDNDEuMjMyMyA3Ny40Mzk1IDQwLjkxNDUgNzcuMTI3OCA0MC45MTQ1IDc2Ljc1MlY1MS43NzU0QzQwLjkxNDUgNTEuMzk2NCA0MS4yMzIzIDUxLjA4NjIgNDEuNjI0MiA1MS4wODYySDUxLjE3NUM1MS41NjAzIDUxLjA4NjIgNTEuODc2NyA1MS4zOTY0IDUxLjg3NjcgNTEuNzc1NFY3Ni43NTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcwLjU3NjkgNzYuNzUyQzcwLjU3NjkgNzcuMTI3OCA3MC4yNTkxIDc3LjQzOTUgNjkuODcyNCA3Ny40Mzk1SDYwLjc4MTFDNjAuMzkxMSA3Ny40Mzk1IDYwLjA3MzMgNzcuMTI3OCA2MC4wNzMzIDc2Ljc1MlY3Ni42NTg3VjU1LjIwMjhDNjAuMDYzOCA1MS40NDA1IDU5Ljg0ODggNDcuNTczNSA1Ny45MDY0IDQ1LjYzQzU2LjIzNjMgNDMuOTU0OCA1My4xMjIgNDMuNTcxIDQ5Ljg4MjQgNDMuNDkwNUgzMy40MDI1QzMzLjAxMzYgNDMuNDkwNSAzMi42OTk0IDQzLjgwMzIgMzIuNjk5NCA0NC4xNzk0Vjc0LjQ5ODRWNzYuNzUyQzMyLjY5OTQgNzcuMTI3OCAzMi4zNzg3IDc3LjQzOTUgMzEuOTg5NyA3Ny40Mzk1SDIyLjg5MjNDMjIuNTAzOCA3Ny40Mzk1IDIyLjE5MSA3Ny4xMjc4IDIyLjE5MSA3Ni43NTJWMzUuMjQ5NkMyMi4xOTEgMzQuODY4NyAyMi41MDM4IDM0LjU1ODkgMjIuODkyMyAzNC41NTg5SDQ5LjEzOTZDNTUuOTk5MyAzNC41NTg5IDYzLjE3MDQgMzQuODcxNiA2Ni43MDcxIDM4LjQxMzFDNzAuMjU5MSA0MS45NzAyIDcwLjU3NjkgNDkuMTI4NSA3MC41NzY5IDU1Ljk5NTlWNzYuNzUyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04OS4zMDU3IDc2Ljc1MkM4OS4zMDU3IDc3LjEyNzggODguOTg0NiA3Ny40Mzk1IDg4LjU5OTMgNzcuNDM5NUg3OS41MDMzQzc5LjExNDggNzcuNDM5NSA3OC43OTg4IDc3LjEyNzggNzguNzk4OCA3Ni43NTJWMzUuMjQ5NkM3OC43OTg4IDM0Ljg2ODcgNzkuMTE0OCAzNC41NTg5IDc5LjUwMzMgMzQuNTU4OUg4OC41OTkzQzg4Ljk4NDYgMzQuNTU4OSA4OS4zMDU3IDM0Ljg2ODcgODkuMzA1NyAzNS4yNDk2Vjc2Ljc1MloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";
  const svgBlock = [
    "    if (url.pathname === '/eco--usb-device-web/static/xiaomi.svg') {",
    "      const svgBytes = Uint8Array.from(atob('" + svgB64 + "'), function (c) { return c.charCodeAt(0); });",
    "      const svgHeaders = new Headers();",
    "      svgHeaders.set('content-type', 'image/svg+xml');",
    "      svgHeaders.set('cache-control', 'public, max-age=86400');",
    "      svgHeaders.set('access-control-allow-origin', '*');",
    "      svgHeaders.set('lbs-info', (request.cf && request.cf.country) || 'Unknown');",
    "      return new Response(request.method === 'HEAD' ? null : svgBytes, { headers: applySecurityHeaders(svgHeaders) });",
    "    }",
    "",
  ].join("\n");
  s = rep(s, "    if (url.pathname.startsWith('/eco--usb-device-web/')) {", svgBlock + "    if (url.pathname.startsWith('/eco--usb-device-web/')) {", "svg route", 1);
}

// ---------- 14) DEV_MODE (test worker): unprotected test pages ----------
{
  const anchor = "    if (url.searchParams.get('reject') === '1') {";
  req(s, anchor, 1, "dev anchor");
  const devBlock = [
    "    const DEV_MODE = env.MIRROR_DEV_MODE === '1';",
    "",
    "    if (DEV_MODE) {",
    "      const devHeaders = new Headers();",
    "      devHeaders.set('content-type', 'text/html;charset=UTF-8');",
    "      if (url.pathname === '/' || url.pathname === '/models') {",
    "        const devAppHtml = `<!doctype html>",
    '<html lang="zh-CN">',
    "  <head>",
    '    <meta charset="UTF-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />',
    '    <meta name="robots" content="noindex" />',
    '    <meta name="theme-color" content="#2563eb" />',
    "    <title>小米移动电源详情 · 测试版</title>",
    '    <script nonce="${scriptNonce}">',
    "      if (window.trustedTypes && trustedTypes.createPolicy) { window.trustedTypes.createPolicy('default', { createHTML: s => s, createScript: s => s, createScriptURL: s => s }); }",
    "    </script>",
    '    <style nonce="${scriptNonce}">:root { --banner-height: 0px; } body { padding-top: var(--banner-height) !important; } .fixed-header { top: var(--banner-height) !important; }</style>',
    '    <script nonce="${scriptNonce}">',
    "      (function(){",
    "        try{",
    '          var ua = navigator.userAgent || "";',
    "          var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || (window.screen && window.screen.width < 768);",
    '          var desktopUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";',
    "          if (mobile) {",
    '            try { Object.defineProperty(navigator, "userAgent", { get: function () { return desktopUA; }, configurable: true }); } catch (e) {}',
    '            try { Object.defineProperty(navigator, "vendor", { get: function () { return "Google Inc."; }, configurable: true }); } catch (e) {}',
    '            try { Object.defineProperty(navigator, "maxTouchPoints", { get: function () { return 0; }, configurable: true }); } catch (e) {}',
    '            try { Object.defineProperty(window.screen, "width", { get: function () { return 1920; }, configurable: true }); } catch (e) {}',
    "          }",
    "          if (!navigator.hid) {",
    '            var stub = { getDevices: function () { return Promise.resolve([]); }, requestDevice: function () { return Promise.resolve([]); }, addEventListener: function () {}, removeEventListener: function () {}, onconnect: null, ondisconnect: null, dispatchEvent: function () { return true; } };',
    '            try { Object.defineProperty(navigator, "hid", { value: stub, configurable: true }); } catch (e) { try { navigator.hid = stub; } catch (e2) {} }',
    "          }",
    "        }catch(e){}",
    "      })();",
    "    </script>",
    '    <script type="module" crossorigin src="/eco--usb-device-web/static/assets/index-dev-a2.js" nonce="${scriptNonce}"></script>',
    '    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/react-vendor-252eb283.js" nonce="${scriptNonce}">',
    '    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.js" nonce="${scriptNonce}">',
    '    <link rel="modulepreload" crossorigin href="/eco--usb-device-web/static/assets/ModelData-16716423.js" nonce="${scriptNonce}">',
    '    <link rel="stylesheet" crossorigin href="/eco--usb-device-web/static/assets/index-30406512.css" nonce="${scriptNonce}">',
    "  </head>",
    '  <body style="margin: 0;">',
    '    <div id="blue-banner" style="position: fixed; top: 0px; left: 0px; width: 100%; background: rgb(0, 122, 204); color: white; text-align: center; padding: 8px 5px; font-size: 12px; z-index: 999999; font-family: sans-serif; box-sizing: border-box;">',
    '      <div>网页快照 · 测试版（已去除反调试脚本） | 原网址: <a href="https://powerbank.mieco.net/" target="_blank" style="color:white; text-decoration:underline;">https://powerbank.mieco.net/</a></div>',
    '      <div style="margin-top: 4px; font-weight: bold;">仅限授权账户访问 · 用于调试与设备测试</div>',
    '      <div style="margin-top: 8px;"><a href="/supportqi2" style="display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.65); color: #fff; padding: 4px 16px; border-radius: 999px; font-size: 12px; text-decoration: none;">QI 2.2 支持机型一览</a> </div>',
    "    </div>",
    '    <div id="root"></div>',
    "    " + loadingHtml,
    '    <script nonce="${scriptNonce}">' + loadingJs + "</script>",
    "  </body>",
    "</html>`;",
    "        return new Response(devAppHtml, { headers: applySecurityHeaders(devHeaders, true) });",
    "      }",
    "      if (url.pathname === '/supportqi2') {",
    "        const devQi2Html = `<!doctype html>",
    '<html lang="zh-CN">',
    "  <head>",
    '    <meta charset="UTF-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '    <meta name="robots" content="noindex" />',
    "    <title>QI 2.2 支持机型 · 测试版</title>",
    "  </head>",
    '  <body style="margin: 0; background: #f7f8fa; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei\', sans-serif;">',
    '    <div style="max-width: 720px; margin: 40px auto; padding: 0 16px;">',
    '      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 28px 32px;">',
    '        <h1 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 8px;">QI 2.2 支持机型（测试版）</h1>',
    '        <p style="font-size: 14px; color: #6b7280; margin: 0 0 20px; line-height: 1.7;">以下机型支持开启 / 关闭 QI 2.2 功能（25W 无线快充）。</p>',
    '        <div style="margin-top: 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #1e40af; line-height: 1.8;"><b>新版开启方式：</b>WPB1026S 使用加密设置协议，写入前会重新握手、读取电池健康度与循环次数，并在回读状态一致后才提示成功；固件差异可能导致个别设备无法开启。</div>',
    '        <div style="margin-top: 14px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #4b5563; line-height: 1.8;"><b>可能支持（未经测试）：</b>小米充电宝 磁吸自带线 10000 45W — WPB1025<br>是否支持 QI 2.2 暂时无法确认；应用内提供新加密协议与「未经测试尝试开启」按钮，可自行尝试。</div>',
    "      </div>",
    '      <div style="text-align: center; margin-top: 16px;"><a href="/" style="color: #2563eb; text-decoration: none; font-size: 13px;">← 返回测试版应用</a></div>',
    "    </div>",
    "  </body>",
    "</html>`;",
    "        return new Response(devQi2Html, { headers: applySecurityHeaders(devHeaders, true) });",
    "      }",
    "    }",
    "",
  ].join("\n");
  s = s.replace(anchor, anchor + devBlock);
}
// ---------- 15) readable asset refs (anti-debug guard no longer injected) ----------
{
  s = rep(
    s,
    "const successHeaders = new Headers();\n    successHeaders.set('content-type', 'text/html;charset=UTF-8');\n    const showMigrationNotice",
    "const successHeaders = new Headers();\n    successHeaders.set('content-type', 'text/html;charset=UTF-8');\n    successHeaders.append('Link', '</eco--usb-device-web/static/assets/index-17f0f8a6.v28.js>; rel=preload; as=script; crossorigin');\n    successHeaders.append('Link', '</eco--usb-device-web/static/assets/XiaomiPowerBankPanel-369974d1.v28.js>; rel=preload; as=script; crossorigin');\n    successHeaders.append('Link', '</eco--usb-device-web/static/assets/ModelData-16716423.v28.js>; rel=preload; as=script; crossorigin');\n    successHeaders.append('Link', '</eco--usb-device-web/static/assets/index-30406512.v28.css>; rel=preload; as=style; crossorigin');\n    const showMigrationNotice",
    "early hints links",
    1,
  );

// static module tags -> inline DOMContentLoaded + dynamic import (more robust behind edge injection)
s = rep(
  s,
  '    <script type="module" crossorigin src="/eco--usb-device-web/static/assets/index-17f0f8a6.js" nonce="${scriptNonce}"></script>',
  '    <script nonce="${scriptNonce}">document.addEventListener("DOMContentLoaded", function () { import("/eco--usb-device-web/static/assets/index-17f0f8a6.v28.js").catch(function () {}); });</script>',
  "app bootstrap import",
  2,
);
s = rep(
  s,
  '    <script type="module" crossorigin src="/eco--usb-device-web/static/assets/index-dev-a2.js" nonce="${scriptNonce}"></script>',
  '    <script nonce="${scriptNonce}">document.addEventListener("DOMContentLoaded", function () { import("/eco--usb-device-web/static/assets/index-dev-a2.v28.js").catch(function () {}); });</script>',
  "dev bootstrap import",
  1,
);

for (const [from, to, n, label] of [
    ["index-17f0f8a6.js", "index-17f0f8a6.v28.js", 2, "index refs"],
    ["react-vendor-252eb283.js", "react-vendor-252eb283.read.js", 3, "vendor refs"],
    ["XiaomiPowerBankPanel-369974d1.js", "XiaomiPowerBankPanel-369974d1.v28.js", 3, "xpanel refs"],
    ["ModelData-16716423.js", "ModelData-16716423.v28.js", 3, "modeldata refs"],
    ["index-30406512.css", "index-30406512.v28.css", 3, "css refs"],
    ["index-dev-a2.js", "index-dev-a2.v28.js", 1, "dev refs"],
  ]) {
    s = rep(s, from, to, "readable " + label, n);
  }
}

const out = path.join(WORK, "dist");
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "worker.js"), s, "utf8");
console.log("worker built:", s.length, "chars");

// sanity greps
for (const t of [
  "const consoleGuardScript",
  "const _n = function()",
  "e.isTrusted",
  "isTrusted guards",
  "new Uint8Array(9999999)",
  "debugger",
  "__mieco_guard_hold",
  "guardLoop",
  "rel=preload",
  "index-17f0f8a6.v28.js",
  "index-30406512.v28.css",
  "WPB1026S",
  "WPB0525S",
  "可能支持（未经测试）",
  "url.pathname === '/supportqi2'",
  "DROP TABLE",
  "navigator.plugins",
  "import(\"/eco--usb-device-web/static/assets/index-17f0f8a6.v28.js\")",
]) {
  console.log("count", t, count(s, t));
}
console.log("sanity checks passed");
