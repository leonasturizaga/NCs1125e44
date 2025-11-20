import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-900 via-gray-900 to-gray-950 px-4">
      <div className="max-w-2xl w-full bg-gray-800 bg-opacity-60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-center text-3xl font-bold text-white tracking-tight">Iniciar sesión</h2>
        <p className="mt-2 text-center text-gray-400 text-sm">Ingresa con tu cuenta para continuar</p>

        {/* Formulario */}
        <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
          {/* Input EMAIL */}
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-md placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
              placeholder="tu@email.com"
            />
          </div>

          {/* Input PASSWORD */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-md placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
              placeholder="Contraseña"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-700 transition rounded-md font-semibold text-white shadow-lg focus:outline-none"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
