//----------------- version 5 con categories multiselect images up to  3---------------------
// src/features/testimonials/components/TestimonialForm.jsx
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Edit3, Link, Image, Tag, CheckCircle, X } from "lucide-react";
import CategoryMultiSelect from "./CategoryMultiSelect";

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

  const [files, setFiles] = useState([]); // Archivos seleccionados
  const [previews, setPreviews] = useState([]); // Vista previa

  // Manejar selección de archivos
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > 3) {
      toast.error("Máximo 3 imágenes permitidas");
      return;
    }

    // Generar vista previa
    const newPreviews = selectedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setFiles(prev => [...prev, ...selectedFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  // Eliminar imagen
  const removeImage = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

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
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-white">
          {initialData.id ? "Editar Testimonio" : "Nuevo Testimonio"}
        </h2>
        <p className="text-gray-400 mt-2">Completa los datos del testimonio</p>
      </div>

      <div className="space-y-5">
        {/* Título */}
        <div className="relative">
          <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            required
            placeholder="Título del testimonio"
            value={formData.title}
            onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
            className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Descripción */}
        <div className="relative">
          <Edit3 className="absolute left-4 top-5 text-gray-500 w-5 h-5" />
          <textarea
            required
            rows={2}
            placeholder="Descripción..."
            value={formData.description}
            onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
            className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition resize-vertical min-h-20"
          />
        </div>

        {/* YouTube URL */}
        <div className="relative">
          <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            placeholder="URL de YouTube (opcional)"
            value={formData.youtubeUrl}
            onChange={e => setFormData(p => ({ ...p, youtubeUrl: e.target.value }))}
            className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Imágenes - UN SOLO INPUT + VISTA PREVIA */}
        <div className="space-y-4">
          <div className="relative">
            <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
/>
          </div>

          {/* Vista previa de imágenes */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {previews.map((preview, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-700">
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-xs text-white truncate">{preview.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {previews.length > 0 && (
            <p className="text-sm text-gray-400 pl-1">
              {previews.length}/3 imágenes seleccionadas
            </p>
          )}
        </div>

        {/* Categorías + Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
            <div className="pl-10 ">
              <CategoryMultiSelect
                selected={formData.categories}
                onChange={cats => setFormData(p => ({ ...p, categories: cats }))}
              />
            </div>
          </div>

          <div className="relative">
            <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <select
              value={formData.status}
              onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}
              className="w-full pl-12 pr-5 py-3 bg-gray-900/70 border border-gray-700 rounded-lg text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="pending">Pendiente</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition shadow-lg">
          {submitText}
        </button>
      </div>
    </form>
  );
}