// ******************** version 1 ********************
// src/features/testimonials/components/TestimonialModal.jsx
// import { X } from "lucide-react";

// export default function TestimonialModal({
//   isOpen,
//   onClose,
//   testimonial,
//   onSave,
//   onDelete,
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3 className="text-xl font-semibold">
//             {testimonial?.id ? "Edit Testimonial" : "New Testimonial"}
//           </h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="modal-body space-y-5">
//           <div>
//             <label className="label">Author</label>
//             <input
//               type="text"
//               className="input"
//               defaultValue={testimonial?.author || ""}
//               placeholder="John Doe"
//             />
//           </div>

//           <div>
//             <label className="label">Content</label>
//             <textarea
//               rows="5"
//               className="input"
//               defaultValue={testimonial?.content || ""}
//               placeholder="Write your testimonial..."
//             />
//           </div>

//           <div>
//             <label className="label">Category</label>
//             <select className="input" defaultValue={testimonial?.category || "Clients"}>
//               <option>Clients</option>
//               <option>Suppliers</option>
//               <option>Employees</option>
//             </select>
//           </div>

//           <div>
//             <label className="label">Status</label>
//             <select className="input" defaultValue={testimonial?.status || "draft"}>
//               <option value="published">Published</option>
//               <option value="pending">Pending</option>
//               <option value="draft">Draft</option>
//             </select>
//           </div>
//         </div>

//         <div className="modal-footer">
//           {testimonial?.id && (
//             <button onClick={onDelete} className="btn-danger mr-auto">
//               Delete
//             </button>
//           )}
//           <button onClick={onClose} className="btn-ghost">
//             Cancel
//           </button>
//           <button onClick={onSave} className="btn-primary">
//             {testimonial?.id ? "Save Changes" : "Create Testimonial"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// ******************** version 2 ********************
// // src/features/testimonials/components/TestimonialModal.jsx
// import { X } from "lucide-react";
// import TestimonialForm from "./TestimonialForm";

// export default function TestimonialModal({
//   isOpen,
//   onClose,
//   testimonial = null,        // null = create mode
//   onSave,
//   onDelete,
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center p-6 border-b">
//           <h2 className="text-2xl font-bold">
//             {testimonial?.id ? "Editar Testimonio" : "Nuevo Testimonio"}
//           </h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6">
//           <TestimonialForm
//             initialData={testimonial || {}}
//             onSubmit={onSave}
//             submitText={testimonial?.id ? "Guardar Cambios" : "Crear Testimonio"}
//           />
//         </div>

//         {testimonial?.id && (
//           <div className="px-6 pb-6 flex justify-end">
//             <button onClick={onDelete} className="btn-danger">
//               Eliminar
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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