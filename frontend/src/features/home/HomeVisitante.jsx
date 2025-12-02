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
