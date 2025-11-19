import { Home, MessageSquare, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600">Testimonial CMS</h1>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium">
              <Home className="w-5 h-5" />
              Dashboard
            </a>
          </li>
          <li>
            <a href="/testimonials" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <MessageSquare className="w-5 h-5" />
              Testimonios
            </a>
          </li>
          <li>
            <a href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
              Configuración
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}