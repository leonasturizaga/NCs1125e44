//-------------------- version 5 ----------------------
// src/features/testimonials/pages/TestimonialList.jsx
// import { useState, useEffect } from "react";
// import { Plus } from "lucide-react";
// import TestimonialCard from "../components/TestimonialCard";
// import TestimonialModal from "../components/TestimonialModal";
// // import api from "@/lib/api";
// import axios from "axios";
// // import api from "../../../services/apiClient";
// import api from "@/services/apiClient";
// import toast, { Toaster } from "react-hot-toast";

// const ITEMS_PER_PAGE = 12;
// const id = "56b98037-e823-4e8d-9db0-ad9671029a11";

// export default function TestimonialList() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState(null);

//   // Cargar testimonios
//   const fetchTestimonials = async () => {
//     try {
//       const res = await api.get("/testimonies");
//       setTestimonials(res.data);
//     } catch (err) {
//       toast.error("Error cargando testimonios");
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   const openModal = (testimonial = null) => {
//     setCurrentTestimonial(testimonial);
//     setModalOpen(true);
//   };

//   const handleSave = async (data) => {
//     try {
//       if (currentTestimonial?.id) {
//         await api.put(`/testimonies/edit/${currentTestimonial.id}`, data);
//         toast.success("Testimonio actualizado");
//       } else {
//         await api.post("/testimonies/post", data);
//         toast.success("Testimonio creado");
//       }
//       setModalOpen(false);
//       fetchTestimonials();
//     } catch (err) {
//       toast.error("Error guardando");
//     }
//   };

//   const handleDelete = async () => {
//     if (confirm("¿Eliminar este testimonio?")) {
//       try {
//         await api.delete(`/testimonies/${currentTestimonial.id}`);
//         toast.success("Eliminado");
//         setModalOpen(false);
//         fetchTestimonials();
//       } catch (err) {
//         toast.error("Error eliminando");
//       }
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Toaster position="top-right" />

//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Testimonios</h1>
//           <p className="text-gray-600">Gestiona y modera todos los testimonios</p>
//         </div>
//         <button onClick={() => openModal()} className="btn-primary">
//           <Plus className="w-5 h-5" />
//             Nuevo Testimonio
//         </button>
//       </div>

//       {/* Grid de tarjetas */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
//         {testimonials.map((t) => (
//           <TestimonialCard
//             key={t.id}
//             testimonial={t}
//             showActions={true}
//             onEdit={openModal}
//             onDelete={(t) => openModal(t)}
//           />
//         ))}
//       </div>

//       {/* Modal único */}
//       <TestimonialModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         testimonial={currentTestimonial}
//         onSave={handleSave}
//         onDelete={currentTestimonial ? handleDelete : undefined}
//       />
//     </div>
//   );
// }

//-------------------- version 6 ----------------------
// src/features/testimonials/pages/TestimonialList.jsx
// import { useState, useEffect } from "react";
// import { STATUS_CONFIG } from "@/constants/statusConfig";
// import {
//   Search, Plus, Grid3X3, Table as TableIcon,
//   ChevronLeft, ChevronRight
// } from "lucide-react";
// import { Toaster, toast } from "react-hot-toast";
// import api from "@/services/apiClient";
// import TestimonialCard from "../components/TestimonialCard";
// import TestimonialModal from "../components/TestimonialModal";

// const ITEMS_PER_PAGE = 12;
// // const TESTIMONY_ID = "c60dc828-af2a-4306-a2de-ce2685bfe696";
// const TESTIMONY_ID = "1030edd9-cecd-4136-a11e-f0965482c346";

// export default function TestimonialList() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState("cards");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState(null);

//   // Fetch testimonials (currently only one exists)
//   const fetchTestimonials = async () => {
//     try {
//       setLoading(true);
//       // const res = await api.get(`/testimonies/getById/${TESTIMONY_ID}`);
//       const res = await api.get(`/testimonies/getAll?page=1&size=10`);
//       if (res.data.success) {
//         setTestimonials([res.data.data]);
//       }
//     } catch (err) {
//       toast.error("Error loading testimonials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   // Filter & search
//   const filtered = testimonials.filter(t => {
//     const matchesSearch = t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           t.description?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === "all" || t.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const paginated = filtered.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const openModal = (testimonial = null) => {
//     setCurrentTestimonial(testimonial);
//     setModalOpen(true);
//   };

// //   const handleSave = async (data) => {
// //     try {
// //       if (currentTestimonial?.id) {
// //         // Edit existing
// //         const res = await api.put(`/testimonies/edit/${currentTestimonial.id}`, data);
// //         if (res.data.success) {
// //           toast.success("Testimonial updated!");
// //           fetchTestimonials();
// //         }
// //       } else {
// //         // Create new
// //         const res = await api.post("/testimonies/post", data);
// //         if (res.data.success) {
// //           toast.success("Testimonial created!");
// //           fetchTestimonials();
// //         }
// //       }
// //       setModalOpen(false);
// //     } catch (err) {
// //       toast.error("Error saving testimonial");
// //     }
// //   };

// const handleSave = async (data) => {
//   try {
//     let res;

//     if (currentTestimonial?.id) {
//       // EDIT
//       res = await api.put(`/testimonies/edit/${currentTestimonial.id}`, data);
//     } else {
//       // CREATE
//       res = await api.post("/testimonies/post", data);
//     }

//     // ONLY success if HTTP 200 AND backend says success
//     if (res.status === 200 && res.data?.success) {
//       toast.success(
//         currentTestimonial?.id
//           ? "Testimonio actualizado con éxito"
//           : "Testimonio creado con éxito"
//       );
//       setModalOpen(false);
//       fetchTestimonials(); // refresh list
//     } else {
//       // Backend returned error
//       toast.error(res.data?.message || "Error del servidor");
//       console.error("API Error Response:", res.data);
//     }
//   } catch (err) {
//     // Network error, 4xx, 5xx, etc.
//     const message = err.response?.data?.message || err.message || "Error de conexión";
//     toast.error(message);
//     console.error("Request failed:", err.response || err);
//   }
// };

//   const handleDelete = async () => {
//     if (confirm("Delete this testimonial permanently?")) {
//       try {
//         // DELETE not provided yet → mock for now
//         toast.success("Deleted (mock)");
//         setTestimonials([]);
//         setModalOpen(false);
//       } catch (err) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Toaster position="top-right" />

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
//           <p className="text-gray-600 mt-1">Manage and moderate all testimonials</p>
//         </div>
//         <button onClick={() => openModal()} className="btn-primary">
//           <Plus className="w-5 h-5" />
//           New Testimonial
//         </button>
//       </div>

//       {/* Filters + View Toggle */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//         <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
//           <div className="flex-1 relative w-full">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by title or content..."
//               className="input"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             <select
//               className="input"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All statuses</option>
//               <option value="published">Published</option>
//               <option value="pending">Pending</option>
//               <option value="draft">Draft</option>
//             </select>

//             <div className="flex bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setViewMode("cards")}
//                 className={`p-2 rounded-md ${viewMode === "cards" ? "bg-white shadow-sm" : ""}`}
//               >
//                 <Grid3X3 className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode("table")}
//                 className={`p-2 rounded-md ${viewMode === "table" ? "bg-white shadow-sm" : ""}`}
//               >
//                 <TableIcon className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Loading state */}
//       {loading && (
//         <div className="text-center py-12">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//         </div>
//       )}

//       {/* Cards View */}
//       {viewMode === "cards" && !loading && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
//           {paginated.map((t) => (
//             <TestimonialCard
//               key={t.id}
//               testimonial={t}
//               showActions={true}
//               onEdit={openModal}
//               onDelete={() => openModal(t)}
//             />
//           ))}
//         </div>
//       )}

//       {/* Table View */}
//       {viewMode === "table" && !loading && (
//         // Your beautiful table code here (we'll add it next if you want)
//         <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//           <p className="p-8 text-center text-gray-500">Table view coming soon...</p>
//         </div>
//       )}

//       {/* Unified Modal */}
//       <TestimonialModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         testimonial={currentTestimonial}
//         onSave={handleSave}
//         onDelete={currentTestimonial ? handleDelete : undefined}
//       />
//     </div>
//   );
// }

//-------------------- version 7 ----------------------
// src/features/testimonials/pages/TestimonialList.jsx
import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import api from "@/services/apiClient";
import TestimonialCard from "../components/TestimonialCard";
import TestimonialModal from "../components/TestimonialModal";

const ITEMS_PER_PAGE = 10;

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  // Fetch all testimonials
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
      console.error(err);
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
    
    // Add text fields
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.youtubeUrl) data.append("youtubeUrl", formData.youtubeUrl);
    data.append("userId", "895e3aa4-475e-410c-8e26-e53f347e2cca"); // ← tu userId real

    // Add images
    files.forEach((file, index) => {
      data.append("images", file);
    });

    try {
      let res;
      if (currentTestimonial?.id) {
        // PUT not ready yet → mock
        toast.success("Edición simulada (PUT no disponible aún)");
      } else {
        res = await api.post("/testimonies/post", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (res?.data?.success || !currentTestimonial?.id) {
        toast.success(currentTestimonial?.id ? "Actualizado!" : "Testimonio creado!");
        setModalOpen(false);
        fetchTestimonials(currentPage);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Error al guardar";
      toast.error(msg);
      console.error(err.response || err);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonios</h1>
          <p className="text-gray-600">Gestiona todos los testimonios</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus className="w-5 h-5" />
          Nuevo Testimonio
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {testimonials.length === 0 ? (
            <p className="col-span-full text-center py-20 text-gray-500 text-lg">
              No hay testimonios aún
            </p>
          ) : (
            testimonials.map((t) => (
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
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={() => fetchTestimonials(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-ghost"
          >
            ← Anterior
          </button>
          <span className="self-center text-sm font-medium">
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

      {/* Modal */}
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