import { Home, MessageSquare, Settings, LogOut, LogIn } from "lucide-react";

export default function HomeVisitante() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Visitante</h1>
      <p className="text-gray-600">Contenido HomeVisitante</p>

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
          <li>
            <a href="/login" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <LogIn className="w-5 h-5" />
              Login
            </a>
          </li>

        </ul>
      </nav>
            <div className="p-4 border-t">
        <button href="/settings" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>
      
    </div>
  );
}