//----------------- version 3 Sidebar.jsx --------------------------
// src/components/layout/Sidebar.jsx
import { FiHome, FiMessageSquare, FiSettings, FiUsers, FiBarChart2, FiLogOut } from "react-icons/fi";
import { useLayout } from "../../context/LayoutContext";

export default function Sidebar() {
    const { currentPage, setCurrentPage } = useLayout();

    return (
        // 1. REEMPLAZO DE .sidebar: Fondo Oscuro Fijo, Altura Completa
        <aside className="flex flex-col h-full w-64 bg-gray-800 text-gray-100 shadow-2xl">
            
            {/* 2. REEMPLAZO DE .sidebar-header: Encabezado */}
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-white">
                    Testimonial CMS
                </h1>
            </div>

            {/* 3. REEMPLAZO DE .sidebar-nav: Navegación Principal */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                
                {/* Dashboard */}
                <button // Cambiado a button para mantener la lógica onClick
                    onClick={() => setCurrentPage("dashboard")}
                    // Clase activa: Fondo Índigo sólido. Inactiva: Hover oscuro
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full text-left font-medium ${
                        currentPage === "dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700" 
                    }`}
                >
                    <FiBarChart2 className="w-5 h-5" />
                    Dashboard
                </button>

                {/* Usuarios */}
                <button
                    onClick={() => setCurrentPage("users")}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full text-left font-medium ${
                        currentPage === "users" ? "bg-indigo-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700" 
                    }`}
                >
                    <FiUsers className="w-5 h-5" />
                    Usuarios
                </button>

                {/* Testimonios */}
                <button
                    onClick={() => setCurrentPage("testimonials")}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full text-left font-medium ${
                        currentPage === "testimonials" ? "bg-indigo-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700" 
                    }`}
                >
                    <FiMessageSquare className="w-5 h-5" />
                    Testimonios
                </button>

                {/* Configuración */}
                <button
                    onClick={() => setCurrentPage("settings")}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full text-left font-medium ${
                        currentPage === "settings" ? "bg-indigo-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700" 
                    }`}
                >
                    <FiSettings className="w-5 h-5" />
                    Configuración
                </button>
                
                {/* Home (Público) */}
                <a // Usamos <a> ya que esto es una ruta externa o pública
                    href="/" 
                    onClick={() => setCurrentPage("home")} 
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full text-left font-medium ${
                        // Si la lógica de home fuera la activa, usaría la misma clase
                        currentPage === "home" ? "bg-gray-700 text-indigo-400" : "text-gray-400 hover:bg-gray-700" 
                    }`}
                >
                    <FiHome className="w-5 h-5" />
                    Home
                </a>

            </nav>

            {/* 4. REEMPLAZO DE .sidebar-footer: Cerrar Sesión */}
            <div className="p-4 border-t border-gray-700">
                <button className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-gray-700 rounded-lg w-full font-medium transition">
                    <FiLogOut className="w-5 h-5" />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}