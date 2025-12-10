
 // ===============================================
 // MOCK DATA Y CONFIGURACIÓN
 // ===============================================
// const mockTestimonials = [
//     { id: 1, author: "María González", title: "Excelente servicio", content: "Excellent service, exceeded my expectations...", category: "Clients", status: "published", date: "2025-11-15", views: 342, createdAt: new Date() },
//     { id: 2, author: "Carlos Pérez", title: "Muy recomendado", content: "Highly recommended, personalized attention.", category: "Suppliers", status: "pending", date: "2025-11-18", views: 89, createdAt: new Date() },
//     { id: 3, author: "Ana Rodríguez", title: "Mejor equipo", content: "Best team I've worked with.", category: "Employees", status: "published", date: "2025-11-10", views: 567, createdAt: new Date() },
//     { id: 4, author: "Luis Fernández", title: "Rápido y profesional", content: "Fast and professional.", category: "Clients", status: "rejected", date: "2025-11-10", views: 12, createdAt: new Date() },
//     { id: 5, author: "Laura Méndez", title: "Gran experiencia", content: "Great experience.", category: "Clients", status: "published", date: "2025-11-08", views: 210, createdAt: new Date() },
//     { id: 6, author: "Diego Ruiz", title: "Siempre confiable", content: "Always reliable.", category: "Suppliers", status: "pending", date: "2025-11-07", views: 67, createdAt: new Date() },
//     { id: 7, author: "Sofía Herrera", title: "Máxima calidad", content: "Top-notch quality.", category: "Clients", status: "published", date: "2025-11-05", views: 189, createdAt: new Date() },
//     { id: 8, author: "Mateo Silva", title: "Superó expectativas", content: "Exceeded expectations.", category: "Employees", status: "draft", date: "2025-11-03", views: 45, createdAt: new Date() },
// ];
// Configuración de íconos para la tabla (Usada como fallback si no usas STATUS_CONFIG)
// const statusConfig = {
//     // CAMBIO: Usamos 'published' para el color verde
//     published: { Icon: CheckCircle, label: 'Publicado', color: "bg-green-700/30 text-green-300" }, 
//     pending: 	{ Icon: Clock, label: 'Pendiente', color: "bg-yellow-700/30 text-yellow-300" },
//     draft: 		{ Icon: FileText, label: 'Borrador', color: "bg-gray-700/30 text-gray-400" },
//     // Eliminamos 'approved' si no se usa. Mantenemos 'rejected' como backup.
//     rejected:   { Icon: XCircle, label: 'Rechazado', color: "bg-red-700/30 text-red-300" },
// };

// const ITEMS_PER_PAGE = 9;

// export default function TestimonialList() {
//     const [testimonials, setTestimonials] = useState(mockTestimonials); 
//     const [loading, setLoading] = useState(false); 
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterStatus, setFilterStatus] = useState("all");
//     const [viewMode, setViewMode] = useState("table"); 
//     const [currentPage, setCurrentPage] = useState(1);

//     const [modalOpen, setModalOpen] = useState(false);
//     const [currentTestimonial, setCurrentTestimonial] = useState(null);

//     Lógica fetchAll, useEffects, handleCreate, handleEdit, handleDelete se mantienen aquí...

//     Reset page when search/filter changes
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchTerm, filterStatus]);

//     Client-side filtering
//     const filtered = testimonials.filter((t) => {
//         const matchesSearch =
//             t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             t.content?.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesStatus = filterStatus === "all" || t.status === filterStatus;
//         return matchesSearch && matchesStatus;
//     });

//     const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//     const paginated = filtered.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );

//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     const openModal = (testimonial = null) => {
//         setCurrentTestimonial(testimonial);
//         setModalOpen(true);
//     };

//     const handleCreate = (formData) => console.log('Create:', formData);
//     const handleEdit = (formData) => console.log('Edit:', formData);
//     const handleDelete = () => alert("Delete not implemented yet");


//     return (
//         <div className="space-y-8">
            
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div>
//                     <h1 className="text-3xl font-bold text-white">Gestión de Testimonios</h1>
//                     <p className="text-gray-400 mt-1">Administra y modera todos los testimonios</p>
//                 </div>
//                 <button onClick={() => openModal()} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md">
//                     <Plus className="w-5 h-5" />
//                     Nuevo Testimonio
//                 </button>
//             </div>

//             {/* Search + Filter + Toggle */}
//             <div className="bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-700">
//                 <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
//                     <div className="flex-1 relative w-full">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
//                         <input
//                             type="text"
//                             placeholder="Buscar por título o descripción..."
//                             className="input pl-12 bg-gray-900 text-white border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <select
//     className="input bg-gray-900 text-white border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
//     value={filterStatus}
//     onChange={(e) => setFilterStatus(e.target.value)}
// >
//     <option value="all">Todos</option>
//     <option value="published">Publicado</option>
//     <option value="pending">Pendiente</option>
//     <option value="rejected">Rechazado</option> 
//     <option value="draft">Borrador</option> {/* ¡AÑADE ESTA LÍNEA! */}
// </select>

