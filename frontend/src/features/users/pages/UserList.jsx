
// // src/features/users/pages/UserList.jsx
// import { useState, useEffect } from "react";
// import { Plus, Search, Edit2, Trash2, UserX } from "lucide-react";
// import { toast, Toaster } from "react-hot-toast";

// import api from "@/services/apiClient";

// const mockUserIds = [
// "d8f0e841-b298-4638-9865-7f303e511223",
// "fe74ff61-de00-4412-946e-e9d45db3cce0",
// "895e3aa4-475e-410c-8e26-e53f347e2cca",
// ];

// // Mapeo de estilos para el rol y el estado
// const roleConfig = {
//     'admin': 'bg-red-700/50 text-red-300',
//     'editor': 'bg-indigo-700/50 text-indigo-300',
//     'visitante': 'bg-gray-700/50 text-gray-300',
// };
// const statusStyle = {
//     'Activo': 'bg-green-700/50 text-green-300',
//     'Inactivo': 'bg-yellow-700/50 text-yellow-300',
// };

// export default function UserList() {

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRole, setFilterRole] = useState("all");
//   const [filterActive, setFilterActive] = useState("all");


//   //const [modalOpen, setModalOpen] = useState(false);
//   //const [currentUser, setCurrentUser] = useState(null);

// useEffect(() => {
// const fetchUsers = async () => {
// try {
// setLoading(true);
// const promises = mockUserIds.map(id =>
// api.get(`/users/getById/${id}`).then(res => res.data.data)
// );
// const results = await Promise.all(promises);
// setUsers(results.filter(Boolean).map(u => ({...u, username: u.username || u.email, role: u.role || 'visitante'}))); // Normalizar datos
// // eslint-disable-next-line no-unused-vars
// } catch (err) {
// toast.error("Error cargando usuarios");
// } finally {
// setLoading(false);
// }
// };
// fetchUsers();
// }, []);

// // Filtros
// const filtered = users.filter((u) => {
// const matchesSearch =
// u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// u.email?.toLowerCase().includes(searchTerm.toLowerCase());

// const matchesRole = filterRole === "all" || u.role === filterRole;
// const matchesActive =
// filterActive === "all" ||
// (filterActive === "active" ? u.isActive : !u.isActive);

// return matchesSearch && matchesRole && matchesActive;
// });

// const handleDeactivate = async (id) => {
// if (!confirm("¿Desactivar este usuario?")) return;
// try {
// await api.put(`/users/deactivate/${id}`);
// toast.success("Usuario desactivado");
// setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: false } : u));
// // eslint-disable-next-line no-unused-vars
// } catch (err) {
// toast.error("Error al desactivar");
// }
// };

// const handleDelete = (username) => {
// alert(`Eliminar usuario ${username} (no implementado aún)`);
// };

// return (
// <div className="space-y-8">
// <Toaster position="top-right" />

// {/* Header */}
// <div className="flex justify-between items-center">
// <div>
// <h1 className="text-3xl font-bold text-white">Usuarios</h1>
// <p className="text-gray-400">Administra todos los usuarios del sistema</p>
// </div>
// <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md">
// <Plus className="w-5 h-5" />
// Nuevo Usuario
// </button>
// </div>

// {/* Filtros */}
// <div className="bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-700">
// <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// {/* Search */}
//  <div className="relative">
// <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
// <input
// type="text"
// placeholder="Buscar por nombre o email..."
// className="w-full pl-12 pr-4 py-3 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-white"
// value={searchTerm}
// onChange={(e) => setSearchTerm(e.target.value)}
// />
// </div>

// {/* Filter by Role */}
// <select
// className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-white"
// value={filterRole}
// onChange={(e) => setFilterRole(e.target.value)}
// >
// <option value="all">Todos los roles</option>
// <option value="admin">Administrador</option>
// <option value="editor">Editor</option>
// <option value="visitante">Visitante</option>
//  </select>

//  {/* Filter by Status */}
// <select
// className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-white"
// value={filterActive}
// onChange={(e) => setFilterActive(e.target.value)}
// >
//  <option value="all">Todos los estados</option>
// <option value="active">Activo</option>
// <option value="inactive">Inactivo</option>
// </select>
// </div>
// </div> 

