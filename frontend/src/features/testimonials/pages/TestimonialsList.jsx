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

//-------------------- version 4 ----------------------
import { useState, useEffect } from "react";
import { Search, Plus, Grid3X3, Table as TableIcon, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, CheckCircle, Clock, XCircle, X } from "lucide-react";
import TestimonialCard from "../components/TestimonialCard";
//import TestimonialModal from "../components/TestimonialModal";

const mockTestimonials = [
  { id: 1, author: "María González", content: "Excellent service, exceeded my expectations...", category: "Clients", status: "published", date: "2025-11-15", views: 342 },
  { id: 2, author: "Carlos Pérez", content: "Highly recommended, personalized attention.", category: "Suppliers", status: "pending", date: "2025-11-18", views: 89 },
  { id: 3, author: "Ana Rodríguez", content: "Best team I've worked with.", category: "Employees", status: "published", date: "2025-11-10", views: 567 },
  { id: 4, author: "Luis Fernández", content: "Fast and professional.", category: "Clients", status: "draft", date: "2025-11-10", views: 12 },
  { id: 5, author: "Laura Méndez", content: "Great experience.", category: "Clients", status: "published", date: "2025-11-08", views: 210 },
  { id: 6, author: "Diego Ruiz", content: "Always reliable.", category: "Suppliers", status: "pending", date: "2025-11-07", views: 67 },
  { id: 7, author: "Sofía Herrera", content: "Top-notch quality.", category: "Clients", status: "published", date: "2025-11-05", views: 189 },
  { id: 8, author: "Mateo Silva", content: "Exceeded expectations.", category: "Employees", status: "draft", date: "2025-11-03", views: 45 },
  { id: 9, author: "Sofía Herrera", content: "Top-notch quality.", category: "Clients", status: "published", date: "2025-11-05", views: 189 },
  { id: 10, author: "Mateo Silva", content: "Exceeded expectations.", category: "Employees", status: "draft", date: "2025-11-03", views: 45 },
  { id: 11, author: "María González", content: "Excellent service, exceeded my expectations...", category: "Clients", status: "published", date: "2025-11-15", views: 342 },
  { id: 12, author: "Carlos Pérez", content: "Highly recommended, personalized attention.", category: "Suppliers", status: "pending", date: "2025-11-18", views: 89 },
  { id: 13, author: "Ana Rodríguez", content: "Best team I've worked with.", category: "Employees", status: "published", date: "2025-11-10", views: 567 },
  { id: 14, author: "Luis Fernández", content: "Fast and professional.", category: "Clients", status: "draft", date: "2025-11-10", views: 12 },
  { id: 15, author: "Laura Méndez", content: "Great experience.", category: "Clients", status: "published", date: "2025-11-08", views: 210 },
  { id: 16, author: "Diego Ruiz", content: "Always reliable.", category: "Suppliers", status: "pending", date: "2025-11-07", views: 67 },
  { id: 17, author: "Sofía Herrera", content: "Top-notch quality.", category: "Clients", status: "published", date: "2025-11-05", views: 189 },
  { id: 18, author: "Mateo Silva", content: "Exceeded expectations.", category: "Employees", status: "draft", date: "2025-11-03", views: 45 },
  // Add more if you want to test pagination
];

const statusConfig = {
  published: { color: "bg-green-100 text-green-800", Icon: CheckCircle },
  pending:   { color: "bg-yellow-100 text-yellow-800", Icon: Clock },
  draft:     { color: "bg-gray-100 text-gray-800", Icon: XCircle },
};

const ITEMS_PER_PAGE = 9;

