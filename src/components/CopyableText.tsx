import React, { useState } from "react";
import { useI18n } from "../context/I18nContext.js";

export interface CopyableTextProps {
  value?: string | null;
  mono?: boolean;
  className?: string;
}

export default function CopyableText({ value, mono = true, className = "" }: CopyableTextProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  if (!value || value === "--") return <span className={`${mono ? "mono" : ""} ${className}`.trim()}>--</span>;

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
      className={`copyable-text ${mono ? "mono" : ""} ${copied ? "is-copied" : ""} ${className}`.trim()}
      onClick={handleCopy}
      onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => {
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
