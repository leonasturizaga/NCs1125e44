// // src/features/auth/components/RegisterModal.jsx
// import { X } from "lucide-react";
// import UserForm from "./UserForm";

// export default function RegisterModal({ isOpen, onClose, selectedUser, onCreate, onEdit }) {
//    console.log("RegisterModal selectedUser:", selectedUser);
//   if (!isOpen) return null;

// const isEditing = !!selectedUser?.id;

// const handleSubmit = async (formData) => {
//   const success = isEditing ? await onEdit(formData) : await onCreate(formData);
//   if (success !== false) onClose(); 
// };


//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             {selectedUser?.id ? "Editar usuario" : "Crear nueva cuenta"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="modal-body">
//           <UserForm
//             initialData={selectedUser}
//             onSubmit={handleSubmit}
//             submitText={selectedUser?.id ? "Guardar cambios" : "Crear cuenta"}
//             onCancel={onClose}  
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

//--------------- version 2 -----------------
// src/features/users/components/RegisterModal.jsx
// import { X } from "lucide-react";
// import UserForm from "./UserForm";

// export default function RegisterModal({ isOpen, onClose, selectedUser = null, onCreate, onEdit }) {
//   console.log("RegisterModal render. selectedUser:", selectedUser, "isOpen:", isOpen);

//   if (!isOpen) return null;

//   const isEditing = !!selectedUser?.id;

//   const handleSubmit = async (formData, files = []) => {
//     // call the correct handler; pass selectedUser.id for edits
//     if (isEditing) {
//       const ok = await onEdit(formData, selectedUser.id);
//       if (ok !== false) onClose();
//       return ok;
//     } else {
//       const ok = await onCreate(formData, files);
//       if (ok !== false) onClose();
//       return ok;
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             {isEditing ? "Editar usuario" : "Crear nueva cuenta"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="modal-body">
//           <UserForm
//             initialData={selectedUser ?? null} // pass null for create; pass object for edit
//             onSubmit={handleSubmit}
//             submitText={isEditing ? "Guardar cambios" : "Crear cuenta"}
//             onCancel={onClose}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

//---------------- version 3 --------------------
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