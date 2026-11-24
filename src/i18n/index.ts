import type { LocaleCode } from "../types/domain.js";
import zhCN from "./locales/zh-CN.js";
import en from "./locales/en.js";

export const LOCALE_PACKS: Record<LocaleCode, Record<string, string>> = {
  "zh-CN": zhCN,
  "zh-rCN": zhCN,
  en,
};

export function formatMessage(
  lang: LocaleCode | string,
  key: string,
  params: Record<string, string | number> | null = null,
): string {
  const pack = LOCALE_PACKS[lang as LocaleCode] || zhCN;
  let text = pack[key] ?? zhCN[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}
