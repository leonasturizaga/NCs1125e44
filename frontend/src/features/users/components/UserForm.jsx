//----------------- version 2 --------------------------
import { useState, useEffect } from "react";

export default function UserForm({ initialData = null, onSubmit, submitText = "Editar cuenta", onCancel }) {
  // initialData is either null (create) or a user object (edit)
  const isEditing = !!initialData?.id;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "visitante",
  });

  // Sync with incoming initialData every time it changes
  useEffect(() => {
    console.log("UserForm useEffect - initialData changed:", initialData);
    if (initialData) {
      setFormData({
        username: initialData.username || "",
        email: initialData.email || "",
        password: "", // never fill password client-side
        role: initialData.role || "visitante",
      });
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "visitante",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      // keep file(s) in formData.files for onSubmit
      setFormData(prev => ({ ...prev, files: files ? Array.from(files) : [] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing && (formData.password || "").length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    // If you want to support file uploads, pass files separately
    const files = formData.files || [];
    // prepare a payload excluding files
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    // onSubmit can expect (payload, files)
    onSubmit(payload, files);
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

      {/* Password — only when creating */}
      {!isEditing && (
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

      {/* Optional profile picture upload */}
      <div>
        <label className="label">Foto de perfil</label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleChange}
          className="input"
        />
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
