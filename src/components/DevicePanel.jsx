import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext.jsx";
import { usePowerBank } from "../hooks/usePowerBank.js";
import { CHARGE_STATE_KEYS, FAULT_KEYS } from "../protocol/constants.js";
import { formatLocalDateTime } from "../utils/formatTime.js";
import CopyableText from "./CopyableText.jsx";
import Qi2Card from "./Qi2Card.jsx";

const HISTORY_PAGE_SIZE = 5;

export default function DevicePanel({ labSlot: LabSlot = null }) {
  const { t, lang } = useI18n();
  const pb = usePowerBank();
  const [historyPage, setHistoryPage] = useState(1);

  const modelCfg = pb.hello?.modelConfig;
  const displayCfg = modelCfg?.display || { showSerialNumber: true, showCellSerialNumber: true };
  const qi2Cfg = modelCfg?.capabilities?.qi2;
  const tempRangeLabel =
    pb.tempModel?.success && pb.tempModel.lowTemp != null && pb.tempModel.highTemp != null
      ? `${pb.tempModel.lowTemp}℃~${pb.tempModel.highTemp}℃`
      : modelCfg?.tempRange || "-20℃~60℃";

  const totalHistoryPages = Math.max(1, Math.ceil(pb.history.length / HISTORY_PAGE_SIZE));
  const safePage = Math.min(historyPage, totalHistoryPages);
  const pagedHistory = pb.history.slice((safePage - 1) * HISTORY_PAGE_SIZE, safePage * HISTORY_PAGE_SIZE);

  if (!pb.isConnected) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card">
          <div className="card-head-row" style={{ alignItems: "flex-start" }}>
            <div>
              <div className="card-title-base">{t("empty_title")}</div>
              <p className="card-subtitle" style={{ marginTop: 4 }}>{t("empty_desc")}</p>
            </div>
            <Link to="/models" className="ui-btn ui-btn--neutral ui-btn--sm">{t("how_models_link")}</Link>
          </div>
          <div className="steps-grid" style={{ marginTop: 16 }}>
            <div className="step-item">
              <div className="step-title">{t("how_step1_title")}</div>
              <div className="step-desc">{t("how_step1_desc")}</div>
            </div>
            <div className="step-item">
              <div className="step-title">{t("how_step2_title")}</div>
              <div className="step-desc">{t("how_step2_desc")}</div>
            </div>
            <div className="step-item">
              <div className="step-title">{t("how_step3_title")}</div>
              <div className="step-desc">{t("how_step3_desc")}</div>
            </div>
          </div>
          <div style={{ marginTop: 18 }}>
            <button type="button" className="ui-btn ui-btn--primary" onClick={pb.connectWebHid}>
              {t("connect_button")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card">
        <div className="card-head-row">
          <div>
            <div className="card-title-lg">{lang === "en" ? modelCfg?.nameEn : modelCfg?.name}</div>
            <div className="card-subtitle" style={{ marginTop: 4 }}>
              {modelCfg?.model}
              {modelCfg?.connection && modelCfg.connection !== "--" ? ` · ${modelCfg.connection}` : ""}
            </div>
          </div>
          <button type="button" className="ui-btn ui-btn--danger-outline ui-btn--sm" onClick={pb.disconnect}>
            {t("disconnect_button")}
          </button>
        </div>

        <div className="kpi-grid">
          <div className="kpi-item">
            <div className="kpi-label">{t("field_battery_level")}</div>
            <div className="kpi-value">{pb.battery?.level ?? "--"}%</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-label">{t("field_battery_health")}</div>
            <div className="kpi-value">{pb.battery?.health ?? "--"}%</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-label">{t("field_cycle_count")}</div>
            <div className="kpi-value">{pb.battery?.cycleCount ?? "--"}</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-label">{t("section_temperature")}</div>
            <div className="kpi-value">{pb.battery?.temperature ?? "--"} °C</div>
          </div>
        </div>

        <div className="inner-group">
          {displayCfg.showSerialNumber && (
            <div className="kv-row">
              <span className="kv-label">{t("field_device_sn")}</span>
              <span className="kv-value mono">
                <CopyableText value={pb.hello?.serialNumber} />
              </span>
            </div>
          )}
          <div className="kv-row">
            <span className="kv-label">{t("field_total_voltage")}</span>
            <span className="kv-value mono">
              {pb.battery ? `${(pb.battery.voltage / 1000).toFixed(2)} V / ${pb.battery.current} mA` : "--"}
            </span>
          </div>
          <div className="kv-row">
            <span className="kv-label">串并联拓扑</span>
            <span className="kv-value">
              {pb.battery ? `${pb.battery.series}S${pb.battery.parallel}P（共 ${pb.battery.cellCount} 节电芯）` : "--"}
            </span>
          </div>
          <div className="kv-row">
            <span className="kv-label">{t("field_charge_state")}</span>
            <span className="kv-value">{t(CHARGE_STATE_KEYS[pb.battery?.chargeState ?? 3])}</span>
          </div>
          <div className="kv-row">
            <span className="kv-label">{t("field_fault_status")}</span>
            <span className="kv-value">
              <span className={`pill ${pb.battery?.faultType ? "pill--red" : "pill--green"}`}>
                {t(FAULT_KEYS[pb.battery?.faultType ?? 0] || "fault_normal")}
              </span>
            </span>
          </div>
          <div className="kv-row">
            <span className="kv-label">{t("section_temperature")}</span>
            <span className="kv-value">
              {tempRangeLabel}
              {pb.tempModel?.batteryModel ? ` · ${pb.tempModel.batteryModel}` : ""}
            </span>
          </div>
        </div>
        <p className="card-subtitle" style={{ marginTop: 10 }}>
          {t("field_temp_range_tip", { range: tempRangeLabel })}
        </p>
      </div>

      {qi2Cfg && qi2Cfg.mode !== "none" && (
        <Qi2Card
          modelConfig={modelCfg}
          qi2Status={pb.qi2Status}
          busy={pb.qi2Busy}
          stage={pb.qi2Stage}
          error={pb.qi2Error}
          onToggle={pb.toggleQi2}
        />
      )}

      {LabSlot ? (
        <LabSlot client={pb.client} currentCycles={pb.battery?.cycleCount} onApplied={pb.refresh} />
      ) : null}

      <div className="card">
        <div className="card-head-row" style={{ marginBottom: 12 }}>
          <div className="card-title-base">{t("section_cells")}</div>
        </div>
        <div className="cell-grid">
          {pb.cells.map((cell) => {
            const idInfo = pb.cellIds[cell.index];
            const parsed = idInfo?.parsed;
            return (
              <div key={cell.index} className="cell-card">
                <div className="cell-card__head">
                  <strong>#{cell.index}</strong>
                  <span className="mono">{(cell.voltage / 1000).toFixed(2)} V</span>
                </div>
                <div className="cell-metrics-3">
                  <div>
                    <div className="cell-m-label">电压</div>
                    <div className="cell-m-val mono">{cell.voltage} mV</div>
                  </div>
                  <div>
                    <div className="cell-m-label">电流</div>
                    <div className="cell-m-val mono">{cell.current != null ? `${cell.current} mA` : "--"}</div>
                  </div>
                  <div>
                    <div className="cell-m-label">温度</div>
                    <div className="cell-m-val mono">{cell.hasTemperatureSensor ? `${cell.temperature} °C` : "--"}</div>
                  </div>
                </div>
                {displayCfg.showCellSerialNumber && idInfo?.raw && (
                  <div className="cell-meta">
                    <div>
                      <CopyableText value={idInfo.raw} className="mono" />
                    </div>
                    {parsed && (
                      <div className="cell-meta__sub">
                        {parsed.fixed.assemblyFactory} · {parsed.miCodeInfo.cellModel} · {parsed.fixed.batteryType} · {parsed.fixed.productionDate}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="card-head-row" style={{ marginBottom: 12 }}>
          <div className="card-title-base">{t("tab_history")}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="card-subtitle">
              {pb.history.length} 条 · {safePage}/{totalHistoryPages}
            </span>
            {pb.history.length > 0 && (
              <Link to="/exception-guide" className="ui-btn ui-btn--neutral ui-btn--sm">
                异常说明
              </Link>
            )}
          </div>
        </div>
        {pb.history.length === 0 ? (
          <div className="card-subtitle">{t("history_empty")}</div>
        ) : (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="mirror-table">
                <thead>
                  <tr>
                    <th>{t("col_history_time")}</th>
                    <th>{t("col_history_state")}</th>
                    <th>{t("col_history_type")}</th>
                    <th>{t("col_cell")}</th>
                    <th>{t("col_history_value")}</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedHistory.map((item, idx) => (
                    <tr key={`${item.timestamp}-${idx}`}>
                      <td className="mono">{formatLocalDateTime(item.timestamp)}</td>
                      <td>{item.stateLabel || "--"}</td>
                      <td>
                        <span className={`pill ${item.errorType ? "pill--amber" : "pill--green"}`}>
                          {item.nationalStandardFault || item.faultLabel || "--"}
                        </span>
                      </td>
                      <td>#{item.cellIndex}</td>
                      <td className="mono">{item.formattedValue ?? item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalHistoryPages > 1 && (
              <div className="pager-row">
                <button
                  type="button"
                  className="ui-btn ui-btn--neutral ui-btn--sm"
                  disabled={safePage <= 1}
                  onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                >
                  上一页
                </button>
                <button
                  type="button"
                  className="ui-btn ui-btn--neutral ui-btn--sm"
                  disabled={safePage >= totalHistoryPages}
                  onClick={() => setHistoryPage((p) => Math.min(totalHistoryPages, p + 1))}
                >
                  下一页
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
