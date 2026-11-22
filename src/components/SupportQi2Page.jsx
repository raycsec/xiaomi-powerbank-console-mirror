import React, { useEffect, useState } from "react";
import { getQi2ModelGroups } from "../config/models.js";
import { useI18n } from "../context/I18nContext.jsx";
import { HidClient } from "../hid/HidClient.js";
import { WebHidTransport } from "../hid/WebHidTransport.js";
import { fetchQi2Stats, reportQi2Event } from "../services/qi2Telemetry.js";

export default function SupportQi2Page() {
  const { lang, t } = useI18n();
  const groups = getQi2ModelGroups();
  const [statsMap, setStatsMap] = useState({});
  const [trialLog, setTrialLog] = useState([]);
  const [trialStatus, setTrialStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const models = [...groups.supported, ...groups.experimental].map((m) => m.model);
    Promise.all(models.map(async (model) => [model, await fetchQi2Stats(model)])).then((entries) => {
      const next = {};
      for (const [m, st] of entries) if (st) next[m] = st;
      setStatsMap(next);
    });
  }, []);

  const runTrial = async (targetEnabled) => {
    setBusy(true);
    setTrialStatus("");
    const collected = [];
    setTrialLog([]);
    let client = null;
    let hello = null;
    let transport = null;

    try {
      transport = await WebHidTransport.request();
      if (!transport) return;
      client = new HidClient(transport, {
        onLog: (entry) => {
          collected.push(entry);
          setTrialLog([...collected]);
        },
      });
      await client.open();
      hello = await client.handshake();
      const protocols = hello.isEcho ? ["legacy"] : ["encrypted", "legacy"];
      const res = await client.setQi2(targetEnabled, protocols);
      const detail = res.skipped
        ? `trial-skipped-already-${targetEnabled ? "on" : "off"}`
        : `trial-${res.protocol}-ok`;
      setTrialStatus(res.skipped ? (targetEnabled ? "已处于开启状态" : "已处于关闭状态") : "尝试成功");
      await reportQi2Event({
        model: hello.modelConfig?.model || `ECHO_${(transport.info.productId || 0).toString(16).toUpperCase()}`,
        snBytes: hello.snBytes,
        fallbackSeed: `${hello.modelConfig?.model || "GENERIC"}:${transport.info.productId}`,
        action: targetEnabled,
        ok: true,
        detail,
        info: { protocol: `trial:${res.protocol}`, skipped: res.skipped, readback: res.status.enabled, readbackTries: res.attempts },
        devLogs: collected,
      });
    } catch (err) {
      const msg = err?.message || String(err);
      collected.push({ at: new Date().toISOString(), direction: "ERROR", label: msg, hex: "" });
      setTrialLog([...collected]);
      setTrialStatus(`尝试失败：${msg}`);
      if (transport) {
        await reportQi2Event({
          model: hello?.modelConfig?.model || "GENERIC",
          snBytes: hello?.snBytes,
          fallbackSeed: `GENERIC:${transport.info.productId}`,
          action: targetEnabled,
          ok: false,
          detail: /read-back mismatch/i.test(msg) ? "trial-readback-mismatch" : `trial-exception:${msg}`,
          info: { protocol: "trial", message: msg },
          devLogs: collected,
        });
      }
    } finally {
      if (client) await client.close().catch(() => {});
      setBusy(false);
    }
  };

  const renderBadge = (modelCode) => {
    const st = statsMap[modelCode];
    if (!st || st.total < 5) return null;
    const rate = Math.round(st.successRate * 100);
    const cls = st.errorRate > 0.3 ? "badge--amber" : st.errorRate < 0.1 ? "badge--green" : "badge--gray";
    return (
      <div style={{ marginTop: 6 }}>
        <span className={`badge ${cls}`}>
          {t("qi2_stats_badge", { rate, success: st.success, total: st.total })}
          {st.errorRate < 0.1 ? " ✓" : ""}
        </span>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div className="card">
        <h1 className="card-title-xl">{t("support_qi2_title")}</h1>
        <p className="card-subtitle">{t("support_qi2_subtitle")}</p>
      </div>

      <div style={{ fontSize: 14, fontWeight: 700, margin: "16px 4px 10px" }}>{t("support_qi2_group_supported")}</div>
      {groups.supported.map((m, idx) => (
        <div key={m.model} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px", marginTop: idx ? 10 : 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{idx + 1}. {lang === "en" ? m.nameEn : m.name}</div>
            {renderBadge(m.model)}
          </div>
          <span className="badge badge--blue">{m.model}</span>
        </div>
      ))}

      <div style={{ fontSize: 14, fontWeight: 700, margin: "18px 4px 10px" }}>{t("support_qi2_group_experimental")}</div>
      {groups.experimental.map((m, idx) => (
        <div key={m.model} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{idx + 1}. {lang === "en" ? m.nameEn : m.name}</div>
            {renderBadge(m.model)}
          </div>
          <span className="badge badge--amber">{m.model} · {t("models_qi2_experimental")}</span>
        </div>
      ))}

      <div style={{ fontSize: 14, fontWeight: 700, margin: "18px 4px 10px" }}>{t("support_qi2_group_unsupported")}</div>
      {groups.unsupportedFirmware.map((m, idx) => (
        <div key={m.model} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px" }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{idx + 1}. {lang === "en" ? m.nameEn : m.name}</div>
          <span className="badge badge--red">{m.model} · {t("support_qi2_group_unsupported")}</span>
        </div>
      ))}

      <div className="card" style={{ marginTop: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{t("support_qi2_trial_title")}</div>
            <div style={{ fontSize: 12, color: "var(--amber-text)", marginTop: 2 }}>{t("support_qi2_trial_warn")}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className="ui-btn ui-btn--neutral ui-btn--sm"
              onClick={() => navigator.clipboard?.writeText(trialLog.map((l) => `${l.direction} ${l.label} ${l.hex}`).join("\n"))}
            >
              {t("trial_copy_log")}
            </button>
            <button type="button" className="ui-btn ui-btn--neutral ui-btn--sm" onClick={() => setTrialLog([])}>
              {t("trial_clear_log")}
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
          <button type="button" className="ui-btn ui-btn--amber" disabled={busy} onClick={() => runTrial(true)}>
            {t("support_qi2_trial_on")}
          </button>
          <button type="button" className="ui-btn ui-btn--neutral" disabled={busy} onClick={() => runTrial(false)}>
            {t("support_qi2_trial_off")}
          </button>
          {trialStatus && <span className="badge badge--gray">{trialStatus}</span>}
        </div>
        <div className="log-box">
          {trialLog.length ? trialLog.map((l, idx) => (
            <div key={idx} className="log-line">
              <span className={`log-tag ${l.direction === "TX" ? "log-tag--tx" : l.direction === "RX" ? "log-tag--rx" : "log-tag--err"}`}>
                {l.direction}
              </span>
              <span>{l.label}{l.hex ? ` → ${l.hex}` : ""}</span>
            </div>
          )) : t("protocol_empty")}
        </div>
      </div>
    </div>
  );
}
