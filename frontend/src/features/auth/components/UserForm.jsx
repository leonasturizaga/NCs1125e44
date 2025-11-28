// src/features/auth/components/UserForm.jsx
import { useState } from "react";

export default function UserForm({ onSubmit, submitText = "Crear cuenta" }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
   //  role: "visitante", // default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    onSubmit(formData);
    console.log("Formulario enviado:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="label">Nombre de usuario *</label>
        <input
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          className="input"
          placeholder="Usuario123"
        />
      </div>

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

      <div>
        <label className="label">Contraseña *</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="input"
          placeholder="Mínimo 8 caracteres"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Debe tener mayúsculas, minúsculas y números
        </p>
      </div>

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

      <div className="flex justify-end gap-3 pt-4">
        <button type="submit" className="btn-primary">
          {submitText}
        </button>
      </div>
    </form>
  );
}