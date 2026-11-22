import React from "react";
import { useI18n } from "../context/I18nContext.jsx";

export default function ExceptionGuidePage() {
  const { t } = useI18n();
  return (
    <div className="mirror-app">
      <article className="card" style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 className="card-title-xl" style={{ marginBottom: 16 }}>{t("guide_title")}</h2>
        <h3 className="card-title-base">{t("guide_intro_title")}</h3>
        <p className="card-subtitle" style={{ marginBottom: 16 }}>{t("guide_intro_body")}</p>
        <h3 className="card-title-base">{t("guide_handling_title")}</h3>
        <p style={{ margin: "8px 0" }}><strong>{t("guide_charge_ht_title")}</strong>：{t("guide_charge_ht_body")}</p>
        <p style={{ margin: "8px 0" }}><strong>{t("guide_discharge_ht_title")}</strong>：{t("guide_discharge_ht_body")}</p>
        <p style={{ margin: "8px 0" }}><strong>{t("guide_overvoltage_title")}</strong>：{t("guide_overvoltage_body")}</p>
        <div style={{ marginTop: 20, padding: "12px 16px", borderRadius: 10, background: "var(--amber-bg)", border: "1px solid var(--amber-border)", color: "var(--amber-text)", fontSize: 13 }}>
          {t("guide_warm_tips")}
        </div>
      </article>
    </div>
  );
}
