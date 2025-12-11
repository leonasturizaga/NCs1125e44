// src/components/layout/DashboardLayout.jsx

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLayout } from "../../context/LayoutContext";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";
import TestimonialList from "../../features/testimonials/pages/TestimonialList";
import UserList from "../../features/users/pages/UserList";
import HomeVisitante from "../../features/home/HomeVisitante";

// NUEVA IMPORTACIÓN
import VideoTestimonialsPage from "../../features/videoTestimonials/pages/VideoTestimonialsPage";
import CreateVideoTestimonial from "../../features/videoTestimonials/pages/CreateVideoTestimonial";

const pageComponents = {
  dashboard: <DashboardPage />,
  users: <UserList />,
  testimonials: <TestimonialList />,
  settings: <SettingsPage />,
  home: <HomeVisitante />,
  
  // NUEVA ENTRADA
  videoTestimonials: <VideoTestimonialsPage />,
  videoTestimonialsCreate: <CreateVideoTestimonial />,
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