// {/* Table */}
// {loading ? (
// <div className="text-center py-20">
// <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
// </div>
// ) : (
// <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
// <div className="overflow-x-auto">
// <table className="w-full">
// <thead className="bg-gray-700/50 border-b border-gray-700">
// <tr>
// <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Usuario</th>
// <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
// <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Rol</th>
// <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
// <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase">Acciones</th>
// </tr>
// </thead>
// <tbody className="divide-y divide-gray-700">
// {filtered.map((u) => (
// <tr key={u.id} className="hover:bg-gray-700/40 transition">
// <td className="px-6 py-4">
// <div className="flex items-center gap-3">
// <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
// {u.username?.[0]?.toUpperCase() || "U"}
// </div>
// <span className="font-medium text-white">
// {u.username}
// </span>
// </div>
// </td>
// <td className="px-6 py-4 text-gray-300">{u.email}</td>
// <td className="px-6 py-4">
// <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleConfig[u.role]}`}>
// {u.role}
//  </span>
//  </td>
// <td className="px-6 py-4">
// <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${u.isActive ? statusStyle['Activo'] : statusStyle['Inactivo']}`}>
//  {u.isActive ? "Activo" : "Inactivo"}
// </span>
// </td>
// <td className="px-6 py-4 text-right">
// <div className="flex items-center justify-end gap-3">
// <button className="p-2 rounded-full hover:bg-gray-700 text-indigo-400 transition">
// <Edit2 className="w-5 h-5" />
//  </button>
// <button
// onClick={() => handleDeactivate(u.id)}
// className="p-2 rounded-full hover:bg-gray-700 text-orange-400 transition"
// title="Desactivar"
// >
// <UserX className="w-5 h-5" />
// </button>
// <button onClick={() => handleDelete(u.username)} className="p-2 rounded-full hover:bg-gray-700 text-red-400 transition">
// <Trash2 className="w-5 h-5" />
// </button>
// </div>
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// </div>
// )}
// </div>
// );
// } 

//-------------------- version 2 -------------------------
// src/features/users/pages/UserList.jsx
// import { useState, useEffect } from "react";
// import { Plus, Search, Edit2, Trash2, UserX } from "lucide-react";
// import { toast, Toaster } from "react-hot-toast";
// import api from "@/services/apiClient";
// import RegisterModal from "@/features/users/components/RegisterModal";
// import { LuSquare, LuSquareCheckBig } from "react-icons/lu";
// import { CheckCircle, Clock, XCircle, FileText } from "lucide-react";
// import { STATUS_CONFIG as statusConfig } from "@/constants/statusConfig";

// const mockUserIds = [
//   "d8f0e841-b298-4638-9865-7f303e511223",
//   "fe74ff61-de00-4412-946e-e9d45db3cce0",
//   "895e3aa4-475e-410c-8e26-e53f347e2cca",
// ];

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRole, setFilterRole] = useState("all");
//   const [filterActive, setFilterActive] = useState("all");

//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

// // Fetch all users (your real endpoint)
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/users/getAll");
//       if (res.data.success) {
//         setUsers(res.data.data || []);
//       }
//     } catch (err) {
//       toast.error("Error cargando usuarios");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filters
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

//   const openModal = (user = null) => {
//     setCurrentUser(user);
//     setModalOpen(true);
//   };

//   // CREATE + EDIT with FormData (images) + JWT
//   const handleSave = async (formData, files = []) => {
//     const data = new FormData();
//     data.append("username", formData.username);
//     data.append("email", formData.email);
//     if (formData.password) data.append("password", formData.password);
//     if (formData.role) data.append("role", formData.role);

//     files.forEach((file) => data.append("profilePicture", file));

//     try {
//       let res;
//       if (currentUser?.id) {
//         // EDIT
//         res = await api.put(`/users/edit/${currentUser.id}`, data);
//       } else {
//         // CREATE
//         res = await api.post("/auth/register", data);
//       }

//       if (res.data.success) {
//         toast.success(currentUser?.id ? "Usuario actualizado" : "Usuario creado");
//         setModalOpen(false);
//         fetchUsers();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error al guardar");
//     }
//   };

//   const handleDeactivate = async (id) => {
//     if (!confirm("¿Desactivar usuario?")) return;
//     try {
//       await api.put(`/users/deactivate/${id}`);
//       toast.success("Usuario desactivado");
//       setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: false } : u)));
//     } catch (err) {
//       toast.error("Error al desactivar");
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <Toaster position="top-right" />

