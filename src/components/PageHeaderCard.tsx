import React from "react";
import { useI18n } from "../context/I18nContext.js";
import type { LocaleCode } from "../types/domain.js";

export interface PageHeaderCardProps {
  title: string;
  subtitle: string;
  showLangSwitch?: boolean;
}

export default function PageHeaderCard({ title, subtitle, showLangSwitch = true }: PageHeaderCardProps) {
  const { lang, setLang } = useI18n();

  return (
    <header className="card">
      <div className="card-header">
        <div>
          <h1 className="card-title-xl">{title}</h1>
          <p className="card-subtitle">{subtitle}</p>
        </div>
        {showLangSwitch && (
          <select
            className="lang-select"
            value={lang}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLang(e.target.value as LocaleCode)}
            aria-label="Language"
          >
            <option value="en">EN</option>
            <option value="zh-CN">中文</option>
          </select>
        )}
      </div>
    </header>
  );
}
