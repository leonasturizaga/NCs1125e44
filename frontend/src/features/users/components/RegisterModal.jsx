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


import { X } from "lucide-react";
import UserForm from "./UserForm";

export default function RegisterModal({ isOpen, onClose, selectedUser = null, onCreate, onEdit }) {
  console.log("RegisterModal render. selectedUser:", selectedUser, "isOpen:", isOpen);

  if (!isOpen) return null;

  const isEditing = !!selectedUser?.id;

  const handleSubmit = async (formData, files = []) => {
    // call the correct handler; pass selectedUser.id for edits
    if (isEditing) {
      const ok = await onEdit(formData, selectedUser.id);
      if (ok !== false) onClose();
      return ok;
    } else {
      const ok = await onCreate(formData, files);
      if (ok !== false) onClose();
      return ok;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEditing ? "Editar usuario" : "Crear nueva cuenta"}
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
            initialData={selectedUser ?? null} // pass null for create; pass object for edit
            onSubmit={handleSubmit}
            submitText={isEditing ? "Guardar cambios" : "Crear cuenta"}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
