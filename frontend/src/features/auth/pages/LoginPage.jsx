import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Login intent", { email, password });
  };

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* COLUMNA IZQUIERDA CON IMAGEN */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1500&q=80")`,
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-fuchsia-300 drop-shadow-lg">
            Testimonial CMS
          </h1>
        </div>
      </div>

      {/* COLUMNA DERECHA: LOGIN */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-10">
        <div className="max-w-xl w-full bg-gray-900 p-10 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-fuchsia-700 mb-6">
            Iniciar Sesión
          </h2>

          {/* Formulario */}
          <form onSubmit={handleFormSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-3 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-400 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-3 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-400 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            

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
<div className="flex items-center gap-3 my-6">
  <div className="flex-1 h-px bg-gray-700"></div>
  <span className="text-gray-400 text-sm">o ingresa con email</span>
  <div className="flex-1 h-px bg-gray-700"></div>
</div>


            {/* Botón */}
            <button
              type="submit"
              className="w-full py-3 bg-fuchsia-800 hover:bg-fuchsia-950 rounded-lg font-semibold transition"
            >
              Entrar
            </button>

            <p className="text-center text-sm text-gray-400 mt-3">
              ¿No tenés cuenta?{" "}
              <a href="#" className="text-fuchsia-400 hover:underline">
                Registrate
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
