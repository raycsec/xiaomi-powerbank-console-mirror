import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BrowserGate from "./components/BrowserGate.jsx";
import DevicePanel from "./components/DevicePanel.jsx";
import ExceptionGuidePage from "./components/ExceptionGuidePage.jsx";
import MirrorBanner from "./components/MirrorBanner.jsx";
import ModelsPage from "./components/ModelsPage.jsx";
import PageHeaderCard from "./components/PageHeaderCard.jsx";
import SupportQi2Page from "./components/SupportQi2Page.jsx";
import { I18nProvider, useI18n } from "./context/I18nContext.jsx";

function ShellRoutes({ labSlot }) {
  const { t } = useI18n();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BrowserGate>
            <MirrorBanner />
            <div className="mirror-app">
              <PageHeaderCard title={t("app_title")} subtitle={t("app_subtitle")} />
              <div style={{ marginTop: 16 }}>
                <DevicePanel labSlot={labSlot} />
              </div>
            </div>
          </BrowserGate>
        }
      />
      <Route
        path="/models"
        element={
          <BrowserGate>
            <MirrorBanner />
            <div className="mirror-app">
              <PageHeaderCard title={t("models_title")} subtitle={t("app_subtitle")} showLangSwitch={false} />
              <div style={{ marginTop: 16 }}>
                <ModelsPage />
              </div>
            </div>
          </BrowserGate>
        }
      />
      <Route
        path="/supportqi2"
        element={
          <BrowserGate>
            <MirrorBanner />
            <div className="mirror-app">
              <SupportQi2Page />
            </div>
          </BrowserGate>
        }
      />
      <Route path="/exception-guide" element={<ExceptionGuidePage />} />
    </Routes>
  );
}

export default function App({ labSlot = null }) {
  return (
    <I18nProvider>
      <BrowserRouter>
        <ShellRoutes labSlot={labSlot} />
      </BrowserRouter>
    </I18nProvider>
  );
}
