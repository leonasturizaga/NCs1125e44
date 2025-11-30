//-------------------- version 1 -------------------------
// src/features/users/pages/UserList.jsx
// import { useState, useEffect } from "react";
// import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiUserX } from "react-icons/fi";
// import { toast, Toaster } from "react-hot-toast";
// import api from "@/services/apiClient";

// const mockUserIds = [
//   "d8f0e841-b298-4638-9865-7f303e511223",
//   "fe74ff61-de00-4412-946e-e9d45db3cce0",
//   "895e3aa4-475e-410c-8e26-e53f347e2cca",
// ];

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
// const [filterRole, setFilterRole] = useState("all");
//   const [filterActive, setFilterActive] = useState("all");


//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const promises = mockUserIds.map(id =>
//           api.get(`/users/getById/${id}`).then(res => res.data.data)
//         );
//         const results = await Promise.all(promises);
//         setUsers(results.filter(Boolean));
//       } catch (err) {
//         toast.error("Error cargando usuarios");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

// // Filtros
//   const filtered = users.filter((u) => {
//     const matchesSearch =
//       u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.email?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesRole = filterRole === "all" || u.role === filterRole;
//     const matchesActive =
//       filterActive === "all" ||
//       (filterActive === "active" ? u.isActive : !u.isActive);

//     return matchesSearch && matchesRole && matchesActive;
//   });

//   const handleDeactivate = async (id) => {
//     if (!confirm("¿Desactivar este usuario?")) return;
//     try {
//       await api.put(`/users/deactivate/${id}`);
//       toast.success("Usuario desactivado");
//       setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: false } : u));
//     } catch (err) {
//       toast.error("Error al desactivar");
//     }
//   };

//   const handleDelete = (username) => {
//     alert(`Eliminar usuario ${username} (no implementado aún)`);
//   };


//   return (
//     <div className="space-y-8">
//       <Toaster position="top-right" />

//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
//           <p className="text-gray-600 dark:text-gray-400">Administra todos los usuarios del sistema</p>
//         </div>
//         <button className="btn-primary">
//           <FiPlus className="w-5 h-5" />
//           Nuevo Usuario
//         </button>
//       </div>

//       {/* Search
//       <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//         <div className="relative">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Buscar por nombre o email..."
//             className="input pl-12"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div> */}

// {/* Filtros */}
//       <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Search */}
//           <div className="relative">
//             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Buscar por nombre o email..."
//               className="input pl-12"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Filter by Role */}
//           <select
//             className="input"
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//           >
//             <option value="all">Todos los roles</option>
//             <option value="admin">Administrador</option>
//             <option value="editor">Editor</option>
//             <option value="visitante">Visitante</option>
//           </select>

//           {/* Filter by Status */}
//           <select
//             className="input"
//             value={filterActive}
//             onChange={(e) => setFilterActive(e.target.value)}
//           >
//             <option value="all">Todos los estados</option>
//             <option value="active">Activo</option>
//             <option value="inactive">Inactivo</option>
//           </select>
//         </div>
//       </div>      

//       {/* Table */}
//       {loading ? (
//         <div className="text-center py-20">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//         </div>
//       ) : (
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Usuario</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Rol</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estado</th>
//                   <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {filtered.map((u) => (
//                   <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
//                           {u.username?.[0]?.toUpperCase() || "U"}
//                         </div>
//                         <span className="font-medium text-gray-900 dark:text-white">
//                           {u.username}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.email}</td>
//                     <td className="px-6 py-4">
//                       <span className={`badge badge-${u.role}`}>
//                         {u.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`badge ${u.isActive ? "badge-published" : "badge-draft"}`}>
//                         {u.isActive ? "Activo" : "Inactivo"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end gap-3">
//                         <button className="btn-ghost text-indigo-600">
//                           <FiEdit2 className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDeactivate(u.id)}
//                           className="btn-ghost text-orange-600"
//                           title="Desactivar"
//                         >
//                           <FiUserX className="w-5 h-5" />
//                         </button>
//                         <button onClick={() => handleDelete(u.username)} className="btn-ghost text-red-600">
//                           <FiTrash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//-------------------- version 2 -------------------------
// src/features/users/pages/UserList.jsx
import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, UserX } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import api from "@/services/apiClient";
import RegisterModal from "@/features/users/components/RegisterModal";

const mockUserIds = [
  "d8f0e841-b298-4638-9865-7f303e511223",
  "fe74ff61-de00-4412-946e-e9d45db3cce0",
  "895e3aa4-475e-410c-8e26-e53f347e2cca",
];

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterActive, setFilterActive] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const promises = mockUserIds.map(id =>
          api.get(`/users/getById/${id}`).then(res => res.data.data).catch(() => null)
        );
        const results = await Promise.all(promises);
        setUsers(results.filter(Boolean));
      } catch (err) {
        toast.error("Error cargando usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || u.role === filterRole;
    const matchesActive = filterActive === "all" || (filterActive === "active" ? u.isActive : !u.isActive);
    return matchesSearch && matchesRole && matchesActive;
  });

  const openModal = (user = null) => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (currentUser?.id) {
        // EDIT
        const res = await api.put(`/users/edit/${currentUser.id}`, {
          username: formData.username,
          email: formData.email,
          role: formData.role,
        });
        if (res.data.success) {
          toast.success("Usuario actualizado");
          setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
        }
      } else {
        // CREATE (register)
        const res = await api.post("/auth/register", formData);
        if (res.data.success) {
          toast.success("Usuario creado");
          // Refresh list
          const newUser = await api.get(`/users/getById/${res.data.data.id}`);
          setUsers(prev => [...prev, newUser.data.data]);
        }
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al guardar");
    }
  };

  const handleDeactivate = async (id) => {
    if (!confirm("¿Desactivar este usuario?")) return;
    try {
      await api.put(`/users/deactivate/${id}`);
      toast.success("Usuario desactivado");
      setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: false } : u));
    } catch (err) {
      toast.error("Error al desactivar");
    }
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
          <p className="text-gray-600 dark:text-gray-400">Administra todos los usuarios</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus className="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar..."
              className="input pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="input"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="visitante">Visitante</option>
          </select>

          <select
            className="input"
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Usuario</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Rol</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estado</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {u.profilePicture || u.username[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {u.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`badge badge-${u.role}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${u.isActive ? "badge-published" : "badge-draft"}`}>
                        {u.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => openModal(u)} className="btn-ghost text-indigo-600">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeactivate(u.id)}
                          className="btn-ghost text-orange-600"
                        >
                          <UserX className="w-5 h-5" />
                        </button>
                        <button className="btn-ghost text-red-600">
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

      {/* Modal */}
      <RegisterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        user={currentUser}
        onSuccess={handleSave}
      />
    </div>
  );
}
