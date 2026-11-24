import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext.js";

export default function ExceptionGuidePage() {
  const { t } = useI18n();
  return (
    <div className="mirror-app">
      <article className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="card-head-row" style={{ marginBottom: 14 }}>
          <h2 className="card-title-xl" style={{ margin: 0 }}>{t("guide_title")}</h2>
          <Link to="/" className="ui-btn ui-btn--neutral ui-btn--sm">← 返回</Link>
        </div>
        <p className="card-subtitle" style={{ marginBottom: 14 }}>{t("guide_intro_body")}</p>
        <div className="inner-group">
          <div className="kv-row" style={{ alignItems: "flex-start" }}>
            <span className="kv-label" style={{ fontWeight: 600, color: "#111827" }}>充电 / 放电高温</span>
            <span className="kv-value" style={{ textAlign: "left" }}>暂停充放电待冷却后使用，避免高温或密闭环境高功率输出。</span>
          </div>
          <div className="kv-row" style={{ alignItems: "flex-start" }}>
            <span className="kv-label" style={{ fontWeight: 600, color: "#111827" }}>电芯过压 / 欠压</span>
            <span className="kv-value" style={{ textAlign: "left" }}>断开所有线缆并重新插拔，建议更换原装或认证充电器。</span>
          </div>
          <div className="kv-row" style={{ alignItems: "flex-start" }}>
            <span className="kv-label" style={{ fontWeight: 600, color: "#111827" }}>过流 / 短路保护</span>
            <span className="kv-value" style={{ textAlign: "left" }}>拔除负载设备，检查数据线与接口无异物后短按按键恢复。</span>
          </div>
        </div>
        <p className="card-subtitle" style={{ marginTop: 14, color: "#b45309" }}>{t("guide_warm_tips")}</p>
      </article>
    </div>
  );
}
