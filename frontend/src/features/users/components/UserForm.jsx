//--------------------- version 1 -----------------------
// src/features/auth/components/UserForm.jsx
// import { useState } from "react";

// export default function UserForm({ onSubmit, submitText = "Crear cuenta" }) {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//    //  role: "visitante", // default
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password.length < 8) {
//       alert("La contraseña debe tener al menos 8 caracteres");
//       return;
//     }
//     onSubmit(formData);
//     console.log("Formulario enviado:", formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <label className="label">Nombre de usuario *</label>
//         <input
//           name="username"
//           required
//           value={formData.username}
//           onChange={handleChange}
//           className="input"
//           placeholder="Usuario123"
//         />
//       </div>

//       <div>
//         <label className="label">Correo electrónico *</label>
//         <input
//           type="email"
//           name="email"
//           required
//           value={formData.email}
//           onChange={handleChange}
//           className="input"
//           placeholder="email@ejemplo.com"
//         />
//       </div>

//       <div>
//         <label className="label">Contraseña *</label>
//         <input
//           type="password"
//           name="password"
//           required
//           value={formData.password}
//           onChange={handleChange}
//           className="input"
//           placeholder="Mínimo 8 caracteres"
//         />
//         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//           Debe tener mayúsculas, minúsculas y números
//         </p>
//       </div>

//       <div>
//         <label className="label">Rol</label>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="input"
//         >
//           <option value="visitante">Visitante</option>
//           <option value="editor">Editor</option>
//           <option value="admin">Administrador</option>
//         </select>
//       </div>

//       <div className="flex justify-end gap-3 pt-4">
//         <button type="submit" className="btn-primary">
//           {submitText}
//         </button>
//       </div>
//     </form>
//   );
// }

//--------------------- version 2 -----------------------
// src/features/auth/components/UserForm.jsx
import { useState } from "react";
export default function UserForm({ initialData = {}, onSubmit, submitText = "Crear cuenta", onCancel }) {
  const [formData, setFormData] = useState({
    username: initialData.username || "",
    email: initialData.email || "",
    password: initialData.id ? "********" : "", // no mostrar contraseña real
    role: initialData.role || "visitante",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!initialData.id && formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username */}
      <div>
        <label className="label">Nombre de usuario *</label>
        <input
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          className="input"
          placeholder="usuario123"
        />
      </div>

      {/* Email */}
      <div>
        <label className="label">Correo electrónico *</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="input"
          placeholder="email@ejemplo.com"
        />
      </div>

      {/* Password — solo obligatorio al crear */}
      {!initialData.id && (
        <div>
          <label className="label">Contraseña *</label>
          <input
            type="password"
            name="password"
            required={!initialData.id}
            value={formData.password}
            onChange={handleChange}
            className="input"
            placeholder="Mínimo 8 caracteres"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Debe tener mayúsculas, minúsculas y números
          </p>
        </div>
      )}

      {/* Role */}
      <div>
        <label className="label">Rol</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input"
        >
          <option value="visitante">Visitante</option>
          <option value="editor">Editor</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          {submitText}
        </button>
      </div>
    </form>
  );
}