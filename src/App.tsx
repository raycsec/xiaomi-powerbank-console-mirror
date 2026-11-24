import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BrowserGate from "./components/BrowserGate.js";
import DevicePanel from "./components/DevicePanel.js";
import ExceptionGuidePage from "./components/ExceptionGuidePage.js";
import MirrorBanner from "./components/MirrorBanner.js";
import ModelsPage from "./components/ModelsPage.js";
import PageHeaderCard from "./components/PageHeaderCard.js";
import SupportQi2Page from "./components/SupportQi2Page.js";
import { I18nProvider, useI18n } from "./context/I18nContext.js";
import type { HidClient } from "./hid/HidClient.js";

export type LabSlotComponent = React.ComponentType<{
  client: HidClient | null;
  currentCycles: number | null | undefined;
  onApplied?: (cycles?: number) => void;
}>;

function ShellRoutes({ labSlot }: { labSlot?: LabSlotComponent | null }) {
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

export default function App({ labSlot = null }: { labSlot?: LabSlotComponent | null }) {
  return (
    <I18nProvider>
      <BrowserRouter>
        <ShellRoutes labSlot={labSlot} />
      </BrowserRouter>
    </I18nProvider>
  );
}
