import zhCN from "./locales/zh-CN.js";
import en from "./locales/en.js";

export const LOCALE_PACKS = {
  "zh-CN": zhCN,
  "zh-rCN": zhCN,
  en,
};

export function formatMessage(lang, key, params = null) {
  const pack = LOCALE_PACKS[lang] || zhCN;
  let text = pack[key] ?? zhCN[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}
