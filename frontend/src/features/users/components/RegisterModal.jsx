// src/features/auth/components/RegisterModal.jsx
import { X } from "lucide-react";
import UserForm from "./UserForm";

export default function RegisterModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  const handleSubmit = async (formData) => {
    console.log("Modal received form data:", formData);

    const success = await onSuccess(formData);  // ← this comes from LoginPage

    console.log("onSuccess returned:", success);

    if (success) {
      console.log("Closing modal...");
      onClose();   // ← ONLY close if success = true
    }
    // If false → modal stays open (user sees error toast)
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Crear nueva cuenta
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="modal-body">
          <UserForm onSubmit={handleSubmit} submitText="Crear cuenta" />
        </div>
      </div>
    </div>
  );
}