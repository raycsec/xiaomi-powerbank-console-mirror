import React, { createContext, useContext, useMemo, useState } from "react";
import type { LocaleCode } from "../types/domain.js";
import { formatMessage } from "../i18n/index.js";

export interface I18nContextValue {
  lang: LocaleCode;
  setLang: (next: LocaleCode) => void;
  t: (key: string, params?: Record<string, string | number> | null) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLang(): LocaleCode {
  try {
    const saved = localStorage.getItem("mieco_lang");
    if (saved === "zh-CN" || saved === "en") return saved;
  } catch {}
  if (typeof navigator !== "undefined" && /^en/i.test(navigator.language || "")) {
    return "en";
  }
  return "zh-CN";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LocaleCode>(detectInitialLang);

  const setLang = (next: LocaleCode) => {
    setLangState(next);
    try {
      localStorage.setItem("mieco_lang", next);
    } catch {}
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: string, params?: Record<string, string | number> | null) => formatMessage(lang, key, params ?? null),
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
