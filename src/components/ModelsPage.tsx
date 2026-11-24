import React from "react";
import { getVisibleModels } from "../config/models.js";
import { useI18n } from "../context/I18nContext.js";

export default function ModelsPage() {
  const { lang, t } = useI18n();
  const models = getVisibleModels();

  return (
    <div className="card">
      <h2 className="card-title-xl" style={{ fontWeight: 500, marginBottom: 20 }}>
        {t("models_title")}
      </h2>
      <div style={{ background: "#f9f9f9", borderRadius: 16, padding: "22px 26px" }}>
        <table className="mirror-table">
          <thead>
            <tr>
              <th style={{ width: 72 }}>{t("models_col_index")}</th>
              <th>{t("models_col_name")}</th>
              <th style={{ width: 130 }}>{t("models_col_model")}</th>
              <th style={{ width: 120 }}>{t("models_col_port")}</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m, idx) => (
              <tr key={m.id}>
                <td>{idx + 1}</td>
                <td>{lang === "en" ? m.nameEn : m.name}</td>
                <td className="mono">{m.model}</td>
                <td className="mono">{m.connection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
