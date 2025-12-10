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