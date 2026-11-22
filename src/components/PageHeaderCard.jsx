import React from "react";
import { useI18n } from "../context/I18nContext.jsx";

export default function PageHeaderCard({ title, subtitle, showLangSwitch = true }) {
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
            onChange={(e) => setLang(e.target.value)}
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
