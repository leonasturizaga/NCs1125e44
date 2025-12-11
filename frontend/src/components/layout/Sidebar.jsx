// src/components/layout/Sidebar.jsx
import {
  FiHome,
  FiMessageSquare,
  FiSettings,
  FiUsers,
  FiBarChart2,
  FiLogOut,
  FiPlayCircle,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { useLayout } from "../../context/LayoutContext";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const { currentPage, setCurrentPage } = useLayout();

  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse on mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseClasses =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium relative group";
  const activeClasses = "bg-indigo-600 text-white shadow-md";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700";

  const menuItem = (page, Icon, label) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`${baseClasses} ${
        currentPage === page ? activeClasses : inactiveClasses
      } ${collapsed ? "justify-center" : "w-full text-left"}`}
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span>{label}</span>}

      {/* Tooltip on hover when collapsed */}
      {collapsed && (
        <span className="absolute left-14 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
          {label}
        </span>
      )}
    </button>
  );

  return (
    <aside
      className={`
        h-full bg-gray-800 text-gray-100 shadow-2xl sticky top-0 z-20 p-2 flex flex-col
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!collapsed ? (
          <h1 className="text-2xl font-bold text-white">Testimonial CMS</h1>
        ) : (
          <h1 className="text-xl font-bold text-white">CMS</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white transition"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        {menuItem("dashboard", FiBarChart2, "Dashboard")}
        {menuItem("users", FiUsers, "Usuarios")}
        {menuItem("testimonials", FiMessageSquare, "Testimonios")}
        {menuItem("videoTestimonials", FiPlayCircle, "Videos")}
        {menuItem("settings", FiSettings, "Configuración")}

        {/* Home special item */}
        <button
          onClick={() => setCurrentPage("home")}
          className={`${baseClasses} ${
            currentPage === "home"
              ? "bg-gray-700 text-indigo-400"
              : "text-gray-400 hover:bg-gray-700"
          } ${collapsed ? "justify-center" : "w-full text-left"}`}
        >
          <FiHome className="w-5 h-5" />
          {!collapsed && <span>Home</span>}
          {collapsed && (
            <span className="absolute left-14 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
              Home
            </span>
          )}
        </button>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-700">
        <button
          className={`flex items-center px-3 py-2 text-red-400 hover:bg-gray-700 rounded-lg w-full font-medium transition group relative ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <FiLogOut className="w-5 h-5" />
          {!collapsed && <>Cerrar sesión</>}

          {collapsed && (
            <span className="absolute left-14 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
              Cerrar sesión
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}