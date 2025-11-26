// src/features/home/HomeVisitante.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function HomeVisitante() {
  // Asegúrate de usar la URL de tu imagen de ilustración aquí
  const HERO_ILLUSTRATION = 'https://imgproxy.domestika.org/unsafe/w:1200/rs:fill/plain/src://blog-post-open-graph-covers/000/013/653/13653-original.jpg?1738232517';

  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* HEADER PÚBLICO (Navbar) */}
      <header className="p-4 md:px-12 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm">
        <div className="text-2xl font-extrabold text-pink-600 tracking-tight">
          Testimonial CMS
        </div>
        <Link 
          to="/login" 
          className="px-6 py-2 bg-pink-600 text-white font-medium rounded-full hover:bg-pink-700 transition shadow-md"
        >
          Iniciar Sesión
        </Link>
      </header>

      {/* SECCIÓN PRINCIPAL HERO - GRID DE DOS COLUMNAS */}
      <main className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Lado Izquierdo: IMAGEN */}
        <div className="flex justify-center md:justify-start order-2 md:order-1"> 
          <img 
            src={HERO_ILLUSTRATION}
            alt="Ilustración de gestión de testimonios" 
            className="max-w-3xl w-full h-auto rounded-3xl shadow-xl border border-gray-100 transform hover:scale-105 transition-transform duration-300" 
          />
        </div>

        {/* Lado Derecho: TEXTO CONVINCENTE Y CTA */}
        <div className="text-center md:text-left order-1 md:order-2 self-center"> 
          
          {/* TAGLINE REFINADO */}
          <p className="text-pink-600 text-base font-semibold uppercase mb-3 tracking-widest">
             Para instituciones y empresas con comunidades activas
          </p>
          
          {/* TÍTULO PRINCIPAL REFINADO */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Transforma cada historia en tu mejor vendedor
          </h1>
          
          {/* DESCRIPCIÓN REFINADA */}
          <p className="text-xl text-gray-700 mb-10 max-w-xl md:max-w-none text-justify">
            Nuestro CMS especializado en EdTech te ayuda a recopilar, organizar y publicar testimonios en distintos formatos con funciones de curaduría, moderación y analítica de engagement.


          </p>

          {/* Call to Action REFINADO (Gris Oscuro) */}
          <button 
            className="px-10 py-3 bg-gray-900 text-white text-xl font-semibold rounded-full shadow-xl hover:bg-gray-700 transition duration-300"
          >
            Empezar Gratis
          </button>
        </div>

      </main>
      
    </div>
  );
}

export default HomeVisitante;