// import { useState } from "react";

// export function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     alert("Login básico funcionando");
//   }

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "#f3f4f6",
//       }}
//     >
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           background: "white",
//           padding: "2rem",
//           borderRadius: "0.75rem",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
//           width: "100%",
//           maxWidth: "360px",
//         }}
//       >
//         <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
//           Login CMS
//         </h1>

//         <div style={{ marginBottom: "1rem" }}>
//           <label style={{ display: "block", marginBottom: ".25rem" }}>
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ width: "100%", padding: ".5rem" }}
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label style={{ display: "block", marginBottom: ".25rem" }}>
//             Contraseña
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: "100%", padding: ".5rem" }}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: ".6rem",
//             background: "#111827",
//             color: "white",
//             border: "none",
//             borderRadius: ".5rem",
//             cursor: "pointer",
//           }}
//         >
//           Ingresar
//         </button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;

//-------------- version 1 ---------------
// src/features/auth/pages/LoginPage.jsx
import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../components/RegisterModal";
import { toast, Toaster } from "react-hot-toast";
import api from "@/services/apiClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
const [registerModalOpen, setRegisterModalOpen] = useState(false);

const handleRegister = async (data) => {
  console.log("handleRegister called with:", data);
  try {
    const res = await api.post("/auth/register", data);
    console.log("Register API response:", res.data);

    if (res.data.success) {
      toast.success("¡Cuenta creada con éxito! Ahora inicia sesión");
      return true;   // ← THIS tells modal to close
    } else {
      toast.error(res.data.message || "Error del servidor");
      return false;
    }
  } catch (err) {
    console.error("Register error:", err.response || err);
    toast.error(err.response?.data?.message || "Error de conexión");
    return false;   // ← modal stays open
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password);

    setLoading(false);

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
     <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
           <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                 Acceso al CMS
              </h2>
              <p className="text-gray-400 text-center mb-8">
                 Utiliza tus credenciales de administrador
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                 <div>
                    <label className="flex items-center gap-3 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus-within:border-indigo-500 transition">
                       <Mail className="w-5 h-5 text-gray-400" />
                       <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Correo Electrónico"
                          className="bg-transparent text-white flex-1 outline-none"
                       />
                    </label>
                 </div>

                 <div>
                    <label className="flex items-center gap-3 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus-within:border-indigo-500 transition">
                       <Lock className="w-5 h-5 text-gray-400" />
                       <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                          className="bg-transparent text-white flex-1 outline-none"
                       />
                    </label>
                 </div>
                 <div>
                    <button
                       type="submit"
                       disabled={loading}
                       className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 rounded-lg transition flex items-center justify-center gap-2">
                       {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                       ) : null}
                       Iniciar Sesión
                    </button>
                                        <button
                       type="submit"
                       disabled={loading}
                       className="btn-gosht hover:bg-indigo-700 text-white font-medium py-3.5 rounded-lg transition flex items-center justify-center gap-2">
                       {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                       ) : null}
                       Iniciar con Google
                    </button>
                    <div className="mt-6 text-center">
                       <span className="text-sm text-gray-600 dark:text-gray-400">
                          ¿No tienes cuenta?{" "}
                       </span>
                       <button
                          type="button"
                          onClick={() => setRegisterModalOpen(true)}
                          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                          Regístrate
                       </button>
                    </div>
                 </div>
              </form>
           </div>
        </div>

<RegisterModal
  isOpen={registerModalOpen}
  onClose={() => setRegisterModalOpen(false)}
  onSuccess={handleRegister}
/>

     </div>

     
  );
}