//                         <div className="flex bg-gray-700 rounded-lg p-1">
//                             <button
//                                 onClick={() => setViewMode("cards")}
//                                 className={`p-2.5 rounded-lg transition ${viewMode === "cards" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-400 hover:bg-gray-600"}`}
//                                 title="Vista de tarjetas"
//                             >
//                                 <Grid3X3 className="w-5 h-5" />
//                             </button>
//                             <button
//                                 onClick={() => setViewMode("table")}
//                                 className={`p-2.5 rounded-lg transition ${viewMode === "table" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-400 hover:bg-gray-600"}`}
//                                 title="Vista de tabla"
//                             >
//                                 <TableIcon className="w-5 h-5" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Cards View (Simplemente mapea las cards) */}
//             {viewMode === "cards" && !loading && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {paginated.length === 0 ? (
//                         <p className="col-span-full text-center py-20 text-gray-500">
//                             No hay testimonios
//                         </p>
//                     ) : (
//                         paginated.map((t) => (
//                             <TestimonialCard
//                                 key={t.id}
//                                 // Corregido: Asegurar que el status se pase en minúsculas
//                                 testimonial={{...t, status: t.status.toLowerCase()}}
//                                 showActions={true}
//                                 onEdit={() => openModal(t)}
//                                 onDelete={() => handleDelete()} 
//                             />
//                         ))
//                     )}
//                 </div>
//             )}

//             {/* Table View */}
//             {viewMode === "table" && !loading && (
//                 <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             {/* Head de la tabla (Fondo más oscuro que el cuerpo) */}
//                             <thead className="bg-gray-700/50 border-b border-gray-700 text-gray-400">
//                                 <tr>
//                                     <th className="px-6 py-4 text-left text-xs font-medium uppercase">Titulo</th>
//                                     <th className="px-6 py-4 text-left text-xs font-medium uppercase hidden sm:table-cell">Descripción</th>
//                                     <th className="px-6 py-4 text-left text-xs font-medium uppercase">Estado</th>
//                                     <th className="px-6 py-4 text-left text-xs font-medium uppercase hidden md:table-cell">Fecha</th>
//                                     <th className="px-6 py-4 text-right text-xs font-medium uppercase">Acciones</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-700 text-gray-200">
//                                 {paginated.map((t) => {
//                                     // Corregido: Usar el status en minúsculas
//                                     const status = statusConfig[t.status.toLowerCase()] || statusConfig['draft']; 
//                                     return (
//                                         <tr key={t.id} className="hover:bg-gray-700/40 transition">
//                                             <td className="px-6 py-4 font-medium text-white">{t.title}</td>
//                                             <td className="px-6 py-4 text-gray-300 hidden sm:table-cell">
//                                                 <p className="line-clamp-2">{t.description || t.content}</p>
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
//                                                     <status.Icon className="w-4 h-4" />
//                                                     {status.label}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 text-gray-400 text-sm hidden md:table-cell">{new Date(t.createdAt).toLocaleDateString()}</td>
//                                             <td className="px-6 py-4 text-right">
//                                                 <div className="flex items-center justify-end gap-2">
//                                                     <button onClick={() => openModal(t)} className="p-2 rounded-full hover:bg-gray-700 text-indigo-400 transition">
//                                                         <Edit2 className="w-5 h-5" />
//                                                     </button>
//                                                     <button onClick={() => handleDelete()} className="p-2 rounded-full hover:bg-gray-700 text-red-400 transition">
//                                                         <Trash2 className="w-5 h-5" />
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//                 <div className="flex justify-center gap-6 mt-12">
//                     <button
//                         onClick={() => goToPage(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="text-gray-300 hover:text-white disabled:opacity-50 transition"
//                     >
//                         ← Anterior
//                     </button>
//                     <span className="self-center text-sm font-medium text-gray-300">
//                         Página {currentPage} de {totalPages}
//                     </span>
//                     <button
//                         onClick={() => goToPage(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="text-gray-300 hover:text-white disabled:opacity-50 transition"
//                     >
//                         Siguiente →
//                     </button>
//                 </div>
//             )}

//             {/* Modal (Implementación del ModalModule debe ser separada) */}
//             <TestimonialModal
//                 isOpen={modalOpen}
//                 onClose={() => setModalOpen(false)}
//                 testimonial={currentTestimonial}
//                 onSave={currentTestimonial?.id ? handleEdit : handleCreate}
//                 onDelete={currentTestimonial ? handleDelete : undefined}
//             />
//         </div>
//     );
// }


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
import CategoryMultiSelect from "../components/CategoryMultiselect";

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

   // CREATE — uses FormData
   //   const handleCreate = async (formData, files = []) => {
   //    console.log("Creating testimonial:", user);
   //       if (!user?.id) {
   //          toast.error("Debes estar logueado");
   //          return;
   //       }
   //      const data = new FormData();
   //      data.append("title", formData.title);
   //      data.append("description", formData.description);
   //      data.append("userId", user.id);
   //      if (formData.youtubeUrl) data.append("youtubeUrl", formData.youtubeUrl);

   //      files.forEach((file) => data.append("images", file));

   //      try {
   //         const res = await api.post("/testimonies/post", data, {
   //            headers: {
   //               "Content-Type": "multipart/form-data",
   //            },
   //         });
   //         console.log(res);
   //         console.log(data);
   //         if (res.data.success) {
   //            toast.success("Testimonio creado con éxito!");
   //            setModalOpen(false);
   //            fetchAll(); // refresh
   //         }
   //      } catch (err) {
   //         const msg = err.response?.data?.message || "Error al crear testimonio";
   //         toast.error(msg);
   //         console.error("Create error:", err.response?.data || err);
   //      }
   //   };

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

   const handleDelete = () => {
      alert("Delete not implemented yet");
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
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                              Usuario
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                              Titulo
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hidden sm:table-cell">
                              Descripción
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                              Categoria
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                              Estado
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">
                              Fecha
                           </th>
                           <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                              Acciones
                           </th>
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
                                          onClick={() => openDeleteModal(t)}
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
            onDelete={currentTestimonial ? handleDelete : undefined}
         />
      </div>
   );
}
