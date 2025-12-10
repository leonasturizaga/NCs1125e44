//----------------- version 3 --------------------
// src/features/testimonials/components/TestimonialForm.jsx
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// // const USER_ID = "895e3aa4-475e-410c-8e26-e53f347e2cca";

// export default function TestimonialForm({ initialData = {}, onSubmit, submitText = "Guardar" }) {
//   const { user } = useAuth();
  
//    const [formData, setFormData] = useState({
//       title: initialData.title || "",
//       description: initialData.description || "",
//       youtubeUrl: initialData.youtubeUrl || "",
//       category: initialData.category || "Clientes",
//       status: initialData.status || "pending",
//       userId: user?.id,
//    });

//   const [files, setFiles] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData, files);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-7">
//       {/* Title */}
//       <div>
//         <label className="label">Título *</label>
//         <input
//           name="title"
//           required
//           value={formData.title}
//           onChange={handleChange}
//           className="input"
//           placeholder="Ej: Excelente servicio y atención"
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label className="label">Descripción *</label>
//         <textarea
//           name="description"
//           required
//           rows={6}
//           value={formData.description}
//           onChange={handleChange}
//           className="input resize-none"
//           placeholder="Cuéntanos tu experiencia completa..."
//         />
//       </div>

//       {/* YouTube URL */}
//       <div>
//         <label className="label">Video de YouTube (opcional)</label>
//         <input
//           name="youtubeUrl"
//           value={formData.youtubeUrl}
//           onChange={handleChange}
//           className="input"
//           placeholder="https://youtube.com/watch?v=..."
//         />
//         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
//           Puedes pegar un enlace o dejar vacío
//         </p>
//       </div>

//       {/* Images */}
//       <div>
//         <label className="label">Imágenes (máx 3)</label>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => setFiles(Array.from(e.target.files))}
//           className="input"
//         />
//         {files.length > 0 && (
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//             {files.length} imagen(es) seleccionada(s)
//           </p>
//         )}
//       </div>

//       {/* Category + Status — same row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="label">Categoría</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="input"
//           >
//             <option value="Clients">Clientes</option>
//             <option value="Suppliers">Proveedores</option>
//             <option value="Products">Procutos</option>
//             <option value="Events">Eventos</option>
//           </select>
//         </div>

//         <div>
//           <label className="label">Estado</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="input"
//           >
//             <option value="rejected">Rechazado</option>
//             <option value="pending">Pendiente</option>
//             <option value="approved">Publicado</option>
//           </select>
//         </div>
//       </div>

//       {/* Submit */}
//       <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//         <button type="submit" className="btn-primary">
//           {submitText}
//         </button>
//       </div>
//     </form>
//   );
// }

//----------------- version 4 incluye categorias --------------------
//src/features/testimonials/components/TestimonialForm.jsx
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";

// export default function TestimonialForm({ initialData = {}, onSubmit, submitText = "Guardar" }) {
//   const { user } = useAuth();

//   const [formData, setFormData] = useState({
//     title: initialData.title || "",
//     description: initialData.description || "",
//     youtubeUrl: initialData.youtubeUrl || "",
//     categories: initialData.categories || [], // ← ARRAY
//     status: initialData.status || "pending",
//     userId: user?.id,
//   });

//   const [files, setFiles] = useState([]);

//   const categoriesOptions = [
//     { value: "Clients", label: "Clientes" },
//     { value: "Suppliers", label: "Proveedores" },
//     { value: "Products", label: "Productos" },
//     { value: "Events", label: "Eventos" },
//   ];

