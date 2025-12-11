// src/components/layout/Header.jsx
import { LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="p-4 bg-gray-800 border-b border-gray-700 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {user?.username || user?.email || "Usuario"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role || "visitante"}
              </p>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {(user?.username || user?.email || "U").charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}