// src/shared/components/VisitorMenu.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
// Asegúrate de importar todos los íconos necesarios para las rutas públicas
import { Home, MessageSquare, Settings, LogIn, Contact, Users2Icon, Edit2 } from "lucide-react"; 
import { FiBarChart2 } from 'react-icons/fi'; // Aunque no lo uses, mantén la importación si la necesitas en otro lado

// Lista de enlaces que solo el visitante debe ver
const links = [
    { to: '/', icon: Home, label: 'Inicio' }, // Usamos 'Inicio' en lugar de 'Home'
    { to: '/nosotros', icon: Users2Icon , label: 'Nosotros' },
    { to: '/contacto', icon: Contact, label: 'Contacto' },
    // El enlace de Registro debe ir a la página de registro
    { to: '/register', icon: Edit2, label: 'Registro' }, 
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