//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
//           <p className="text-gray-600 dark:text-gray-400">Administra todos los usuarios</p>
//         </div>
//         <button onClick={() => openModal()} className="btn-primary">
//           <Plus className="w-5 h-5" />
//           Nuevo Usuario
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Buscar..."
//               className="input pl-12"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

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
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Usuario</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Rol</th>
//                   <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estado</th>
//                   <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {filtered.map((u) => {
//                         const role = statusConfig[u.role.toLowerCase()] || statusConfig['visitante']; 
//                         const isActive = statusConfig[u.isActive] || statusConfig['false']; 
//                         return (
//                   <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
//                           {/* {u.profilePicture || u.username[0].toUpperCase()} */}
//                            {u.username[0].toUpperCase()}
//                         </div>
//                         <span className="font-medium text-gray-900 dark:text-white">
//                           {u.username}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.email}</td>
//                     <td className="px-6 py-4">
//                       <span className={`badge badge-${u.role}`}>
//                         <role.Icon className="w-4 h-4" />
//                         {u.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`badge ${u.isActive ? "badge-true" : "badge-false"}`}>
//                         <isActive.Icon className="w-4 h-4" />
//                         {u.isActive ? "Activo" : "Inactivo"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end gap-3">
//                         <button onClick={() => openModal(u)} className="btn-ghost text-indigo-600">
//                           <Edit2 className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDeactivate(u.id)}
//                           className="btn-ghost text-orange-600"
//                         >
//                           <UserX className="w-5 h-5" />
//                         </button>
//                         <button className="btn-ghost text-red-600">
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       <RegisterModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         user={currentUser}
//         onSuccess={handleSave}
//       />
//     </div>
//   );
// }


//-------------------- version 3 -------------------------
// src/features/users/pages/UserList.jsx
import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, UserX } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import api from "@/services/apiClient";
import RegisterModal from "@/features/users/components/RegisterModal";
import { useAuth } from '@/context/AuthContext';
import { STATUS_CONFIG as statusConfig } from "@/constants/statusConfig";

