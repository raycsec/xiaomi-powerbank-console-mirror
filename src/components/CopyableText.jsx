import React, { useState } from "react";
import { useI18n } from "../context/I18nContext.jsx";

export default function CopyableText({ value, mono = true }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  if (!value || value === "--") return <span className={mono ? "mono" : ""}>--</span>;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <span
      role="button"
      tabIndex={0}
      title={t("copy_button")}
      className={`copyable-text ${mono ? "mono" : ""} ${copied ? "is-copied" : ""}`}
      onClick={handleCopy}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          void handleCopy();
        }
      }}
    >
      {value}
      {copied && <span className="copyable-toast">{t("copied_button")}</span>}
    </span>
  );
}
