//----------------- version 2 --------------------
// frontend/src/features/home/HomeVisitante.jsx
// src/features/home/HomeVisitante.jsx
import { NavLink } from "react-router-dom";
import { Home, MessageSquare, Settings, LogOut, LogIn } from "lucide-react";

export default function HomeVisitante() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Visitante</h1>
      <p className="text-gray-600">Contenido HomeVisitante</p>

      <nav className="mt-8 max-w-md mx-auto space-y-3">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 px-6 py-4 bg-gray-100 rounded-lg font-medium hover:bg-indigo-100 transition"
        >
          <Home className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="/testimonials"
          className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-gray-100 transition"
        >
          <MessageSquare className="w-5 h-5" />
          Testimonios
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-gray-100 transition"
        >
          <Settings className="w-5 h-5" />
          Configuración
        </NavLink>

        <NavLink
          to="/login"
          className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-gray-100 transition"
        >
          <LogIn className="w-5 h-5" />
          Login
        </NavLink>
      </nav>
    </div>
  );
}