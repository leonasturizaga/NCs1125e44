// src/features/auth/components/RegisterModal.jsx
import { X } from "lucide-react";
import UserForm from "./UserForm";

export default function RegisterModal({ isOpen, onClose, user = null, onSuccess }) {
  if (!isOpen) return null;

const handleSubmit = async (formData) => {
    const success = await onSuccess(formData);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.id ? "Editar usuario" : "Crear nueva cuenta"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="modal-body">
          <UserForm
            initialData={user || {}}
            onSubmit={handleSubmit}
            submitText={user?.id ? "Guardar cambios" : "Crear cuenta"}
            onCancel={onClose}  
          />
        </div>
      </div>
    </div>
  );
}