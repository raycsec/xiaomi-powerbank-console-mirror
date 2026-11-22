import React, { useState } from "react";
import { useI18n } from "../context/I18nContext.jsx";
import { checkWebHidSupport } from "../hid/browserSupport.js";

export default function BrowserGate({ children }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const { supported } = checkWebHidSupport();

  if (supported) return <>{children}</>;

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="mirror-app">
      <div className="card" style={{ maxWidth: 520, margin: "48px auto", textAlign: "center" }}>
        <span className="badge badge--red">WebHID Unavailable</span>
        <h2 className="card-title-xl" style={{ marginTop: 14 }}>{t("browser_unsupported_title")}</h2>
        <p className="card-subtitle" style={{ marginTop: 10, lineHeight: 1.7 }}>
          {t("browser_unsupported_desc")}
        </p>
        <div style={{ marginTop: 20 }}>
          <button type="button" className="ui-btn ui-btn--primary" onClick={copyUrl}>
            {copied ? t("browser_copied") : t("browser_copy_url")}
          </button>
        </div>
      </div>
    </div>
  );
}
