import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { formatMessage } from "../i18n/index.js";

const STORAGE_KEY = "xiaomi-powerbank-lang";
const I18nContext = createContext({
  lang: "zh-CN",
  setLang: () => {},
  t: (key, params) => formatMessage("zh-CN", key, params),
});

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "en" || saved === "zh-CN" ? saved : "zh-CN";
    } catch {
      return "zh-CN";
    }
  });

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const t = useCallback((key, params) => formatMessage(lang, key, params), [lang]);

  useEffect(() => {
    document.title = t("app_title");
  }, [t]);

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
