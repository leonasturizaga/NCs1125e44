// src/components/layout/Sidebar.jsx
import { 
    FiHome, 
    FiMessageSquare, 
    FiSettings, 
    FiUsers, 
    FiBarChart2, 
    FiLogOut,
    FiPlayCircle
} from "react-icons/fi";
import { useLayout } from "../../context/LayoutContext";

export default function Sidebar() {
    const { currentPage, setCurrentPage } = useLayout();

    const baseClasses = "flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full text-left font-medium";
    const activeClasses = "bg-indigo-600 text-white shadow-md";
    const inactiveClasses = "text-gray-300 hover:bg-gray-700";

    return (
        <aside className="flex flex-col h-full w-64 bg-gray-800 text-gray-100 shadow-2xl">
            
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-white">Testimonial CMS</h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">

                <button
                    onClick={() => setCurrentPage("dashboard")}
                    className={`${baseClasses} ${currentPage === "dashboard" ? activeClasses : inactiveClasses}`}
                >
                    <FiBarChart2 className="w-5 h-5" />
                    Dashboard
                </button>

                <button
                    onClick={() => setCurrentPage("users")}
                    className={`${baseClasses} ${currentPage === "users" ? activeClasses : inactiveClasses}`}
                >
                    <FiUsers className="w-5 h-5" />
                    Usuarios
                </button>

                <button
                    onClick={() => setCurrentPage("testimonials")}
                    className={`${baseClasses} ${currentPage === "testimonials" ? activeClasses : inactiveClasses}`}
                >
                    <FiMessageSquare className="w-5 h-5" />
                    Testimonios
                </button>

                <button
                    onClick={() => setCurrentPage("videoTestimonials")}
                    className={`${baseClasses} ${currentPage === "videoTestimonials" ? activeClasses : inactiveClasses}`}
                >
                    <FiPlayCircle className="w-5 h-5" />
                    Videos
                </button>

                <button
                    onClick={() => setCurrentPage("settings")}
                    className={`${baseClasses} ${currentPage === "settings" ? activeClasses : inactiveClasses}`}
                >
                    <FiSettings className="w-5 h-5" />
                    Configuración
                </button>

                <button
                    onClick={() => setCurrentPage("home")}
                    className={`${baseClasses} ${currentPage === "home" ? "bg-gray-700 text-indigo-400" : "text-gray-400 hover:bg-gray-700"}`}
                >
                    <FiHome className="w-5 h-5" />
                    Home
                </button>

            </nav>

            <div className="p-4 border-t border-gray-700">
                <button className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-gray-700 rounded-lg w-full font-medium transition">
                    <FiLogOut className="w-5 h-5" />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}
