//--------------- version 0 ---------------
// export default function TestimonialsList() {
//   return (
//     <div className="text-center py-12">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">Testimonios</h1>
//       <p className="text-gray-600">Lista y moderación</p>
//       <a href="/" className="flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium">
//         Home
//       </a>
//     </div>
//   );
// }

//--------------- version 1 ---------------
// import { useState, useEffect } from "react";
// import { Search, Plus, Edit2, Trash2, Eye, Clock, CheckCircle, XCircle } from "lucide-react";
// import TestimonialCard from "../components/TestimonialCard";

// const mockTestimonials = [
//    { id: 1, author: "María González", content: "Excelente servicio, superaron mis expectativas...", category: "Clientes", status: "published", date: "2025-11-15", views: 342 },
//    { id: 2, author: "Carlos Pérez", content: "Muy recomendado, atención personalizada.", category: "Proveedores", status: "pending", date: "2025-11-18", views: 89 },
//    { id: 3, author: "Ana Rodríguez", content: "El mejor equipo con el que trabajé.", category: "Empleados", status: "published", views: 567 },
//    { id: 4, author: "Luis Fernández", content: "Rápidos y profesionales.", category: "Clientes", status: "draft", date: "2025-11-10", views: 12 },
// ];

// const statusConfig = {
//    published: { color: "bg-green-100 text-green-800", icon: CheckCircle },
//    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
//    draft: { color: "bg-gray-100 text-gray-800", icon: XCircle },
// };

// export default function TestimonialsList() {
//    const [searchTerm, setSearchTerm] = useState("");
//    const [filterStatus, setFilterStatus] = useState("all");

//    const filtered = mockTestimonials.filter((t) => {
//       const matchesSearch = t.author.toLowerCase().includes(searchTerm.toLowerCase()) || t.content.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = filterStatus === "all" || t.status === filterStatus;
//       return matchesSearch && matchesStatus;
//    });

//    //edit and delete handlers
//    const handleEdit = (testimonial) => {
//       // Navigate to edit page
//       window.location.href = `/testimonials/edit/${testimonial.id}`;
//    };

//    const handleDelete = (testimonial) => {
//       if (confirm(`¿Eliminar testimonio de ${testimonial.author}?`)) {
//          alert("Eliminado (mock)");
//       }
//    };

//    return (
//       <div className="space-y-6">
//          {/* Page Header */}
//          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//                <h1 className="text-3xl font-bold text-gray-900">Testimonios</h1>
//                <p className="text-gray-600 mt-1">
//                   Gestiona y modera todos los testimonios
//                </p>
//             </div>
//             <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition font-medium">
//                <Plus className="w-5 h-5" />
//                Nuevo Testimonio
//             </button>
//          </div>

//          {/* Filters Bar */}
//          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex flex-col lg:flex-row gap-4">
//                <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                      type="text"
//                      placeholder="Buscar por autor o contenido..."
//                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//                      value={searchTerm}
//                      onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                </div>

//                <select
//                   className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}>
//                   <option value="all">Todos los estados</option>
//                   <option value="published">Publicado</option>
//                   <option value="pending">Pendiente</option>
//                   <option value="draft">Borrador</option>
//                </select>
//             </div>
//          </div>

//          {/* Table – fully responsive */}
//          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//             <div className="overflow-x-auto">
//                <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                      <tr>
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                            Autor
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
//                            Contenido
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                            Categoría
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                            Estado
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
//                            Fecha
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
//                            Vistas
//                         </th>
//                         <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                            Acciones
//                         </th>
//                      </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                      {filtered.map((t) => {
//                         const StatusIcon = statusConfig[t.status].icon;
//                         return (
//                            <tr
//                               key={t.id}
//                               className="hover:bg-gray-50 transition">
//                               <td className="px-6 py-4 font-medium text-gray-900">
//                                  {t.author}
//                               </td>
//                               <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
//                                  <p className="line-clamp-2">{t.content}</p>
//                               </td>
//                               <td className="px-6 py-4 text-gray-600">
//                                  {t.category}
//                               </td>
//                               <td className="px-6 py-4">
//                                  <span
//                                     className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
//                                        statusConfig[t.status].color
//                                     }`}>
//                                     <StatusIcon className="w-4 h-4" />
//                                     {t.status === "published"
//                                        ? "Publicado"
//                                        : t.status === "pending"
//                                        ? "Pendiente"
//                                        : "Borrador"}
//                                  </span>
//                               </td>
//                               <td className="px-6 py-4 text-gray-500 text-sm hidden md:table-cell">
//                                  {t.date}
//                               </td>
//                               <td className="px-6 py-4 text-gray-500 text-sm hidden lg:table-cell">
//                                  <div className="flex items-center gap-1">
//                                     <Eye className="w-4 h-4" />
//                                     {t.views}
//                                  </div>
//                               </td>
//                               <td className="px-6 py-4 text-right">
//                                  <div className="flex items-center justify-end gap-2">
//                                     <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
//                                        <Edit2 className="w-5 h-5" />
//                                     </button>
//                                     <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
//                                        <Trash2 className="w-5 h-5" />
//                                     </button>
//                                  </div>
//                               </td>
//                            </tr>
//                         );
//                      })}
//                   </tbody>
//                </table>
//             </div>

//             {/* Mobile card fallback */}
//             <div className="sm:hidden">
//                {filtered.map((t) => {
//                   const StatusIcon = statusConfig[t.status].icon;
//                   const statusText =
//                      t.status === "published"
//                         ? "Publicado"
//                         : t.status === "pending"
//                         ? "Pendiente"
//                         : "Borrador";

