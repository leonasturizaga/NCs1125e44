//-------------------- version 8 ----------------------
// src/features/testimonials/pages/TestimonialList.jsx
import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import api from "@/services/apiClient";
import TestimonialCard from "../components/TestimonialCard";
import TestimonialModal from "../components/TestimonialModal";

const ITEMS_PER_PAGE = 12;

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  const fetchTestimonials = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/testimonies/getAll?page=${page}&size=${ITEMS_PER_PAGE}`);
      if (res.data.success) {
        setTestimonials(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        setCurrentPage(res.data.currentPage || 1);
      }
    } catch (err) {
      toast.error("Error cargando testimonios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials(1);
  }, []);

  const openModal = (testimonial = null) => {
    setCurrentTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleSave = async (formData, files = []) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.youtubeUrl) data.append("youtubeUrl", formData.youtubeUrl);
    data.append("userId", "895e3aa4-475e-410c-8e26-e53f347e2cca");

    files.forEach(file => data.append("images", file));

    try {
      if (currentTestimonial?.id) {
        toast.success("Edición simulada (PUT pendiente)");
      } else {
        const res = await api.post("/testimonies/post", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          toast.success("Testimonio creado!");
          fetchTestimonials(currentPage);
        }
      }
      setModalOpen(false);
    } catch (err) {
      toast.error("Error al guardar");
    }
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Testimonios</h1>
          <p className="text-gray-600 dark:text-gray-400">Gestiona todos los testimonios</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus className="w-5 h-5" />
          Nuevo Testimonio
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {testimonials.length === 0 ? (
            <p className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
              No hay testimonios aún
            </p>
          ) : (
            testimonials.map(t => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                showActions={true}
                onEdit={openModal}
                onDelete={() => openModal(t)}
              />
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-6 mt-12">
          <button
            onClick={() => fetchTestimonials(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-ghost"
          >
            ← Anterior
          </button>
          <span className="self-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => fetchTestimonials(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn-ghost"
          >
            Siguiente →
          </button>
        </div>
      )}

      <TestimonialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        testimonial={currentTestimonial}
        onSave={handleSave}
        onDelete={currentTestimonial ? () => alert("Delete not implemented") : undefined}
      />
    </div>
  );
}