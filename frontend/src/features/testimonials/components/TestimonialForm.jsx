//----------------- version 1 --------------------
// src/features/testimonials/components/TestimonialForm.jsx
// import { useState } from "react";

// export default function TestimonialForm({ initialData = {}, onSubmit, submitText = "Guardar" }) {
//   const [formData, setFormData] = useState({
//     author: initialData.author || "",
//     content: initialData.content || "",
//     category: initialData.category || "Clientes",
//     status: initialData.status || "draft",
//     ...initialData,
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
//         <input
//           name="author"
//           required
//           value={formData.author}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
//         <textarea
//           name="content"
//           required
//           rows={6}
//           value={formData.content}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           >
//             <option>Clientes</option>
//             <option>Proveedores</option>
//             <option>Empleados</option>
//             <option>Partners</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//           >
//             <option value="draft">Borrador</option>
//             <option value="pending">Pendiente</option>
//             <option value="published">Publicado</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex justify-end gap-3">
//         <button
//           type="button"
//           onClick={() => history.back()}
//           className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//         >
//           Cancelar
//         </button>
//         <button
//           type="submit"
//           className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//         >
//           {submitText}
//         </button>
//       </div>
//     </form>
//   );
// }

//----------------- version 2 --------------------
// src/features/testimonials/components/TestimonialForm.jsx
import { useState } from "react";

const USER_ID = "1333c481-e10d-4ba4-899e-6cff71b402ed"; // ← Hardcoded for now

export default function TestimonialForm({ initialData = {}, onSubmit, submitText = "Guardar" }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    youtubeUrl: initialData.youtubeUrl || "",
    category: initialData.category || "Clientes",
    status: initialData.status || "pending", // internal value = "pending"
    userId: USER_ID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="label">Título *</label>
        <input
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="input"
          placeholder="Ej: Excelente servicio"
        />
      </div>

      {/* Description */}
      <div>
        <label className="label">Descripción *</label>
        <textarea
          name="description"
          required
          rows={5}
          value={formData.description}
          onChange={handleChange}
          className="input"
          placeholder="Cuéntanos tu experiencia..."
        />
      </div>

      {/* YouTube URL (optional) */}
      <div>
        <label className="label">Video de YouTube (opcional)</label>
        <input
          name="youtubeUrl"
          value={formData.youtubeUrl}
          onChange={handleChange}
          className="input"
          placeholder="https://youtube.com/watch?v=..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Puedes pegar un enlace de YouTube o dejar vacío
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="label">Categoría</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input"
        >
          <option>Clientes</option>
          <option>Proveedores</option>
          <option>Empleados</option>
          <option>Partners</option>
        </select>
      </div>

      {/* Status — Shows Spanish, sends English */}
      <div>
        <label className="label">Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input"
        >
          <option value="draft">Borrador</option>
          <option value="pending">Pendiente</option>
          <option value="published">Publicado</option>
        </select>
      </div>

{/* Add file input in the form */}
<div>
  <label className="label">Imágenes (máx 3)</label>
  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => setFiles(Array.from(e.target.files))}
    className="input"
  />
</div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4">
        <button type="submit" className="btn-primary">
          {submitText}
        </button>
      </div>
    </form>
  );
}
