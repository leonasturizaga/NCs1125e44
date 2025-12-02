//------------ version 3 ----------------
// src/components/layout/DashboardLayout.jsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLayout } from "../../context/LayoutContext";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";
import TestimonialList from "../../features/testimonials/pages/TestimonialList";

const pageComponents = {
  dashboard: <DashboardPage />,
  testimonials: <TestimonialList />,
  settings: <SettingsPage />,
};

export default function DashboardLayout() {
  const { currentPage } = useLayout();

  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <main className="layout-content">
          <div className="layout-container">
            {pageComponents[currentPage] || <DashboardPage />}
          </div>
        </main>
      </div>
    </div>
  );
}