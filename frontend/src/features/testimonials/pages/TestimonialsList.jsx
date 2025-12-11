//--------------------- version 8 ---------------------
// src/features/testimonials/pages/TestimonialList.jsx
import {ITEMS_PER_PAGE } from "../data/testimonialMocks";
import { toast } from "react-toastify";
import api from "@/services/apiClient";
import TestimonialCard from "../components/TestimonialCard";
import TestimonialModal from "../components/TestimonialModal";
import { STATUS_CONFIG } from "@/constants/statusConfig"; 
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Grid3X3,
  Edit2, Trash2, Eye,
  Table as TableIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import DeleteConfirmModal from './../components/DeleteConfirmModal';
import CategoryMultiSelect from "../components/CategoryMultiSelect";

export default function TestimonialList() {
   const { user } = useAuth();
   const [testimonials, setTestimonials] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [filterCategories, setFilterCategories] = useState([]);
   const [filterStatus, setFilterStatus] = useState("all");
   const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
   const [currentPage, setCurrentPage] = useState(1);

   const [modalOpen, setModalOpen] = useState(false);
   const [currentTestimonial, setCurrentTestimonial] = useState(null);

   // Fetch ALL testimonials once
   const fetchAll = async () => {
      try {
         setLoading(true);
         const res = await api.get("/testimonies/getAll?page=1&size=1000");
         if (res.data.success) {
            setTestimonials(res.data.data || []);
         }
         // eslint-disable-next-line no-unused-vars
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
         t.user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         t.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || t.status === filterStatus;
      const matchesCategories =
         filterCategories.length === 0 ||
         t.categories?.some((cat) => filterCategories.includes(cat.name));
      return matchesSearch && matchesStatus && matchesCategories;
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

   const handleCreate = async (formData, files = []) => {
      if (!user?.id) {
         toast.error("Debes estar logueado");
         return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("userId", user.id);
      if (formData.youtubeUrl) data.append("youtubeUrl", formData.youtubeUrl);

      // ENVIAR CATEGORÍAS MÚLTIPLES (mínimo 2, duplicamos si solo hay 1)
      const categories =
         formData.categories.length >= 2
            ? formData.categories
            : [...formData.categories, formData.categories[0] || "Clients"];

      categories.forEach((cat) => data.append("categories", cat));

      files.forEach((file) => data.append("images", file));

      try {
         const res = await api.post("/testimonies/post", data);
         if (res.data.success) {
            toast.success("Testimonio creado!");
            setModalOpen(false);
            fetchAll();
         }
      } catch (err) {
         toast.error(err.response?.data?.message || "Error al crear");
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
         const res = await api.put(
            `/testimonies/edit/${currentTestimonial.id}`,
            payload
         );
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

const [modalIsOpen, setModalIsOpen] = useState(false);
const [selectedTestimonial, setSelectedTestimonial] = useState(null);   
const [deleteModal, setDeleteModal] = useState({
  isOpen: false,
  testimonial: null,
  onConfirm: null, // opcional, lo usaremos en el modal de edición
});

// FUNCIÓN PARA CERRAR EL MODAL DE EDICIÓN
const closeModal = () => {
  setModalIsOpen(false);
  setSelectedTestimonial(null);
};


// FUNCIÓN PARA CERRAR EL MODAL DE CONFIRMACIÓN
const closeDeleteConfirm = () => {
  setDeleteModal({ isOpen: false, testimonial: null });
};

// FUNCIÓN DE ELIMINACIÓN (¡AHORA SÍ TIENE ACCESO A closeModal!)
const deleteTestimonial = async (testimonial) => {
  if (!testimonial?.id) return;

  try {
    await api.delete(`/testimonies/delete/${testimonial.id}`);

    toast.success(`"${testimonial.title}" eliminado correctamente`);

    // Actualiza la lista
    setTestimonials(prev => prev.filter(t => t.id !== testimonial.id));

    // Cierra ambos modales
    closeDeleteConfirm();
    closeModal(); // ← AHORA SÍ EXISTE AQUÍ

  } catch (err) {
    console.error("Error eliminando:", err);
    toast.error("No se pudo eliminar el testimonio");
  }
};

   return (
      <div className="space-y-8">
         {/* <Toaster position="top-right" /> */}

         {/* Header */}
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Testimonios
               </h1>
               <p className="text-gray-600 dark:text-gray-400">
                  Gestiona todos los testimonios
               </p>
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
                  {/* <select
                     className="input"
                     value={filterCategories}
                     onChange={(e) => setFilterCategories(e.target.value)}>
                     <option value="all">Todos</option>
                     <option value="Clients">Clientes</option>
                     <option value="Suppliers">Proveedores</option>
                     <option value="Products">Productos</option>
                     <option value="Events">Eventos</option>
                  </select> */}
                  {/* Multi-Select de Categorías (¡queda perfecto!) */}
                  <CategoryMultiSelect
                     selected={filterCategories}
                     onChange={setFilterCategories}
                  />

                  <select
                     className="input"
                     value={filterStatus}
                     onChange={(e) => setFilterStatus(e.target.value)}>
                     <option value="all">Todos</option>
                     <option value="approved">Aprobado</option>
                     <option value="pending">Pendiente</option>
                     <option value="rejected">Rechazado</option>
                  </select>

                  <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                     <button
                        onClick={() => setViewMode("cards")}
                        className={`p-2.5 rounded-lg ${
                           viewMode === "cards"
                              ? "bg-white dark:bg-gray-600 shadow-sm"
                              : ""
                        }`}>
                        <Grid3X3 className="w-5 h-5" />
                     </button>
                     <button
                        onClick={() => setViewMode("table")}
                        className={`p-2.5 rounded-lg ${
                           viewMode === "table"
                              ? "bg-white dark:bg-gray-600 shadow-sm"
                              : ""
                        }`}>
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
                        onDelete={() => setDeleteModal({ isOpen: true, testimonial: t })}
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
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Usuario</th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Titulo</th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hidden sm:table-cell">Descripción</th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Categoria</th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estado</th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">Fecha</th>
                           <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
                        </tr>
                     </thead>

                     <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {paginated.map((t) => {
                           const categories = (t.categories || []).map(
                              (cat) => {
                                 const config = STATUS_CONFIG[cat.name] || {
                                    Icon: null,
                                    badge: "badge-draft",
                                    label: cat.name,
                                 };
                                 return { ...cat, config };
                              }
                           );

                           const statusConfig =
                              STATUS_CONFIG[t.status] || STATUS_CONFIG.draft;
                           const StatusIcon = statusConfig.Icon;

                           return (
                              <tr
                                 key={t.id}
                                 className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                 {/* Usuario */}
                                 <td className="px-6 py-4 text-gray-900 dark:text-white">
                                    {t.user?.username || "Anónimo"}
                                 </td>

                                 {/* Título */}
                                 <td className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-xs">
                                    <p className="truncate">{t.title}</p>
                                 </td>

                                 {/* Descripción (oculta en móvil) */}
                                 <td className="px-6 py-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell max-w-md">
                                    <p className="line-clamp-2 text-sm">
                                       {t.description}
                                    </p>
                                 </td>

                                 {/* Categorías → múltiples badges con ícono */}
                                 <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1.5">
                                       {categories.length > 0 ? (
                                          categories.map((cat) => {
                                             const Icon = cat.config.Icon;
                                             return (
                                                <span
                                                   key={cat.id}
                                                   className={`badge ${cat.config.badge} text-xs flex items-center gap-1 px-2 py-0.5 rounded-full font-medium`}>
                                                   {Icon && (
                                                      <Icon className="w-3.5 h-3.5" />
                                                   )}
                                                   {cat.config.label}
                                                </span>
                                             );
                                          })
                                       ) : (
                                          <span className="text-gray-500 text-xs">
                                             —
                                          </span>
                                       )}
                                    </div>
                                 </td>

                                 {/* Estado */}
                                 <td className="px-6 py-4">
                                    <span
                                       className={`badge ${statusConfig.badge} flex items-center gap-1.5 text-xs font-medium`}>
                                       <StatusIcon className="w-4 h-4" />
                                       {statusConfig.label}
                                    </span>
                                 </td>

                                 {/* Fecha */}
                                 <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm hidden md:table-cell">
                                    {new Date(t.createdAt).toLocaleDateString(
                                       "es-ES"
                                    )}
                                 </td>

                                 {/* Acciones */}
                                 <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                       <button
                                          onClick={() => openModal(t)}
                                          className="text-indigo-600 hover:text-indigo-500 transition"
                                          title="Editar">
                                          <Edit2 className="w-5 h-5" />
                                       </button>
                                       <button
                                          onClick={() => {
                                             setDeleteModal({
                                                isOpen: true,
                                                testimonial: t,
                                             });
                                          }}
                                          className="text-red-600 hover:text-red-500 transition"
                                          title="Eliminar">
                                          <Trash2 className="w-5 h-5" />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           );
                        })}
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
                  className="btn-ghost">
                  ← Anterior
               </button>
               <span className="self-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  Página {currentPage} de {totalPages}
               </span>
               <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn-ghost">
                  Siguiente →
               </button>
            </div>
         )}

         <TestimonialModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            testimonial={currentTestimonial}
            onSave={currentTestimonial?.id ? handleEdit : handleCreate}
onDeleteClick={(testimonial) => {
    setDeleteModal({ isOpen: true, testimonial });
  }}
         />
         <DeleteConfirmModal
            isOpen={deleteModal.isOpen}
            onClose={closeDeleteConfirm}
            onConfirm={() => deleteTestimonial(deleteModal.testimonial)}
            title={deleteModal.testimonial?.title || "el testimonio"}
         />
      </div>
   );
}
