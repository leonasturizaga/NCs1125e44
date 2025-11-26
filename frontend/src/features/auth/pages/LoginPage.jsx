// src/features/auth/pages/LoginPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi'; // Íconos para los inputs

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario de login (debe conectarse con authApi.js)
    console.log("Intentando iniciar sesión con diseño profesional oscuro...");
  };

  return (
    // Contenedor principal: Fondo Carbón Profundo
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-gray-200">
      
      {/* Tarjeta de Login: Fondo gris oscuro, esquinas redondeadas, sombra sutil */}
      <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        
        {/* Título: Texto claro y profesional */}
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Acceso al CMS
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Utiliza tus credenciales de administrador
        </p>

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo Electrónico"
                required
                // Inputs: Fondo más oscuro que la tarjeta, borde y acento Indigo (profesional)
                className="w-full pl-12 pr-5 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                required
                className="w-full pl-12 pr-5 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          
          {/* Botón Principal (Entrar): Acento Azul/Índigo */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg"
          >
            Iniciar Sesión
          </button>
                    {/* Botón login con Google */}
<div className="mt-4">
  <button
    type="button"
    onClick={() => console.log("Google Login")}
    className="w-full flex items-center justify-center gap-3 py-3 border border-gray-600 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-200 font-medium transition"
  >
    <img
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      alt="Google"
      className="w-6 h-6"
    />
    Continuar con Google
  </button>
</div>
        </form>

        {/* Separador y Opciones Secundarias */}
        <div className="flex justify-between items-center mt-4">
            <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300">
                ¿Olvidaste tu contraseña?
            </a>
            <p className="text-center text-gray-400 text-sm">
                <Link to="/register" className="text-indigo-400 hover:underline font-medium">
                    Regístrate
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}