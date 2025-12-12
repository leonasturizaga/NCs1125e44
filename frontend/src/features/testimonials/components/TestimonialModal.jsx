// src/features/testimonials/components/TestimonialModal.jsx
import { X } from "lucide-react";
import TestimonialForm from "./TestimonialForm";

export default function TestimonialModal({
  isOpen,
  onClose,
  testimonial = null,
  onSave,
  onDeleteClick, // ← Recibe desde el padre
}) {
  if (!isOpen) return null;

  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
           className="absolute inset-0 bg-black/70 backdrop-blur-sm"
           onClick={onClose}
        />

        <div className="relative w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 max-h-screen overflow-y-auto">
           {/* Botón cerrar */}
           <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 text-gray-400 hover:text-white transition z-10">
              <X className="w-6 h-6" />
           </button>

           {/* Formulario limpio */}
           <TestimonialForm
              initialData={testimonial || {}}
              onSubmit={(data, files) => {
                 onSave(data, files);
                 onClose();
              }}
              submitText={
                 testimonial?.id ? "Guardar Cambios" : "Crear Testimonio"
              }
           />

           {/* Botón eliminar → llama a la función del padre */}
           {testimonial?.id && (
              <div className="flex justify-end mt-6 pt-6 border-t border-gray-700 right-0">
                 <button
                    onClick={() => {
                       onDeleteClick(testimonial); // ← abre el modal de confirmación
                       onClose(); // ← cierra el modal de edición
                    }}
                    className="btn btn-danger">
                    Eliminar Testimonio
                 </button>
              </div>
           )}
        </div>
     </div>
  );
}