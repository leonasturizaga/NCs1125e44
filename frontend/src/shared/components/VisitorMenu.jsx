// src/shared/components/VisitorMenu.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Settings, LogIn, Contact, Users2Icon } from "lucide-react";

// Lista de enlaces públicos y su ícono
const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/nosotros', icon: Users2Icon , label: 'Nosotros' },
    { to: '/testimonials', icon: MessageSquare, label: 'Testimonios' },
    { to: '/configuracion', icon: Settings, label: 'Configuración' },
    { to: '/contacto', icon: Contact, label: 'Contacto' },
    { to: '/login', icon: LogIn, label: 'Iniciar Sesión' },
];

function VisitorMenu({ onClose }) {
  return (
    // Contenedor principal del menú desplegable
    <div className="bg-gray-800 rounded-lg shadow-2xl p-2 w-56 text-gray-200 border border-gray-700">
      <nav>
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink 
                to={link.to} 
                onClick={onClose} // Cierra el menú al hacer clic
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-md transition duration-150 ${
                    isActive 
                      ? 'bg-indigo-600 text-white' 
                      : 'hover:bg-gray-700'
                  }`
                }
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default VisitorMenu;