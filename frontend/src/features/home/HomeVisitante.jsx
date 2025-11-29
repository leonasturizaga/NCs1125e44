//-----------------version 1 --------------------
// frontend/src/features/home/HomeVisitante.jsx
// import { Home, MessageSquare, Settings, LogOut, LogIn } from "lucide-react";

// export default function HomeVisitante() {
//   return (
//     <div className="text-center py-12">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Visitante</h1>
//       <p className="text-gray-600">Contenido HomeVisitante</p>

//       <nav className="flex-1 px-4">
//         <ul className="space-y-2">
//           <li>
//             <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium">
//               <Home className="w-5 h-5" />
//               Dashboard
//             </a>
//           </li>
//           <li>
//             <a href="/testimonials" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
//               <MessageSquare className="w-5 h-5" />
//               Testimonios
//             </a>
//           </li>
//           <li>
//             <a href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
//               <Settings className="w-5 h-5" />
//               Configuración
//             </a>
//           </li>
//           <li>
//             <a href="/login" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
//               <LogIn className="w-5 h-5" />
//               Login
//             </a>
//           </li>

//         </ul>
//       </nav>
//             <div className="p-4 border-t">
//         <button href="/settings" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
//           <Home className="w-5 h-5" />
//           Home
//         </button>
//       </div>
      
//     </div>
//   );
// }

//----------------- version 2 --------------------
// frontend/src/features/home/HomeVisitante.jsx
// src/features/home/HomeVisitante.jsx
// import { NavLink } from "react-router-dom";
// import { Home, MessageSquare, Settings, LogOut, LogIn } from "lucide-react";

// export default function HomeVisitante() {
//   return (
//     <div className="text-center py-12">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Visitante</h1>
//       <p className="text-gray-600">Contenido HomeVisitante</p>

//       <nav className="mt-8 max-w-md mx-auto space-y-3">
//         <NavLink
//           to="/dashboard"
//           className="flex items-center gap-3 px-6 py-4 bg-gray-100 rounded-lg font-medium hover:bg-indigo-100 transition"
//         >
//           <Home className="w-5 h-5" />
//           Dashboard
//         </NavLink>

//         <NavLink
//           to="/testimonials"
//           className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-gray-100 transition"
//         >
//           <MessageSquare className="w-5 h-5" />
//           Testimonios
//         </NavLink>

//         <NavLink
//           to="/settings"
//           className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-gray-100 transition"
//         >
//           <Settings className="w-5 h-5" />
//           Configuración
//         </NavLink>

//         <NavLink
//           to="/login"
//           className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-gray-100 transition"
//         >
//           <LogIn className="w-5 h-5" />
//           Login
//         </NavLink>
//       </nav>
//     </div>
//   );
// }
//----------------- version 3 --------------------
// src/features/home/HomeVisitante.jsx

import React, { useState } from 'react'; // 💡 IMPORTAR useState
import { Link } from 'react-router-dom';
import VisitorMenu from '../../shared/components/VisitorMenu'; // 💡 IMPORTAR EL MENÚ

function HomeVisitante() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 💡 Estado del menú
    const HERO_ILLUSTRATION = 'https://imgproxy.domestika.org/unsafe/w:1200/rs:fill/plain/src://blog-post-open-graph-covers/000/013/653/13653-original.jpg?1738232517'; 

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            
            {/* HEADER PÚBLICO (CON LÓGICA DE DROPDOWN) */}
            <header className="p-4 md:px-12 border-b border-gray-700 flex justify-between items-center bg-gray-800 shadow-md relative z-40">
                
                {/* 1. Logo/Marca - TOGGLE DEL MENÚ */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} // 💡 Alterna el estado
                    className="text-2xl font-extrabold text-white tracking-tight hover:text-indigo-400 transition cursor-pointer"
                >
                    Testimonial CMS
                </button>
                
                {/* 2. Botón de Login (Oculto en móvil, se maneja por el dropdown) */}
                <Link 
                    to="/login" 
                    className="hidden sm:inline-block px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md"
                >
                    Iniciar Sesión
                </Link>

                {/* 3. MENÚ DESPLEGABLE */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 ml-4">
                        <VisitorMenu onClose={() => setIsMenuOpen(false)} />
                    </div>
                )}
            </header>

            {/* SECCIÓN PRINCIPAL HERO */}
            <main className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                
                {/* Lado Izquierdo: IMAGEN */}
                <div className="flex justify-center md:justify-start order-2 md:order-1">
                    <img 
                        src={HERO_ILLUSTRATION}
                        alt="Ilustración de gestión de testimonios" 
                        className="max-w-xl w-full h-auto rounded-3xl shadow-2xl border border-gray-700 bg-gray-800 p-4 transform hover:scale-105 transition-transform duration-300" 
                    />
                </div>

                {/* Lado Derecho: TEXTO CONVINCENTE Y CTA */}
                <div className="text-center md:text-left order-1 md:order-2 self-center"> 
                    
                    <p className="text-indigo-400 text-base font-semibold uppercase mb-3 tracking-widest">
                        PARA INSTITUCIONES Y EMPRESAS CON COMUNIDADES ACTIVAS
                    </p>
                    
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Transforma cada historia en tu mejor vendedor
                    </h1>
                    
                    <p className="text-xl text-gray-300 mb-10 max-w-xl md:max-w-none text-justify">
                        Nuestro CMS especializado en EdTech te ayuda a recopilar, organizar y publicar testimonios en distintos formatos con funciones de curaduría, moderación y analítica de engagement.
                    </p>

                    <button 
                        className="px-10 py-3 bg-indigo-600 text-white text-xl font-semibold rounded-lg shadow-2xl hover:bg-indigo-700 transition duration-300"
                    >
                        Empezar Gratis
                    </button>
                </div>

            </main>
            
        </div>
    );
}

export default HomeVisitante;