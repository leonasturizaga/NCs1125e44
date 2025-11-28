//--------------------- version 8 ---------------------
// src/features/testimonials/pages/TestimonialList.jsx
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Grid3X3,
  Edit2, Trash2, Eye,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import api from "@/services/apiClient";
import TestimonialCard from "../components/TestimonialCard";
import TestimonialModal from "../components/TestimonialModal";

const ITEMS_PER_PAGE = 6;

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  // Fetch ALL testimonials once
  const fetchAll = async () => {
     try {
        setLoading(true);
        const res = await api.get("/testimonies/getAll?page=1&size=100");
        if (res.data.success) {
           setTestimonials(res.data.data || []);
         }
      } catch (err) {
        toast.error("Error loading testimonials");
      } finally {
        setLoading(false);
      }
   };

// Load once on mount
  useEffect(() => {
    fetchAll();
  }, []);

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Client-side filtering
  const filtered = testimonials.filter((t) => {
    const matchesSearch =
      t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Client-side pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openModal = (testimonial = null) => {
    setCurrentTestimonial(testimonial);
    setModalOpen(true);
  };

// CREATE — uses FormData
  const handleCreate = async (formData, files = []) => {
     const data = new FormData();
     data.append("title", formData.title);
     data.append("description", formData.description);
     data.append("userId", "895e3aa4-475e-410c-8e26-e53f347e2cca");
     if (formData.youtubeUrl) data.append("youtubeUrl", formData.youtubeUrl);

     files.forEach((file) => data.append("images", file));

     try {
        const res = await api.post("/testimonies/post", data, {
           headers: {
              "Content-Type": "multipart/form-data",
           },
        });
        console.log(res);
        console.log(data);
        if (res.data.success) {
           toast.success("Testimonio creado con éxito!");
           setModalOpen(false);
           fetchAll(); // refresh
        }
     } catch (err) {
        const msg = err.response?.data?.message || "Error al crear testimonio";
        toast.error(msg);
        console.error("Create error:", err.response?.data || err);
     }
  };

  // EDIT — uses JSON PUT
  const handleEdit = async (formData) => {
    if (!currentTestimonial?.id) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      youtubeUrl: formData.youtubeUrl || null,
      isActive: true,
      status: formData.status,
    };

    try {
      const res = await api.put(`/testimonies/edit/${currentTestimonial.id}`, payload);
      if (res.data.success) {
        toast.success("Testimonio actualizado!");
        setModalOpen(false);
        fetchAll();
      }
    } catch (err) {
const msg = err.response?.data?.message || "Error al editar";
      toast.error(msg);
      console.error("Edit error:", err.response?.data || err);
    }
  };

  const handleDelete = () => {
    alert("Delete not implemented yet");
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      {/* Header */}
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

      {/* Search + Filter + Toggle */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título o descripción..."
              className="input pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              className="input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="published">Publicado</option>
              <option value="pending">Pendiente</option>
              <option value="draft">Borrador</option>
            </select>

            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("cards")}
                className={`p-2.5 rounded-lg ${viewMode === "cards" ? "bg-white dark:bg-gray-600 shadow-sm" : ""}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2.5 rounded-lg ${viewMode === "table" ? "bg-white dark:bg-gray-600 shadow-sm" : ""}`}
              >
                <TableIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === "cards" && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.length === 0 ? (
            <p className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
              No hay testimonios
            </p>
          ) : (
            paginated.map((t) => (
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

      {/* Table View */}
      {viewMode === "table" && !loading && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hidden sm:table-cell">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginated.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{t.title}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                      <p className="line-clamp-2">{t.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge badge-${t.status}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm hidden md:table-cell">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => openModal(t)} className="btn-ghost text-indigo-600">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => openModal(t)} className="btn-ghost text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-6 mt-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-ghost"
          >
            ← Anterior
          </button>
          <span className="self-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
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
        onSave={currentTestimonial?.id ? handleEdit : handleCreate}
        onDelete={currentTestimonial ? handleDelete : undefined}
      />
    </div>
  );
}