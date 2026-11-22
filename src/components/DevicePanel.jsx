import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext.jsx";
import { usePowerBank } from "../hooks/usePowerBank.js";
import { CHARGE_STATE_KEYS, FAULT_KEYS } from "../protocol/constants.js";
import { formatLocalDateTime } from "../utils/formatTime.js";
import CopyableText from "./CopyableText.jsx";
import Qi2Card from "./Qi2Card.jsx";

export default function DevicePanel() {
  const { lang, t } = useI18n();
  const pb = usePowerBank();
  const [activeTab, setActiveTab] = useState("details");

  if (!pb.isConnected || !pb.battery) {
    return (
      <>
        <section className="card">
          <h2 className="card-title-lg" style={{ marginBottom: 18 }}>{t("how_title")}</h2>
          <div className="step-row">
            <div className="step-num">1</div>
            <div>
              <div style={{ fontWeight: 600 }}>{t("how_step1_desc")}</div>
            </div>
          </div>
          <div className="step-row">
            <div className="step-num">2</div>
            <div>
              <div style={{ fontWeight: 600 }}>{t("how_step2_desc")}</div>
            </div>
          </div>
          <div className="step-row" style={{ marginBottom: 22 }}>
            <div className="step-num">3</div>
            <div>
              <div style={{ fontWeight: 600 }}>{t("how_step3_desc")}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="ui-btn ui-btn--primary" style={{ minWidth: 180 }} onClick={pb.connectWebHid}>
              {t("connect_button")}
            </button>
            <Link to="/models" className="ui-btn ui-btn--neutral">
              {t("how_models_link")}
            </Link>
          </div>
        </section>

        <section className="card">
          <h2 className="card-title-lg" style={{ marginBottom: 16 }}>{t("empty_title")}</h2>
          <div className="ui-tabs">
            <div className="ui-tab is-active">{t("tab_details")}</div>
            <div className="ui-tab">{t("tab_history")}</div>
          </div>
          <div className="inner-panel" style={{ textAlign: "center", color: "var(--text-faint)", padding: "38px 20px" }}>
            {t("empty_desc")}
          </div>
        </section>
      </>
    );
  }

  const modelConfig = pb.hello?.modelConfig;
  const display = modelConfig?.display || {};
  const firstParsed = Object.values(pb.cellIds).find((c) => c.parsed)?.parsed;
  const tempRange = pb.tempModel?.success
    ? `${pb.tempModel.lowTemp}℃~${pb.tempModel.highTemp}℃`
    : modelConfig?.tempRange || "-20℃~60℃";
  const tempSensors = pb.cells.filter((c) => c.hasTemperatureSensor);

  return (
    <>
      <Qi2Card
        modelConfig={modelConfig}
        qi2Status={pb.qi2Status}
        busy={pb.qi2Busy}
        stage={pb.qi2Stage}
        error={pb.qi2Error}
        onToggle={pb.toggleQi2}
      />

      <section className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h2 className="card-title-lg">{t("connected_title")}</h2>
            <span className="badge badge--blue">{t(CHARGE_STATE_KEYS[pb.battery.chargeState] || "status_unknown")}</span>
            <span className={`badge ${pb.battery.faultType ? "badge--red" : "badge--green"}`}>
              {t(FAULT_KEYS[pb.battery.faultType] || "fault_normal")}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: "var(--text-faint)", whiteSpace: "nowrap" }}>{t("updated_just_now")}</span>
            <button type="button" className="ui-btn ui-btn--neutral ui-btn--sm" onClick={pb.refresh}>{t("refresh_button")}</button>
            <button type="button" className="ui-btn ui-btn--neutral ui-btn--sm" onClick={pb.disconnect}>
              {t("disconnect_button")}
            </button>
          </div>
        </div>

        <div className="battery-bar-wrap">
          <div className="battery-bar-head">
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{t("field_battery_level")}</span>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{pb.battery.level}%</span>
          </div>
          <div className="battery-bar-track">
            <div className="battery-bar-fill" style={{ width: `${Math.min(100, Math.max(0, pb.battery.level))}%` }} />
          </div>
          <div className="battery-summary">
            <span>{t("field_battery_health")} <strong>{pb.battery.health}%</strong></span>
            <span>{t("field_cycle_count")} <strong>{pb.battery.cycleCount} {t("field_cycle_unit")}</strong></span>
            <span>{t("section_temperature")} <strong>{pb.battery.temperature} °C</strong></span>
            <span>
              {t("field_total_voltage")} <strong className="mono">{(pb.battery.voltage / 1000).toFixed(2)} V · {(pb.battery.current / 1000).toFixed(2)} A</strong>
            </span>
          </div>
        </div>

        <div className="ui-tabs">
          <button type="button" className={`ui-tab ${activeTab === "details" ? "is-active" : ""}`} style={{ border: 0, background: "none", cursor: "pointer" }} onClick={() => setActiveTab("details")}>
            {t("tab_details")}
          </button>
          <button type="button" className={`ui-tab ${activeTab === "history" ? "is-active" : ""}`} style={{ border: 0, background: "none", cursor: "pointer" }} onClick={() => setActiveTab("history")}>
            {t("tab_history")} ({pb.history.length})
          </button>
        </div>

        {activeTab === "details" && (
          <div className="inner-panel">
            <div className="info-section">
              <div className="info-section__label">{t("section_basic")}</div>
              <div className="info-section__body">
                <div className="kv-row"><div className="kv-key">{t("field_product_name")}</div><div className="kv-val">{lang === "en" ? modelConfig?.nameEn : modelConfig?.name}</div></div>
                <div className="kv-row"><div className="kv-key">{t("field_product_model")}</div><div className="kv-val mono">{modelConfig?.model || "--"}</div></div>
                <div className="kv-row">
                  <div className="kv-key">{t("field_device_sn")}</div>
                  <div className="kv-val">
                    {display.showSerialNumber ? <CopyableText value={pb.hello?.serialNumber || "--"} /> : t("field_sn_hidden")}
                  </div>
                </div>
              </div>
            </div>

            <div className="info-section">
              <div className="info-section__label">{t("section_battery")}</div>
              <div className="info-section__body">
                <div className="kv-row"><div className="kv-key">{t("field_battery_health")}</div><div className="kv-val">{pb.battery.health}%</div></div>
                <div className="kv-row"><div className="kv-key">{t("field_cycle_count")}</div><div className="kv-val">{pb.battery.cycleCount} {t("field_cycle_unit")}</div></div>
                <div className="kv-row"><div className="kv-key">{t("field_battery_model")}</div><div className="kv-val mono">{pb.tempModel?.batteryModel || firstParsed?.miCodeInfo?.cellModel || "--"}</div></div>
                <div className="kv-row"><div className="kv-key">{t("field_battery_manufacturer")}</div><div className="kv-val">{lang === "en" ? firstParsed?.fixed?.assemblyFactoryEn || "--" : firstParsed?.fixed?.assemblyFactory || "--"}</div></div>
                <div className="kv-row"><div className="kv-key">{t("field_total_voltage")}</div><div className="kv-val mono">{(pb.battery.voltage / 1000).toFixed(2)} V</div></div>
              </div>
            </div>

            <div className="info-section">
              <div className="info-section__label">{t("section_temperature")}</div>
              <div className="info-section__body">
                {tempSensors.map((c) => (
                  <div key={c.index} className="kv-row">
                    <div className="kv-key">{t("field_temp_sensor", { index: c.index })}</div>
                    <div className="kv-val">{c.temperature} °C</div>
                  </div>
                ))}
                <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 6 }}>
                  {t("field_temp_range_tip", { range: tempRange })}
                </div>
              </div>
            </div>

            <div className="info-section">
              <div className="info-section__label">{t("section_cells")}</div>
              <div className="info-section__body">
                <table className="mirror-table">
                  <thead>
                    <tr>
                      <th>{t("col_cell")}</th>
                      <th>{t("col_voltage")}</th>
                      <th>{t("col_production_date")}</th>
                      {display.showCellSerialNumber && <th>{t("col_cell_sn")}</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {pb.cells.map((c) => (
                      <tr key={c.index}>
                        <td>{t("col_cell")} {c.index}</td>
                        <td className="mono">{(c.voltage / 1000).toFixed(3)} V</td>
                        <td className="mono">{pb.cellIds[c.index]?.parsed?.fixed?.productionDate || "--"}</td>
                        {display.showCellSerialNumber && (
                          <td><CopyableText value={pb.cellIds[c.index]?.raw || "--"} /></td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="inner-panel">
            {pb.history.length ? (
              <table className="mirror-table">
                <thead>
                  <tr>
                    <th style={{ width: 220 }}>{t("col_history_time")}</th>
                    <th>{t("col_history_type")}</th>
                    <th style={{ width: 140 }}>{t("col_history_value")}</th>
                  </tr>
                </thead>
                <tbody>
                  {pb.history.map((item, idx) => {
                    const isTemp = item.errorType >= 3 && item.errorType <= 6;
                    return (
                      <tr key={idx}>
                        <td className="mono">{formatLocalDateTime(item.timestamp)}</td>
                        <td>
                          <span className={`badge ${isTemp ? "badge--amber" : "badge--red"}`}>
                            {t(FAULT_KEYS[item.errorType] || "fault_normal")}
                          </span>
                        </td>
                        <td className="mono">{item.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: "center", color: "var(--text-faint)", padding: "32px 0" }}>
                {t("history_empty")}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