//   const handleCategoryChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setFormData(prev => ({ ...prev, categories: [...prev.categories, value] }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         categories: prev.categories.filter(c => c !== value),
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.categories.length === 0) {
//       toast.error("Selecciona al menos una categoría");
//       return;
//     }
//     onSubmit(formData, files);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-7">
//       {/* Title */}
//       <div>
//         <label className="label">Título *</label>
//         <input name="title" required value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="input" />
//       </div>

//       {/* Description */}
//       <div>
//         <label className="label">Descripción *</label>
//         <textarea name="description" required rows={6} value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="input resize-none" />
//       </div>

//       {/* YouTube URL */}
//       <div>
//         <label className="label">Video de YouTube (opcional)</label>
//         <input name="youtubeUrl" value={formData.youtubeUrl} onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))} className="input" />
//       </div>

//       {/* Images */}
//       <div>
//         <label className="label">Imágenes (máx 3)</label>
//         <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files))} className="input" />
//         {files.length > 0 && <p className="text-sm text-gray-600 mt-2">{files.length} imagen(es) seleccionada(s)</p>}
//       </div>

//       {/* Categories — MÚLTIPLES */}
//       <div>
//         <label className="label">Categorías *</label>
//         <div className="grid grid-cols-2 gap-3">
//           {categoriesOptions.map(cat => (
//             <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 value={cat.value}
//                 checked={formData.categories.includes(cat.value)}
//                 onChange={handleCategoryChange}
//                 className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
//               />
//               <span className="text-gray-700 dark:text-gray-300">{cat.label}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Status */}
//       <div>
//         <label className="label">Estado</label>
//         <select name="status" value={formData.status} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))} className="input">
//           <option value="rejected">Rechazado</option>
//           <option value="pending">Pendiente</option>
//           <option value="approved">Publicado</option>
//         </select>
//       </div>

//       <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//         <button type="submit" className="btn-primary">
//           {submitText}
//         </button>
//       </div>
//     </form>
//   );
// }


//------------------------ version 4 con categories multiselect ---------------------
// src/features/testimonials/components/TestimonialForm.jsx
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Edit3, Link, Image, Tag, CheckCircle } from "lucide-react";
import CategoryMultiSelect from "../components/CategoryMultiselect";


export default function TestimonialForm({ initialData = {}, onSubmit, submitText = "Guardar" }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    youtubeUrl: initialData.youtubeUrl || "",
    categories: initialData.categories?.map(c => c.name) || [],
    status: initialData.status || "pending",
    userId: user?.id,
  });

  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.categories.length === 0) {
      toast.error("Selecciona al menos una categoría");
      return;
    }
    onSubmit(formData, files);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título del formulario (solo texto, sin card) */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-white">
          {initialData.id ? "Editar Testimonio" : "Nuevo Testimonio"}
        </h2>
        <p className="text-gray-400 mt-2">Completa los datos del testimonio</p>
      </div>

      {/* Campos */}
      <div className="space-y-5">
        <div className="relative">
          <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input required placeholder="Título del testimonio" value={formData.title}
            onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
            className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition" />
        </div>

        <div className="relative">
          <Edit3 className="absolute left-4 top-5 text-gray-500 w-5 h-5" />
          <textarea required rows={2} placeholder="Descripción..."
            value={formData.description}
            onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
            className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition resize-vertical min-h-20" />
        </div>

        <div className="relative">
          <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input placeholder="URL de YouTube (opcional)" value={formData.youtubeUrl}
            onChange={e => setFormData(p => ({ ...p, youtubeUrl: e.target.value }))}
            className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition" />
        </div>

        <div className="relative">
          <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input type="file" multiple accept="image/*"
            onChange={e => setFiles(Array.from(e.target.files))}
            className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-indigo-600 file:text-white hover:file:bg-indigo-700" />
          {files.length > 0 && <p className="text-sm text-gray-400 mt-2 pl-12">{files.length} imagen(es) seleccionada(s)</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
            <div className="pl-10">
              <CategoryMultiSelect selected={formData.categories}
                onChange={cats => setFormData(p => ({ ...p, categories: cats }))} />
            </div>
          </div>

          <div className="relative">
            <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <select value={formData.status}
              onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}
              className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition">
              <option value="pending">Pendiente</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button type="submit"
          className="btn btn-primary">
          {submitText}
        </button>
      </div>
    </form>
  );
}