export default function TestimonialsList() {
  // Load preferences from localStorage or fallback to defaults
  const savedView = localStorage.getItem("testimonialViewMode") || "table";
  const savedPage = parseInt(localStorage.getItem("testimonialPage") || "1");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState(savedView);
  const [currentPage, setCurrentPage] = useState(savedPage);

// → WITH this single block (adds persistence for everything)
useEffect(() => {
  const saved = {
    view: localStorage.getItem("testimonialView") || "table",
    page: parseInt(localStorage.getItem("testimonialPage") || "1"),
    search: localStorage.getItem("testimonialSearch") || "",
    filter: localStorage.getItem("testimonialFilter") || "all",
  };
  setViewMode(saved.view);
  setCurrentPage(saved.page);
  setSearchTerm(saved.search);
  setFilterStatus(saved.filter);
}, []);

// Save every time something changes
useEffect(() => {
  localStorage.setItem("testimonialView", viewMode);
  localStorage.setItem("testimonialPage", currentPage.toString());
  localStorage.setItem("testimonialSearch", searchTerm);
  localStorage.setItem("testimonialFilter", filterStatus);
}, [viewMode, currentPage, searchTerm, filterStatus]);

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

// Modal state and handlers  
const [modalOpen, setModalOpen] = useState(false);
const [editingTestimonial, setEditingTestimonial] = useState(null);
const [formData, setFormData] = useState({});

const openEditModal = (t) => {
  setEditingTestimonial(t);
  setFormData({ ...t });
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
  setEditingTestimonial(null);
  setFormData({});
};

const saveChanges = () => {
  // In real app: API call here
  alert(`Saved: ${formData.author} → ${formData.status}`);
  closeModal();
  // Optionally refetch data
};

const confirmDelete = () => {
  if (confirm(`Delete testimonial from ${editingTestimonial.author}?`)) {
    // API call here
    alert("Deleted!");
    closeModal();
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

{/* ========== CARDS VIEW – Force Full Width Grid ========== */}
{viewMode === "cards" && (
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {paginated.length === 0 ? (
              <p className="col-span-full text-center py-20 text-gray-500 text-lg">
                No testimonials found
              </p>
            ) : (
              paginated.map((t) => (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  showActions={true}
                  // onEdit={() => handleEdit(t.id)}
                  onEdit={() => handleEdit(t.id)}
                  onDelete={() => handleDelete(t.author)}
                />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-8 mt-12">
              <button className="btn-ghost disabled:opacity-50" disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                Previous
              </button>
              <span className="self-center text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button className="btn-ghost disabled:opacity-50" disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                Next
              </button>
            </div>
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
                          <button onClick={() => openEditModal(t)} className="btn-ghost text-indigo-600">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => { setEditingTestimonial(t); setModalOpen(true); }} className="btn-ghost text-red-600">
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

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-xl font-semibold">
                {editingTestimonial?.id ? "Edit" : "View"} Testimonial
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="modal-body space-y-5">
              <div>
                <label className="label">Author</label>
                <input
                  type="text"
                  className="input"
                  value={formData.author || ""}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Content</label>
                <textarea
                  rows="4"
                  className="input"
                  value={formData.content || ""}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Status</label>
                <select
                  className="input"
                  value={formData.status || "draft"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={confirmDelete} className="btn-danger mr-auto">
                Delete
              </button>
              <button onClick={closeModal} className="btn-ghost">
                Cancel
              </button>
              <button onClick={saveChanges} className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}


//-------------------- version 5 ----------------------
// import { useState, useEffect } from "react";
// import { Search, Plus, Grid3X3, Table as TableIcon, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, CheckCircle, Clock, XCircle, X } from "lucide-react";
// import TestimonialCard from "../components/TestimonialCard";

// const mockTestimonials = [
//   { id: 1, author: "María González", content: "Excellent service, exceeded my expectations...", category: "Clients", status: "published", date: "2025-11-15", views: 342 },
//   { id: 2, author: "Carlos Pérez", content: "Highly recommended, personalized attention.", category: "Suppliers", status: "pending", date: "2025-11-18", views: 89 },
//   { id: 3, author: "Ana Rodríguez", content: "Best team I've worked with.", category: "Employees", status: "published", date: "2025-11-10", views: 567 },
//   { id: 4, author: "Luis Fernández", content: "Fast and professional.", category: "Clients", status: "draft", date: "2025-11-10", views: 12 },
//   { id: 5, author: "Laura Méndez", content: "Great experience.", category: "Clients", status: "published", date: "2025-11-08", views: 210 },
//   { id: 6, author: "Diego Ruiz", content: "Always reliable.", category: "Suppliers", status: "pending", date: "2025-11-07", views: 67 },
//   { id: 7, author: "Sofía Herrera", content: "Top-notch quality.", category: "Clients", status: "published", date: "2025-11-05", views: 189 },
//   { id: 8, author: "Mateo Silva", content: "Exceeded expectations.", category: "Employees", status: "draft", date: "2025-11-03", views: 45 },
//   { id: 9, author: "Sofía Herrera", content: "Top-notch quality.", category: "Clients", status: "published", date: "2025-11-05", views: 189 },
//   { id: 10, author: "Mateo Silva", content: "Exceeded expectations.", category: "Employees", status: "draft", date: "2025-11-03", views: 45 },
//   { id: 11, author: "María González", content: "Excellent service, exceeded my expectations...", category: "Clients", status: "published", date: "2025-11-15", views: 342 },
//   { id: 12, author: "Carlos Pérez", content: "Highly recommended, personalized attention.", category: "Suppliers", status: "pending", date: "2025-11-18", views: 89 },
//   { id: 13, author: "Ana Rodríguez", content: "Best team I've worked with.", category: "Employees", status: "published", date: "2025-11-10", views: 567 },
//   { id: 14, author: "Luis Fernández", content: "Fast and professional.", category: "Clients", status: "draft", date: "2025-11-10", views: 12 },
//   { id: 15, author: "Laura Méndez", content: "Great experience.", category: "Clients", status: "published", date: "2025-11-08", views: 210 },
//   { id: 16, author: "Diego Ruiz", content: "Always reliable.", category: "Suppliers", status: "pending", date: "2025-11-07", views: 67 },
//   { id: 17, author: "Sofía Herrera", content: "Top-notch quality.", category: "Clients", status: "published", date: "2025-11-05", views: 189 },
//   { id: 18, author: "Mateo Silva", content: "Exceeded expectations.", category: "Employees", status: "draft", date: "2025-11-03", views: 45 },
//   // Add more if you want to test pagination
// ];

// const statusConfig = {
//   published: { color: "bg-green-100 text-green-800", Icon: CheckCircle },
//   pending:   { color: "bg-yellow-100 text-yellow-800", Icon: Clock },
//   draft:     { color: "bg-gray-100 text-gray-800", Icon: XCircle },
// };

// const ITEMS_PER_PAGE = 12;

// export default function TestimonialsList() {
//   // Load preferences from localStorage or fallback to defaults
//   const savedView = localStorage.getItem("testimonialViewMode") || "table";
//   const savedPage = parseInt(localStorage.getItem("testimonialPage") || "1");

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [viewMode, setViewMode] = useState(savedView);
//   const [currentPage, setCurrentPage] = useState(savedPage);

// // → WITH this single block (adds persistence for everything)
// useEffect(() => {
//   const saved = {
//     view: localStorage.getItem("testimonialView") || "table",
//     page: parseInt(localStorage.getItem("testimonialPage") || "1"),
//     search: localStorage.getItem("testimonialSearch") || "",
//     filter: localStorage.getItem("testimonialFilter") || "all",
//   };
//   setViewMode(saved.view);
//   setCurrentPage(saved.page);
//   setSearchTerm(saved.search);
//   setFilterStatus(saved.filter);
// }, []);

// // Save every time something changes
// useEffect(() => {
//   localStorage.setItem("testimonialView", viewMode);
//   localStorage.setItem("testimonialPage", currentPage.toString());
//   localStorage.setItem("testimonialSearch", searchTerm);
//   localStorage.setItem("testimonialFilter", filterStatus);
// }, [viewMode, currentPage, searchTerm, filterStatus]);

//   // Save view mode and page to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("testimonialViewMode", viewMode);
//   }, [viewMode]);

//   useEffect(() => {
//     localStorage.setItem("testimonialPage", currentPage.toString());
//   }, [currentPage]);

//   // Reset page when search/filter changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filterStatus]);

//   const filtered = mockTestimonials.filter((t) => {
//     const matchesSearch =
//       t.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.content.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === "all" || t.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//   const handleEdit = (id) => {
//     // View and page are saved automatically → user returns to same state
//     window.location.href = `/testimonials/edit/${id}`;
//   };

//   const handleDelete = (author) => {
//     if (confirm(`Delete testimonial from ${author}?`)) {
//       alert("Deleted (mock)");
//     }
//   };

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

// // Modal state and handlers  
// const [modalOpen, setModalOpen] = useState(false);
// const [editingTestimonial, setEditingTestimonial] = useState(null);
// const [formData, setFormData] = useState({});

// const openEditModal = (t) => {
//   setEditingTestimonial(t);
//   setFormData({ ...t });
//   setModalOpen(true);
// };

// const closeModal = () => {
//   setModalOpen(false);
//   setEditingTestimonial(null);
//   setFormData({});
// };

// const saveChanges = () => {
//   // In real app: API call here
//   alert(`Saved: ${formData.author} → ${formData.status}`);
//   closeModal();
//   // Optionally refetch data
// };

// const confirmDelete = () => {
//   if (confirm(`Delete testimonial from ${editingTestimonial.author}?`)) {
//     // API call here
//     alert("Deleted!");
//     closeModal();
//   }
// };

// // Modal handlers
//   const openModal = (testimonial = null) => {
//     setCurrentTestimonial(testimonial);
//     setModalOpen(true);
//   };




//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
//           <p className="text-gray-600 mt-1">Manage and moderate all testimonials</p>
//         </div>
//         {/* <a href="/testimonials/create" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition font-medium" >
//           <Plus className="w-5 h-5" />
//           New Testimonial
//         </a> */}
// <button
//           onClick={() => openModal()}
//           className="btn-primary"
//         >
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
//               placeholder="Search by author or content..."
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center gap-3 w-full lg:w-auto">
//             <select
//               className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
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
//                 className={`p-2 rounded-md transition ${viewMode === "cards" ? "bg-white shadow-sm" : ""}`}
//                 title="Card view"
//               >
//                 <Grid3X3 className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode("table")}
//                 className={`p-2 rounded-md transition ${viewMode === "table" ? "bg-white shadow-sm" : ""}`}
//                 title="Table view"
//               >
//                 <TableIcon className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

// {/* ========== CARDS VIEW – Force Full Width Grid ========== */}
// {viewMode === "cards" && (
//         <div className="w-full">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
//             {paginated.length === 0 ? (
//               <p className="col-span-full text-center py-20 text-gray-500 text-lg">
//                 No testimonials found
//               </p>
//             ) : (
//               paginated.map((t) => (
//                 <TestimonialCard
//                   key={t.id}
//                   testimonial={t}
//                   showActions={true}
//                   // onEdit={() => handleEdit(t.id)}
//                   onEdit={() => handleEdit(t.id)}
//                   onDelete={() => handleDelete(t.author)}
//                 />
//               ))
//             )}
//           </div>

//           {totalPages > 1 && (
//             <div className="flex justify-center gap-8 mt-12">
//               <button className="btn-ghost disabled:opacity-50" disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
//                 Previous
//               </button>
//               <span className="self-center text-sm text-gray-600">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button className="btn-ghost disabled:opacity-50" disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       )}



//       {/* Table View with Pagination */}
//       {viewMode === "table" && (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Content</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Views</th>
//                   <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {paginated.map((t) => {
//                   const { Icon } = statusConfig[t.status];
//                   return (
//                     <tr key={t.id} className="hover:bg-gray-50 transition">
//                       <td className="px-6 py-4 font-medium text-gray-900">{t.author}</td>
//                       <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
//                         <p className="line-clamp-2">{t.content}</p>
//                       </td>
//                       <td className="px-6 py-4 text-gray-600">{t.category}</td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[t.status].color}`}>
//                           <Icon className="w-4 h-4" />
//                           {t.status === "published" ? "Published" : t.status === "pending" ? "Pending" : "Draft"}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-gray-500 text-sm hidden md:table-cell">{t.date}</td>
//                       <td className="px-6 py-4 text-gray-500 text-sm hidden lg:table-cell">
//                         <div className="flex items-center gap-1">
//                           <Eye className="w-4 h-4" />
//                           {t.views}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <button onClick={() => openEditModal(t)} className="btn-ghost text-indigo-600">
//                             <Edit2 className="w-5 h-5" />
//                           </button>
//                           <button onClick={() => { setEditingTestimonial(t); setModalOpen(true); }} className="btn-ghost text-red-600">
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
//               <div className="text-sm text-gray-700">
//                 Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => goToPage(page)}
//                     className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
//                       page === currentPage ? "bg-indigo-600 text-white" : "hover:bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* MODAL */}
//       {modalOpen && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3 className="text-xl font-semibold">
//                 {editingTestimonial?.id ? "Edit" : "View"} Testimonial
//               </h3>
//               <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="modal-body space-y-5">
//               <div>
//                 <label className="label">Author</label>
//                 <input
//                   type="text"
//                   className="input"
//                   value={formData.author || ""}
//                   onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <label className="label">Content</label>
//                 <textarea
//                   rows="4"
//                   className="input"
//                   value={formData.content || ""}
//                   onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <label className="label">Status</label>
//                 <select
//                   className="input"
//                   value={formData.status || "draft"}
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                 >
//                   <option value="published">Published</option>
//                   <option value="pending">Pending</option>
//                   <option value="draft">Draft</option>
//                 </select>
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button onClick={confirmDelete} className="btn-danger mr-auto">
//                 Delete
//               </button>
//               <button onClick={closeModal} className="btn-ghost">
//                 Cancel
//               </button>
//               <button onClick={saveChanges} className="btn-primary">
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

// {/* SINGLE MODAL FOR EVERYTHING */}
//       {modalOpen && (
//         <TestimonialModal
//           isOpen={modalOpen}
//           onClose={closeModal}
//           testimonial={currentTestimonial}
//           onSave={handleSave}
//           onDelete={currentTestimonial ? handleDelete : undefined}
//         />
//       )}


//     </div>
//   );
// }