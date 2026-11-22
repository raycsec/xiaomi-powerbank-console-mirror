import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../context/I18nContext.jsx";
import { APP_VERSION } from "../services/qi2Telemetry.js";

const NEW_SITE = "https://mirror-mieco.raycsec.com/";
const REPO_URL = "https://github.com/raycsec/xiaomi-powerbank-console-mirror";
const LEGACY_HOST = "mirror-mieco.nalaniflynn.cn";

export default function MirrorBanner() {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const isSupportQi2 = pathname === "/supportqi2";
  const showMigration = typeof window !== "undefined" && window.location.hostname === LEGACY_HOST;

  return (
    <div className="mirror-banner">
      <div className="mirror-banner__inner">
        <div className="mirror-banner__text">
          <div className="mirror-banner__line1">
            重构版本 {APP_VERSION} - 版本日期: 2026/10/15 20:00:46 | 原网址：{" "}
            <a href="https://powerbank.mieco.net/" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
              https://powerbank.mieco.net/
            </a>{" "}
            · 此重构版本支持部分设备 Qi2.2 开启和关闭配置
          </div>
          <div className="mirror-banner__line2">
            仅供学习研究，不推荐非官方修改设备行为，相关安全与法律风险请自行承担
          </div>
          <div style={{ marginTop: 4, fontSize: 11, opacity: 0.9 }}>
            开源地址：
            <a href={REPO_URL} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
              github.com/raycsec/xiaomi-powerbank-console-mirror
            </a>
          </div>
          {showMigration ? (
            <div style={{ marginTop: 4, fontSize: 11, fontWeight: 700 }}>
              网站即将迁移到{" "}
              <a href={NEW_SITE} style={{ color: "inherit", textDecoration: "underline" }}>
                {NEW_SITE}
              </a>
            </div>
          ) : null}
        </div>
        <Link to={isSupportQi2 ? "/" : "/supportqi2"} className="mirror-banner__btn">
          {isSupportQi2 ? "← 返回应用" : t("nav_support_qi2")}
        </Link>
      </div>
    </div>
  );
}