//                   return (
//                      <div key={t.id} className="p-4 border-b border-gray-200">
//                         <div className="flex justify-between items-start mb-2">
//                            <h3 className="font-semibold text-gray-900">
//                               {t.author}
//                            </h3>
//                            <span
//                               className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
//                                  statusConfig[t.status].color
//                               }`}>
//                               <StatusIcon className="w-3 h-3" />
//                               {statusText}
//                            </span>
//                         </div>
//                         <p className="text-gray-600 text-sm line-clamp-2 mb-2">
//                            {t.content}
//                         </p>
//                         <div className="flex justify-between text-sm text-gray-500">
//                            <span>{t.category}</span>
//                            <span>{t.date}</span>
//                         </div>
//                      </div>
//                   );
//                })}
//             </div>
//          </div>

//          {/* Card Grid – Fully responsive */}
//          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.length === 0 ? (
//                <div className="col-span-full text-center py-12 text-gray-500">
//                   No se encontraron testimonios
//                </div>
//             ) : (
//                filtered.map((testimonial) => (
//                   <TestimonialCard
//                      key={testimonial.id}
//                      testimonial={testimonial}
//                      showActions={true}
//                      onEdit={handleEdit}
//                      onDelete={handleDelete}
//                   />
//                ))
//             )}
//          </div>
//       </div>
//    );
// }

//--------------- version 3 --------------------
import { useState, useEffect } from "react";
import { Search, Plus, Grid3X3, Table as TableIcon, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, CheckCircle, Clock, XCircle } from "lucide-react";
import TestimonialCard from "../components/TestimonialCard";

const mockTestimonials = [
  { id: 1, author: "María González", content: "Excellent service, exceeded my expectations...", category: "Clients", status: "published", date: "2025-11-15", views: 342 },
  { id: 2, author: "Carlos Pérez", content: "Highly recommended, personalized attention.", category: "Suppliers", status: "pending", date: "2025-11-18", views: 89 },
  { id: 3, author: "Ana Rodríguez", content: "Best team I've worked with.", category: "Employees", status: "published", date: "2025-11-10", views: 567 },
  { id: 4, author: "Luis Fernández", content: "Fast and professional.", category: "Clients", status: "draft", date: "2025-11-10", views: 12 },
  { id: 5, author: "Laura Méndez", content: "Great experience.", category: "Clients", status: "published", date: "2025-11-08", views: 210 },
  { id: 6, author: "Diego Ruiz", content: "Always reliable.", category: "Suppliers", status: "pending", date: "2025-11-07", views: 67 },
  { id: 7, author: "Sofía Herrera", content: "Top-notch quality.", category: "Clients", status: "published", date: "2025-11-05", views: 189 },
  { id: 8, author: "Mateo Silva", content: "Exceeded expectations.", category: "Employees", status: "draft", date: "2025-11-03", views: 45 },
  // Add more if you want to test pagination
];

const statusConfig = {
  published: { color: "bg-green-100 text-green-800", Icon: CheckCircle },
  pending:   { color: "bg-yellow-100 text-yellow-800", Icon: Clock },
  draft:     { color: "bg-gray-100 text-gray-800", Icon: XCircle },
};

const ITEMS_PER_PAGE = 6;

export default function TestimonialList() {
  // Load preferences from localStorage or fallback to defaults
  const savedView = localStorage.getItem("testimonialViewMode") || "table";
  const savedPage = parseInt(localStorage.getItem("testimonialPage") || "1");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState(savedView);
  const [currentPage, setCurrentPage] = useState(savedPage);

  // Save view mode and page to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("testimonialViewMode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem("testimonialPage", currentPage.toString());
  }, [currentPage]);

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const filtered = mockTestimonials.filter((t) => {
    const matchesSearch =
      t.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleEdit = (id) => {
    // View and page are saved automatically → user returns to same state
    window.location.href = `/testimonials/edit/${id}`;
  };

  const handleDelete = (author) => {
    if (confirm(`Delete testimonial from ${author}?`)) {
      alert("Deleted (mock)");
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-1">Manage and moderate all testimonials</p>
        </div>
        <a
          href="/testimonials/create"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          <Plus className="w-5 h-5" />
          New Testimonial
        </a>
      </div>

      {/* Filters + View Toggle */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by author or content..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("cards")}
                className={`p-2 rounded-md transition ${viewMode === "cards" ? "bg-white shadow-sm" : ""}`}
                title="Card view"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md transition ${viewMode === "table" ? "bg-white shadow-sm" : ""}`}
                title="Table view"
              >
                <TableIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No testimonials found</div>
          ) : (
            filtered.map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                showActions={true}
                onEdit={() => handleEdit(t.id)}
                onDelete={() => handleDelete(t.author)}
              />
            ))
          )}
        </div>
      )}

      {/* Table View with Pagination */}
      {viewMode === "table" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Content</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Views</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginated.map((t) => {
                  const { Icon } = statusConfig[t.status];
                  return (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">{t.author}</td>
                      <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
                        <p className="line-clamp-2">{t.content}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{t.category}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[t.status].color}`}>
                          <Icon className="w-4 h-4" />
                          {t.status === "published" ? "Published" : t.status === "pending" ? "Pending" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm hidden md:table-cell">{t.date}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {t.views}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(t.id)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(t.author)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      page === currentPage ? "bg-indigo-600 text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


//-------------------- version 4 ----------------------
