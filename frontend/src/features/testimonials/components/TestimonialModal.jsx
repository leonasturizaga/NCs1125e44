// src/features/testimonials/components/TestimonialModal.jsx
import { X } from "lucide-react";
import TestimonialForm from "./TestimonialForm";

export default function TestimonialModal({
  isOpen,
  onClose,
  testimonial = null,
  onSave,
  onDelete,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {testimonial?.id ? "Editar Testimonio" : "Nuevo Testimonio"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
         <TestimonialForm
            initialData={testimonial || {}}
            onSubmit={onSave}
            submitText={testimonial?.id ? "Guardar Cambios" : "Crear Testimonio"}
          />
        </div>

        {/* Footer */}
        {testimonial?.id && (
          <div className="modal-footer">
            <button onClick={onDelete} className="btn-danger">
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}