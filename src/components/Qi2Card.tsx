import type { PowerBankModelConfig, Qi2Status } from "../types/domain.js";
import React from "react";
import { useI18n } from "../context/I18nContext.js";

const STAGE_KEY_MAP: Record<string, string> = {
  handshake: "qi2_stage_handshake",
  writing: "qi2_stage_writing",
  readback: "qi2_stage_readback",
};

export interface Qi2CardProps {
  modelConfig?: PowerBankModelConfig | null;
  qi2Status?: Qi2Status | null;
  busy?: boolean;
  stage?: string;
  error?: string;
  onToggle: (targetEnabled: boolean) => void;
}

export default function Qi2Card({
  modelConfig,
  qi2Status,
  busy = false,
  stage = "",
  error = "",
  onToggle,
}: Qi2CardProps) {
  const { t } = useI18n();
  const qi2 = modelConfig?.capabilities?.qi2;
  if (!qi2 || qi2.mode === "none") return null;

  if (qi2.mode === "unsupported_firmware") {
    return (
      <section className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <h2 className="card-title-base">{t("qi2_card_unsupported_title")}</h2>
            <p className="card-subtitle">{t("qi2_card_unsupported_desc")}</p>
          </div>
          <span className="badge badge--red">{modelConfig?.model}</span>
        </div>
      </section>
    );
  }

  const enabled = qi2Status?.enabled === true;
  const isExperimental = qi2.mode === "experimental";
  const busyText = stage && STAGE_KEY_MAP[stage] ? t(STAGE_KEY_MAP[stage]) : t(enabled ? "qi2_btn_working" : "qi2_btn_enabling");

  return (
    <section className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <h2 className="card-title-base" style={{ margin: 0 }}>
            {enabled ? t("qi2_card_title_on") : t("qi2_card_title_off")}
          </h2>
          {enabled && <span className="badge badge--green">✓ {t("qi2_btn_enabled")}</span>}
        </div>
        <p className="card-subtitle" style={{ marginTop: 4 }}>
          {enabled ? t("qi2_card_desc_on") : t("qi2_card_desc_off")}
        </p>
        {isExperimental && (
          <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--amber-text)" }}>
            {t("qi2_card_experimental_tip")}
          </p>
        )}
        {error && <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--red-text)" }}>{error}</p>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        {enabled ? (
          qi2.allowDisable && (
            <button type="button" className="ui-btn ui-btn--neutral" disabled={busy} onClick={() => onToggle(false)}>
              {busy ? busyText : t("qi2_btn_disable")}
            </button>
          )
        ) : (
          <button
            type="button"
            className="ui-btn ui-btn--primary"
            disabled={busy}
            onClick={() => onToggle(true)}
          >
            {busy ? busyText : isExperimental ? t("qi2_btn_try") : t("qi2_btn_enable")}
          </button>
        )}
      </div>
    </section>
  );
}
