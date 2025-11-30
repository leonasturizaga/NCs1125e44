//src/features/auth/pages/RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
//import { FiUser, FiMail, FiLock } from 'lucide-react'; // Necesitamos FiUser
import { User, Mail, Lock } from 'lucide-react';

export default function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos de registro al backend
    console.log("Intentando registro...");
  };

  return (
    // Fondo Carbón Profundo (Consistente con Login)
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-gray-200">
      
      {/* Tarjeta de Registro: Fondo gris oscuro */}
      <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        
        {/* Título */}
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">
          Crear Cuenta CMS
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Únete a la plataforma para gestionar tus testimonios
        </p>

        {/* Formulario de Registro */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Campo de Nombre */}
          <div>
            <label htmlFor="name" className="sr-only">Nombre Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre Completo"
                required
                className="w-full pl-12 pr-5 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>
          
          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo Electrónico"
                required
                className="w-full pl-12 pr-5 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
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
          
          {/* Campo de Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                required
                className="w-full pl-12 pr-5 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>
          
          {/* Botón Principal (Registrarse): Acento Índigo */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg mt-6"
          >
            Crear Cuenta
          </button>
        </form>

        {/* Enlace de regreso */}
        <p className="text-center text-gray-400 text-sm mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline font-medium">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}