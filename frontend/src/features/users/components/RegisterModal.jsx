// src/features/users/components/RegisterModal.jsx
import { X } from "lucide-react";
import UserForm from "./UserForm";

export default function RegisterModal({ 
  isOpen, 
  onClose, 
  selectedUser = null, 
  onCreate, 
  onEdit 
}) {
  if (!isOpen) return null;

  const isEditing = !!selectedUser?.id;

  const handleSubmit = async (formData, files = []) => {
    let success = false;

    try {
      if (isEditing) {
        // EN EDICIÓN: solo enviamos formData (JSON)
        // Ignoramos files completamente (backend no acepta FormData)
        success = await onEdit(formData);
      } else {
        // EN CREACIÓN: sí permitimos archivos
        success = await onCreate(formData, files);
      }
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      success = false;
    }

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8" 
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 text-gray-400 hover:text-white transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isEditing ? "Editar usuario" : "Crear nueva cuenta"}
        </h2>

        <UserForm
          initialData={selectedUser}
          onSubmit={handleSubmit}
          submitText={isEditing ? "Guardar cambios" : "Crear cuenta"}
          onCancel={onClose}
          // Deshabilitamos subida de archivo en edición
          disableFileUpload={isEditing}
        />
      </div>
    </div>
  );
}