export default function UserList() {
const { user: currentUser } = useAuth(); // ← obtener usuario actual desde el contexto Auth   
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterActive, setFilterActive] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null); // ← objeto completo del usuario

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/getAll"); // ← CORRECTO
      if (res.data.success) {
        setUsers(res.data.data || []);
      }
    } catch (err) {
      toast.error("Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filters
  const filtered = users.filter((u) => {
    const matchesSearch =
      u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || u.role === filterRole;
    const matchesActive =
      filterActive === "all" ||
      (filterActive === "active" ? u.isActive : !u.isActive);
    return matchesSearch && matchesRole && matchesActive;
  });

  // Open modal with correct user
  const openModal = (selectedUser = null) => {
    setSelectedUser(selectedUser);    // ← objeto completo (o null para crear)
    setModalOpen(true);
    console.log("current user:", currentUser.id); 
    console.log("selected user:", selectedUser.id);
  };

  // CREATE
  const handleCreate = async (formData, files = []) => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role || "visitante");

    files.forEach(file => data.append("profilePicture", file));
console.log("creating user:", currentUser.id, formData); 
    try {
      const res = await api.post("/auth/register", data);
      if (res.data.success) {
        toast.success("Usuario creado!");
        setModalOpen(false);
        fetchUsers();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al crear");
    }
  };

  // EDIT
  const handleEdit = async (formData) => {
     console.log("Editing user:", selectedUser.id, formData);  
    if (!selectedUser?.id) return;
    const payload = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };

    try {
      const res = await api.put(`/users/edit/${selectedUser.id}`, payload);
      if (res.data.success) {
        toast.success("Usuario actualizado!");
        setModalOpen(false);
        fetchUsers();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al editar");
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

      {/* Header */}
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
          <select className="input" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="visitante">Visitante</option>
          </select>
          <select className="input" value={filterActive} onChange={(e) => setFilterActive(e.target.value)}>
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
                {filtered.map((u) => {
                        const role = statusConfig[u.role.toLowerCase()] || statusConfig['visitante']; 
                        const isActive = statusConfig[u.isActive] || statusConfig['false']; 
                        return (
                  <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {/* {u.profilePicture || u.username[0].toUpperCase()} */}
                           {u.username[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {u.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`badge badge-${u.role}`}>
                        <role.Icon className="w-4 h-4" />
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${u.isActive ? "badge-true" : "badge-false"}`}>
                        <isActive.Icon className="w-4 h-4" />
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <RegisterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedUser={selectedUser}   // ← objeto completo del usuario
         onCreate={handleCreate}
         onEdit={handleEdit}
      />
    </div>
  );
}

//---------------- --- version 4 -------------------------
// import { useState, useEffect } from "react";
// import { Plus, Search, Edit2, Trash2, UserX } from "lucide-react";
// import { toast, Toaster } from "react-hot-toast";
// import api from "@/services/apiClient";
// import RegisterModal from "@/features/users/components/RegisterModal";

// import { useAuth } from '@/context/AuthContext';

// export default function UserList() {
//   const { user: currentUser } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRole, setFilterRole] = useState("all");
//   const [filterActive, setFilterActive] = useState("all");

//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/users/getAll"); // ← CORRECTO
//       if (res.data.success) {
//         setUsers(res.data.data || []);
//       }
//     } catch (err) {
//       toast.error("Error cargando usuarios");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filters
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

//   // Open modal with correct user
//   const openModal = (user = null) => {
//     console.log("openModal called with:", user);
//     setSelectedUser(user);    // ← objeto completo (or null for new)
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     // We may want to clear selectedUser after closing so "new" is default next time
//     setTimeout(() => setSelectedUser(null), 0);
//   };

//   // CREATE
//   const handleCreate = async (formData, files = []) => {
//     const data = new FormData();
//     data.append("username", formData.username);
//     data.append("email", formData.email);
//     data.append("password", formData.password);
//     data.append("role", formData.role || "visitante");

//     (files || []).forEach(file => data.append("profilePicture", file));

//     try {
//       const res = await api.post("/auth/register", data);
//       if (res.data.success) {
//         toast.success("Usuario creado!");
//         fetchUsers();
//         return true;
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error al crear");
//       return false;
//     }
//   };

//   // EDIT
//   // We expect caller to provide userId so we don't rely on stale closure
//   const handleEdit = async (formData, userId) => {
//     if (!userId) {
//       toast.error("No user id provided for edit");
//       return false;
//     }

//     const payload = {
//       username: formData.username,
//       email: formData.email,
//       role: formData.role,
//     };

//     try {
//       const res = await api.put(`/users/edit/${userId}`, payload);
//       if (res.data.success) {
//         toast.success("Usuario actualizado!");
//         fetchUsers();
//         return true;
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error al editar");
//       return false;
//     }
//   };

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

//   return (
//     <div className="space-y-8">
//       <Toaster position="top-right" />

//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
//           <p className="text-gray-600 dark:text-gray-400">Administra todos los usuarios</p>
//         </div>
//         <button onClick={() => openModal(null)} className="btn-primary">
//           <Plus className="w-5 h-5" />
//           Nuevo Usuario
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Buscar..."
//               className="input pl-12"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <select className="input" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
//             <option value="all">Todos los roles</option>
//             <option value="admin">Administrador</option>
//             <option value="editor">Editor</option>
//             <option value="visitante">Visitante</option>
//           </select>
//           <select className="input" value={filterActive} onChange={(e) => setFilterActive(e.target.value)}>
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
//               <thead className="bg-gray-50 dark:bg-gray-700">
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
//                           {u.username?.[0]?.toUpperCase()}
//                         </div>
//                         <span className="font-medium text-gray-900 dark:text-white">{u.username}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.email}</td>
//                     <td className="px-6 py-4">
//                       <span className="badge badge-published">{u.role}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`badge ${u.isActive ? "badge-published" : "badge-draft"}`}>
//                         {u.isActive ? "Activo" : "Inactivo"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end gap-3">
//                         <button onClick={() => openModal(u)} className="btn-ghost text-indigo-600">
//                           <Edit2 className="w-5 h-5" />
//                         </button>
//                         <button onClick={() => handleDeactivate(u.id)} className="btn-ghost text-orange-600">
//                           <UserX className="w-5 h-5" />
//                         </button>
//                         <button className="btn-ghost text-red-600">
//                           <Trash2 className="w-5 h-5" />
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

//       {/* Modal — give it a key so it remounts when selectedUser changes */}
//       <RegisterModal
//         key={selectedUser?.id ?? "new"}
//         isOpen={modalOpen}
//         onClose={closeModal}
//         selectedUser={selectedUser}   // can be null
//         onCreate={handleCreate}
//         onEdit={handleEdit}
//       />
//     </div>
//   );
// }
