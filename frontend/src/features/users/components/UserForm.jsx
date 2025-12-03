//--------------------- version 1 -----------------------
// src/features/auth/components/UserForm.jsx
// import { useState } from "react";

// export default function UserForm({ onSubmit, submitText = "Crear cuenta" }) {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//    //  role: "visitante", // default
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password.length < 8) {
//       alert("La contraseña debe tener al menos 8 caracteres");
//       return;
//     }
//     onSubmit(formData);
//     console.log("Formulario enviado:", formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <label className="label">Nombre de usuario *</label>
//         <input
//           name="username"
//           required
//           value={formData.username}
//           onChange={handleChange}
//           className="input"
//           placeholder="Usuario123"
//         />
//       </div>

//       <div>
//         <label className="label">Correo electrónico *</label>
//         <input
//           type="email"
//           name="email"
//           required
//           value={formData.email}
//           onChange={handleChange}
//           className="input"
//           placeholder="email@ejemplo.com"
//         />
//       </div>

//       <div>
//         <label className="label">Contraseña *</label>
//         <input
//           type="password"
//           name="password"
//           required
//           value={formData.password}
//           onChange={handleChange}
//           className="input"
//           placeholder="Mínimo 8 caracteres"
//         />
//         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//           Debe tener mayúsculas, minúsculas y números
//         </p>
//       </div>

//       <div>
//         <label className="label">Rol</label>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="input"
//         >
//           <option value="visitante">Visitante</option>
//           <option value="editor">Editor</option>
//           <option value="admin">Administrador</option>
//         </select>
//       </div>

//       <div className="flex justify-end gap-3 pt-4">
//         <button type="submit" className="btn-primary">
//           {submitText}
//         </button>
//       </div>
//     </form>
//   );
// }

//--------------------- version 2 -----------------------
// src/features/auth/components/UserForm.jsx
// import { useState } from "react";
// export default function UserForm({ initialData = {}, onSubmit, submitText = "Editar cuenta", onCancel }) {
//   const isEditing = !!initialData.id; // ← detecta si estamos editando
  
//    const [formData, setFormData] = useState({
//     username: initialData.username || "",
//     email: initialData.email || "",
//     password: initialData.id ? "********" : "", // no mostrar contraseña real
//     role: initialData.role || "visitante",
//   });

// // const isEditing = !!initialData.id; // ← detecta si estamos editando

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!initialData.id && formData.password.length < 8) {
//       alert("La contraseña debe tener al menos 8 caracteres");
//       return;
//     }
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Username */}
//       <div>
//         <label className="label">Nombre de usuario *</label>
//         <input
//           name="username"
//           required
//           value={formData.username}
//           onChange={handleChange}
//           className="input"
//           placeholder="usuario123"
//         />
//       </div>

//       {/* Email */}
//       <div>
//         <label className="label">Correo electrónico *</label>
//         <input
//           type="email"
//           name="email"
//           required
//           value={formData.email}
//           onChange={handleChange}
//           className="input"
//           placeholder="email@ejemplo.com"
//         />
//       </div>

//       {/* Password — solo obligatorio al crear */}
//       {!isEditing && (
//         <div>
//           <label className="label">Contraseña *</label>
//           <input
//             type="password"
//             name="password"
//             // required={!initialData.id}
//             value={formData.password}
//             onChange={handleChange}
//             className="input"
//             placeholder="Mínimo 8 caracteres"
//           />
//           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//             Debe tener mayúsculas, minúsculas y números
//           </p>
//         </div>
//       )}

//       {/* Role */}
//       <div>
//         <label className="label">Rol</label>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="input"
//         >
//           <option value="visitante">Visitante</option>
//           <option value="editor">Editor</option>
//           <option value="admin">Administrador</option>
//         </select>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 pt-4">
//         <button type="button" onClick={onCancel} className="btn-ghost">
//           Cancelar
//         </button>
//         <button type="submit" className="btn-primary">
//           {submitText}
//         </button>
//       </div>
//     </form>
//   );
// }



//--------------------- version 3 (test) -----------------------
// import { useState, useEffect } from "react";

// export default function UserForm({ initialData = {}, onSubmit, submitText = "Editar cuenta", onCancel }) {

//   const isEditing = !!initialData.id;   // ← Detect edit mode correctly

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "visitante",
//   });


//   // ← THE FIX: update form when selectedUser changes
// useEffect(() => {
//   console.log("🔥 useEffect triggered — initialData:", initialData);

//   if (initialData) {
//     // EDIT MODE
//     setFormData({
//       username: initialData.username,
//       email: initialData.email,
//       password: "",
//       role: initialData.role || "visitante",
//     });
//   } else {
//     // CREATE MODE
//     setFormData({
//       username: "",
//       email: "",
//       password: "",
//       role: "visitante",
//     });
//   }
// }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Password required only for NEW user
//     if (!isEditing && formData.password.length < 8) {
//       alert("La contraseña debe tener al menos 8 caracteres");
//       return;
//     }

//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">

//       {/* Username */}
//       <div>
//         <label className="label">Nombre de usuario *</label>
//         <input
//           name="username"
//           required
//           value={formData.username}
//           onChange={handleChange}
//           className="input"
//         />
//       </div>

//       {/* Email */}
//       <div>
//         <label className="label">Correo electrónico *</label>
//         <input
//           type="email"
//           name="email"
//           required
//           value={formData.email}
//           onChange={handleChange}
//           className="input"
//         />
//       </div>

//       {/* Password only for CREATE */}
//       {!isEditing && (
//         <div>
//           <label className="label">Contraseña *</label>
//           <input
//             type="password"
//             name="password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             className="input"
//             placeholder="Mínimo 8 caracteres"
//           />
//         </div>
//       )}

//       {/* Role */}
//       <div>
//         <label className="label">Rol</label>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="input"
//         >
//           <option value="visitante">Visitante</option>
//           <option value="editor">Editor</option>
//           <option value="admin">Administrador</option>
//         </select>
//       </div>

//       <div className="flex justify-end gap-3 pt-4">
//         <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
//         <button type="submit" className="btn-primary">{submitText}</button>
//       </div>
//     </form>
//   );
// }



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
