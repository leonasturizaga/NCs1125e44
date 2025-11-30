//----------------- version 3 Sidebar.jsx --------------------------
// src/components/layout/Sidebar.jsx
import { FiHome, FiMessageSquare, FiSettings, FiUsers, FiBarChart2, FiLogOut } from "react-icons/fi";
import { useLayout } from "../../context/LayoutContext";

export default function Sidebar() {
  const { currentPage, setCurrentPage } = useLayout();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Testimonial CMS
        </h1>
      </div>

      <nav className="sidebar-nav">
        <div
          onClick={() => setCurrentPage("dashboard")}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all cursor-pointer ${
            currentPage === "dashboard" ? "nav-item-active" : "nav-item-inactive"
          }`}
        >
          <FiBarChart2 className="w-5 h-5" />
          Dashboard
        </div>

        <div
          onClick={() => setCurrentPage("users")}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all cursor-pointer ${
            currentPage === "users" ? "nav-item-active" : "nav-item-inactive"
          }`}
        >
          <FiUsers className="w-5 h-5" />
          Usuarios
        </div>

        <div
          onClick={() => setCurrentPage("testimonials")}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all cursor-pointer ${
            currentPage === "testimonials" ? "nav-item-active" : "nav-item-inactive"
          }`}
        >
          <FiMessageSquare className="w-5 h-5" />
          Testimonios
        </div>

        <div
          onClick={() => setCurrentPage("settings")}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all cursor-pointer ${
            currentPage === "settings" ? "nav-item-active" : "nav-item-inactive"
          }`}
        >
          <FiSettings className="w-5 h-5" />
          Configuración
        </div>
        <div
          onClick={() => setCurrentPage("home")}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all cursor-pointer ${
            currentPage === "/" ? "nav-item-active" : "nav-item-inactive"
          }`}
        >
          <FiHome className="w-5 h-5" />
          Home
        </div>

      </nav>

      <div className="sidebar-footer">
        <button className="flex items-center gap-3 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl w-full font-medium transition">
          <FiLogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}