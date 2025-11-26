//------------ version 2 ----------------
// src/components/layout/DashboardLayout.jsx   con context
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLayout } from "../../context/LayoutContext";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";
import TestimonialsList from "../../features/testimonials/pages/TestimonialsList";
import TestimonialList from "../../features/testimonials/pages/TestimonialList";

const pageComponents = {
  dashboard: <DashboardPage />,
  testimonials: <TestimonialList />,
  settings: <SettingsPage />,
};

export default function DashboardLayout() {
  const { currentPage } = useLayout();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {pageComponents[currentPage] || <DashboardPage />}
        </main>
      </div>
    </div>
  );
}