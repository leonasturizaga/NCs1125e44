// src/features/users/components/UserForm.jsx
import { useState, useEffect } from "react";
import { X, Image as ImageIcon } from "lucide-react";

export default function UserForm({ initialData = null, onSubmit, submitText = "Guardar", onCancel }) {
  const isEditing = !!initialData?.id;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "visitante",
    profilePictureUrl: "",  // ← URL manual
  });

  const [selectedFile, setSelectedFile] = useState(null); // ← archivo subido
  const [preview, setPreview] = useState(null);           // ← vista previa

  // Sincronizar con initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username || "",
        email: initialData.email || "",
        password: "",
        role: initialData.role || "visitante",
        profilePictureUrl: initialData.profilePicture || "",
      });
      setPreview(initialData.profilePicture || null);
    } else {
      setFormData({ username: "", email: "", password: "", role: "visitante", profilePictureUrl: "" });
      setPreview(null);
      setSelectedFile(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, profilePictureUrl: "" })); // limpiar URL si sube archivo
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, profilePictureUrl: url }));
    setPreview(url || null);
    setSelectedFile(null); // limpiar archivo si pega URL
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing && formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    onSubmit(formData, selectedFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
{/* Foto de perfil - solo una opción activa */}
<div className="space-y-4">
  <label className="label">Foto de perfil</label>

  {/* Vista previa */}
  {preview && (
    <div className="flex items-center gap-3">
      <img src={preview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-gray-600" />
      <button
        type="button"
        onClick={() => {
          setPreview(null);
          setSelectedFile(null);
          setFormData(prev => ({ ...prev, profilePictureUrl: "" }));
        }}
        className="text-red-400 hover:text-red-300 text-sm"
      >
        Eliminar
      </button>
    </div>
  )}

{/* En UserForm.jsx → solo mostrar input de archivo si NO es edición */}
{!isEditing && (
  <div>
    <label className="label">Foto de perfil (subir)</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="input"
    />
  </div>
)}

 {/* Y siempre mostrar URL (funciona en edición y creación) */}
<div>
  <label className="label">Foto de perfil (URL)</label>
  <input
    type="url"
    value={formData.profilePictureUrl}
    onChange={(e) => setFormData(prev => ({ ...prev, profilePictureUrl: e.target.value }))}
    placeholder="https://ejemplo.com/avatar.jpg"
    className="input text-sm"
  />
</div>
</div>
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

      {/* Contraseña (solo creación) */}
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
        </div>
      )}

      {/* Rol */}
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

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
        <button type="button" onClick={onCancel} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">
          Cancelar
        </button>
        <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition shadow-lg">
          {submitText}
        </button>
      </div>
    </form>
  );
}