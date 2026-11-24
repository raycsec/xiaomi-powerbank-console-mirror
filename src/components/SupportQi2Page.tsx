import type {
  BatteryInfo,
  HandshakeResult,
  HidLogEntry,
  PowerBankModelConfig,
  Qi2ProtocolId,
  Qi2Stats,
} from "../types/domain.js";
import React, { useEffect, useRef, useState } from "react";
import { getQi2ModelGroups } from "../config/models.js";
import { useI18n } from "../context/I18nContext.js";
import { HidClient } from "../hid/HidClient.js";
import { WebHidTransport } from "../hid/WebHidTransport.js";
import { fetchQi2Stats, reportQi2Event } from "../services/qi2Telemetry.js";

export default function SupportQi2Page() {
  const { lang, t } = useI18n();
  const groups = getQi2ModelGroups();
  const [statsMap, setStatsMap] = useState<Record<string, Qi2Stats>>({});
  const [trialLog, setTrialLog] = useState<HidLogEntry[]>([]);
  const [currentState, setCurrentState] = useState<{ tone: string; text: string }>({ tone: "gray", text: "待测试" });
  const [busy, setBusy] = useState(false);
  const logBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const models = [...groups.supported, ...groups.experimental].map((m: PowerBankModelConfig) => m.model);
    Promise.all(models.map(async (model: string): Promise<[string, Qi2Stats | null]> => [model, await fetchQi2Stats(model)])).then((entries) => {
      const next: Record<string, Qi2Stats> = {};
      for (const [m, st] of entries) if (st) next[m] = st;
      setStatsMap(next);
    });
  }, []);

  useEffect(() => {
    const el = logBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [trialLog]);

  const runTrial = async (targetEnabled: boolean) => {
    setBusy(true);
    setCurrentState({ tone: "blue", text: targetEnabled ? "开启中…" : "关闭中…" });
    const collected: HidLogEntry[] = [];
    setTrialLog([]);
    let client: HidClient | null = null;
    let hello: HandshakeResult | null = null;
    let battery: BatteryInfo | null = null;
    let transport: WebHidTransport | null = null;

    try {
      transport = await WebHidTransport.request();
      if (!transport) {
        setCurrentState({ tone: "gray", text: "已取消" });
        return;
      }
      client = new HidClient(transport, {
        onLog: (entry: HidLogEntry) => {
          collected.push(entry);
          setTrialLog([...collected]);
        },
      });
      await client.open();
      hello = await client.handshake();
      try {
        battery = await client.getBatteryInfo();
      } catch {}
      const protocols: Qi2ProtocolId[] = hello.isEcho
        ? ["legacy"]
        : hello.modelConfig?.capabilities?.qi2?.protocols?.length
          ? hello.modelConfig.capabilities.qi2.protocols
          : ["encrypted", "encrypted-compat", "legacy"];
      const res = await client.setQi2(targetEnabled, protocols);
      const isEnabledNow = res.status?.enabled ?? targetEnabled;
      const detail = res.skipped
        ? `trial-skipped-already-${targetEnabled ? "on" : "off"}`
        : `trial-${res.protocol}-ok`;
      setCurrentState({
        tone: "green",
        text: isEnabledNow ? "已开启" : "已关闭",
      });
      await reportQi2Event({
        model: hello.modelConfig?.model || `ECHO_${(transport.info.productId || 0).toString(16).toUpperCase()}`,
        snBytes: hello.snBytes,
        fallbackSeed: `${hello.modelConfig?.model || "GENERIC"}:${transport.info.productId}`,
        action: targetEnabled,
        ok: true,
        detail,
        info: {
          protocol: `trial:${res.protocol}`,
          modelId: hello.modelId,
          snLen: hello.snBytes?.length ?? 0,
          health: battery?.health,
          cycles: battery?.cycleCount,
          level: battery?.level,
          temp: battery?.temperature,
          voltage: battery?.voltage,
          chgState: battery?.chargeState,
          fault: battery?.faultType,
          faultRaw: battery?.faultRaw,
          statusCode: battery?.statusCode,
          writeStatus: res.writeStatus ?? 0,
          skipped: res.skipped,
          readback: isEnabledNow,
          readbackTries: res.attempts,
        },
        devLogs: collected,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      collected.push({ at: new Date().toISOString(), direction: "ERROR", label: msg, hex: "" });
      setTrialLog([...collected]);
      setCurrentState({ tone: "red", text: "失败" });
      if (transport) {
        await reportQi2Event({
          model: hello?.modelConfig?.model || "GENERIC",
          snBytes: hello?.snBytes,
          fallbackSeed: `GENERIC:${transport.info.productId}`,
          action: targetEnabled,
          ok: false,
          detail: /read-back mismatch/i.test(msg) ? "trial-readback-mismatch" : `trial-exception:${msg}`,
          info: {
            protocol: "trial",
            modelId: hello?.modelId,
            snLen: hello?.snBytes?.length ?? 0,
            health: battery?.health,
            cycles: battery?.cycleCount,
            level: battery?.level,
            temp: battery?.temperature,
            voltage: battery?.voltage,
            chgState: battery?.chargeState,
            fault: battery?.faultType,
            faultRaw: battery?.faultRaw,
            statusCode: battery?.statusCode,
            message: msg,
          },
          devLogs: collected,
        });
      }
    } finally {
      if (client) await client.close().catch(() => {});
      setBusy(false);
    }
  };

  const renderBadge = (modelCode: string) => {
    const st = statsMap[modelCode];
    if (!st || st.total < 5) return null;
    const rate = Math.round(st.successRate * 100);
    const cls = st.errorRate > 0.3 ? "pill--amber" : st.errorRate < 0.1 ? "pill--green" : "pill--gray";
    return (
      <div style={{ marginTop: 6 }}>
        <span className={`pill ${cls}`}>
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
      {groups.supported.map((m: PowerBankModelConfig, idx: number) => (
        <div key={m.model} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px", marginTop: idx ? 10 : 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{idx + 1}. {lang === "en" ? m.nameEn : m.name}</div>
            {renderBadge(m.model)}
          </div>
          <span className="pill pill--blue">{m.model}</span>
        </div>
      ))}

      <div style={{ fontSize: 14, fontWeight: 700, margin: "18px 4px 10px" }}>{t("support_qi2_group_experimental")}</div>
      <p style={{ margin: "0 4px 4px", fontSize: 12, color: "var(--amber-text)" }}>{t("support_qi2_experimental_note")}</p>
      {groups.experimental.map((m: PowerBankModelConfig, idx: number) => (
        <div key={m.model} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px", marginTop: idx ? 10 : 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{idx + 1}. {lang === "en" ? m.nameEn : m.name}</div>
            {renderBadge(m.model)}
          </div>
          <span className="pill pill--amber">{m.model} · {t("models_qi2_experimental")}</span>
        </div>
      ))}

      {groups.unsupportedFirmware.length > 0 && (
        <>
          <div style={{ fontSize: 14, fontWeight: 700, margin: "18px 4px 10px" }}>{t("support_qi2_group_unsupported")}</div>
          {groups.unsupportedFirmware.map((m: PowerBankModelConfig, idx: number) => (
            <div key={m.model} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px", marginTop: idx ? 10 : 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{idx + 1}. {lang === "en" ? m.nameEn : m.name}</div>
              <span className="pill pill--red">{m.model} · {t("support_qi2_group_unsupported")}</span>
            </div>
          ))}
        </>
      )}

      <div className="card" style={{ marginTop: 18 }}>
        <div className="card-head-row" style={{ marginBottom: 10 }}>
          <div className="card-title-base">{t("support_qi2_trial_title")}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className="ui-btn ui-btn--neutral ui-btn--sm"
              onClick={() => navigator.clipboard?.writeText(trialLog.map((l: HidLogEntry) => `${l.direction} ${l.label} ${l.hex}`).join("\n"))}
            >
              {t("trial_copy_log")}
            </button>
            <button type="button" className="ui-btn ui-btn--neutral ui-btn--sm" onClick={() => setTrialLog([])}>
              {t("trial_clear_log")}
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <button type="button" className="ui-btn ui-btn--amber" disabled={busy} onClick={() => runTrial(true)}>
            {t("support_qi2_trial_on")}
          </button>
          <button type="button" className="ui-btn ui-btn--neutral" disabled={busy} onClick={() => runTrial(false)}>
            {t("support_qi2_trial_off")}
          </button>
          <span className={`pill pill--${currentState.tone}`}>当前状态：{currentState.text}</span>
        </div>
        <div ref={logBoxRef} className="proto-log-box">
          {trialLog.length ? (
            trialLog.map((l: HidLogEntry, idx: number) => (
              <div key={idx} className="proto-log-row">
                <span className={`proto-dir ${l.direction === "TX" ? "proto-dir--tx" : l.direction === "RX" ? "proto-dir--rx" : "proto-dir--err"}`}>
                  {l.direction}
                </span>
                <span className="proto-label">{l.label}</span>
                <span className="proto-hex mono">{l.hex}</span>
              </div>
            ))
          ) : (
            <div className="card-subtitle">{t("protocol_empty")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
