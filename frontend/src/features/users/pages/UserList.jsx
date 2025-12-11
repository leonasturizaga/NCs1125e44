//-------------------- version 3 -------------------------
// src/features/users/pages/UserList.jsx
// import { useState, useEffect } from "react";
// import { Plus, Search, Edit2, Trash2, UserX } from "lucide-react";
// import { toast } from "react-toastify";
// import api from "@/services/apiClient";
// import RegisterModal from "@/features/users/components/RegisterModal";
// import { useAuth } from "@/context/AuthContext";
// import { STATUS_CONFIG as statusConfig } from "@/constants/statusConfig";
// import { ITEMS_PER_PAGE } from "../data/testimonialMocks";

// export default function UserList() {
//    const { user: currentUser } = useAuth(); // ← obtener usuario actual desde el contexto Auth
//    const [users, setUsers] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [searchTerm, setSearchTerm] = useState("");
//    const [filterRole, setFilterRole] = useState("all");
//    const [filterActive, setFilterActive] = useState("all");

//    const [modalOpen, setModalOpen] = useState(false);
//    const [selectedUser, setSelectedUser] = useState(null); // ← objeto completo del usuario

//    // Fetch all users
//    const fetchUsers = async () => {
//       try {
//          setLoading(true);
//          const res = await api.get("/users/getAll?page=1&size=100"); // ← CORRECTO
//          if (res.data.success) {
//             setUsers(res.data.data || []);
//          }
//       } catch (err) {
//          toast.error("Error cargando usuarios");
//       } finally {
//          setLoading(false);
//       }
//    };

//    useEffect(() => {
//       fetchUsers();
//    }, []);

//    // Filters
//    const filtered = users.filter((u) => {
//       const matchesSearch =
//          u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//          u.email?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesRole = filterRole === "all" || u.role === filterRole;
//       const matchesActive =
//          filterActive === "all" ||
//          (filterActive === "active" ? u.isActive : !u.isActive);
//       return matchesSearch && matchesRole && matchesActive;
//    });

//    // Open modal with correct user
//    const openModal = (selectedUser = null) => {
//       setSelectedUser(selectedUser); // ← objeto completo (o null para crear)
//       setModalOpen(true);
//       console.log("current user:", currentUser.id);
//       console.log("selected user:", selectedUser.id);
//    };

//    // CREATE
//    const handleCreate = async (formData, files = []) => {
//       const data = new FormData();
//       data.append("username", formData.username);
//       data.append("email", formData.email);
//       data.append("password", formData.password);
//       data.append("role", formData.role || "visitante");

//       files.forEach((file) => data.append("profilePicture", file));
//       console.log("creating user:", currentUser.id, formData);
//       try {
//          const res = await api.post("/auth/register", data);
//          if (res.data.success) {
//             toast.success("Usuario creado!");
//             setModalOpen(false);
//             fetchUsers();
//          }
//       } catch (err) {
//          toast.error(err.response?.data?.message || "Error al crear");
//       }
//    };

//    const handleEdit = async (formData) => {
//       if (!selectedUser?.id) return false;

//       const payload = {
//          username: formData.username.trim(),
//          email: formData.email.trim(),
//          role: formData.role,
//          // Solo enviamos profilePicture si hay URL nueva
//          ...(formData.profilePictureUrl && {
//             profilePicture: formData.profilePictureUrl.trim(),
//          }),
//       };

//       try {
//          const res = await api.put(`/users/edit/${selectedUser.id}`, payload, {
//             headers: { "Content-Type": "application/json" },
//          });

//          if (res.data.success) {
//             toast.success("Usuario actualizado correctamente");
//             setModalOpen(false);
//             fetchUsers();
//             return true;
//          }
//       } catch (err) {
//          const msg =
//             err.response?.data?.message || "Error al actualizar usuario";
//          toast.error(msg);
//          console.error("Edit error:", err);
//          return false;
//       }
//    };

//    const handleDeactivate = async (id) => {
//       if (!confirm("¿Desactivar este usuario?")) return;
//       try {
//          await api.put(`/users/deactivate/${id}`);
//          toast.success("Usuario desactivado");
//          setUsers((prev) =>
//             prev.map((u) => (u.id === id ? { ...u, isActive: false } : u))
//          );
//       } catch (err) {
//          toast.error("Error al desactivar");
//       }
//    };

//    return (
//       <div className="space-y-8">
//          {/* Header */}
//          <div className="flex justify-between items-center">
//             <div>
//                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                   Usuarios
//                </h1>
//                <p className="text-gray-600 dark:text-gray-400">
//                   Administra todos los usuarios
//                </p>
//             </div>
//             <button onClick={() => openModal()} className="btn-primary">
//                <Plus className="w-5 h-5" />
//                Nuevo Usuario
//             </button>
//          </div>

//          {/* Filters */}
//          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                <div className="relative">
//                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                      type="text"
//                      placeholder="Buscar..."
//                      className="input pl-12"
//                      value={searchTerm}
//                      onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                </div>
//                <select
//                   className="input"
//                   value={filterRole}
//                   onChange={(e) => setFilterRole(e.target.value)}>
//                   <option value="all">Todos los roles</option>
//                   <option value="admin">Administrador</option>
//                   <option value="editor">Editor</option>
//                   <option value="visitante">Visitante</option>
//                </select>
//                <select
//                   className="input"
//                   value={filterActive}
//                   onChange={(e) => setFilterActive(e.target.value)}>
//                   <option value="all">Todos los estados</option>
//                   <option value="active">Activo</option>
//                   <option value="inactive">Inactivo</option>
//                </select>
//             </div>
//          </div>

//          {/* Table */}
//          {loading ? (
//             <div className="text-center py-20">
//                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//             </div>
//          ) : (
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//                <div className="overflow-x-auto">
//                   <table className="w-full">
//                      <thead className="bg-gray-50 dark:bg-gray-700">
//                         <tr>
//                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
//                               Usuario
//                            </th>
//                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
//                               Email
//                            </th>
//                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
//                               Rol
//                            </th>
//                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
//                               Estado
//                            </th>
//                            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
//                               Acciones
//                            </th>
//                         </tr>
//                      </thead>
//                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                         {filtered.map((u) => {
//                            const role =
//                               statusConfig[u.role.toLowerCase()] ||
//                               statusConfig["visitante"];
//                            const isActive =
//                               statusConfig[u.isActive] || statusConfig["false"];
//                            return (
//                               <tr
//                                  key={u.id}
//                                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
//                                  <td className="px-6 py-4">
//                                     <div className="flex items-center gap-3">
//                                        <div className="relative flex-shrink-0">
//                                           {u.profilePicture &&
//                                           u.profilePicture !==
//                                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? (
//                                              <img
//                                                 src={u.profilePicture}
//                                                 alt={u.username}
//                                                 className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-700 flex-shrink-0"
//                                              />
//                                           ) : (
//                                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-gray-700 flex-shrink-0">
//                                                 {u.username[0].toUpperCase()}
//                                              </div>
//                                           )}
//                                        </div>
//                                        <div>
//                                           <p className="font-medium text-gray-900 dark:text-white">
//                                              {u.username}
//                                           </p>
//                                           <p className="text-xs text-gray-500 dark:text-gray-400">
//                                              {u.email}
//                                           </p>
//                                        </div>
//                                     </div>
//                                  </td>

//                                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
//                                     {u.email}
//                                  </td>
//                                  <td className="px-6 py-4">
//                                     <span className={`badge badge-${u.role}`}>
//                                        <role.Icon className="w-4 h-4" />
//                                        {u.role}
//                                     </span>
//                                  </td>
//                                  <td className="px-6 py-4">
//                                     <span
//                                        className={`badge ${
//                                           u.isActive
//                                              ? "badge-true"
//                                              : "badge-false"
//                                        }`}>
//                                        <isActive.Icon className="w-4 h-4" />
//                                        {u.isActive ? "Activo" : "Inactivo"}
//                                     </span>
//                                  </td>
//                                  <td className="px-6 py-4 text-right">
//                                     <div className="flex items-center justify-end gap-3">
//                                        <button
//                                           onClick={() => handleDeactivate(u.id)}
//                                           className=" text-green-600  hover:text-green-500">
//                                           <UserX className="w-5 h-5" />
//                                        </button>
//                                        <button
//                                           onClick={() => openModal(u)}
//                                           className="text-indigo-600 hover:text-indigo-500">
//                                           <Edit2 className="w-5 h-5" />
//                                        </button>
//                                        <button className="text-red-600 hover:text-red-500">
//                                           <Trash2 className="w-5 h-5" />
//                                        </button>
//                                     </div>
//                                  </td>
//                               </tr>
//                            );
//                         })}
//                      </tbody>
//                   </table>
//                </div>
//             </div>
//          )}

//          {/* Modal */}
//          <RegisterModal
//             isOpen={modalOpen}
//             onClose={() => setModalOpen(false)}
//             selectedUser={selectedUser} // ← objeto completo del usuario
//             onCreate={handleCreate}
//             onEdit={handleEdit}
//          />
//       </div>
//    );
// }


//----------------- version 4 -----------------------
// src/features/users/pages/UserList.jsx
import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, UserX } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/services/apiClient";
import RegisterModal from "@/features/users/components/RegisterModal";
import { useAuth } from "@/context/AuthContext";
import { STATUS_CONFIG as statusConfig } from "@/constants/statusConfig";
import { getItemsPerPage } from "../../../constants/appConfig";


export default function UserList() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterActive, setFilterActive] = useState("all");

  const [currentPage, setCurrentPage] = useState(1); // ← NUEVO

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
const ITEMS_PER_PAGE = getItemsPerPage();
  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/getAll?page=1&size=100");
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

  // PAGINACIÓN CLIENT-SIDE
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

  // Open modal
  const openModal = (selectedUser = null) => {
    setSelectedUser(selectedUser);
    setModalOpen(true);
    setCurrentPage(1); // opcional: resetear página al abrir modal
  };

  // CREATE
  const handleCreate = async (formData, files = []) => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role || "visitante");

   //  files.forEach((file) => data.append("profilePicture", file));

    try {
      const res = await api.post("/auth/register", data);
      if (res.data.success) {
        toast.success("Usuario creado!");
        setModalOpen(false);
        fetchUsers();
        setCurrentPage(1);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al crear");
    }
  };

  // EDIT
  const handleEdit = async (formData) => {
    if (!selectedUser?.id) return false;

    const payload = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      role: formData.role,
      ...(formData.profilePictureUrl && {
        profilePicture: formData.profilePictureUrl.trim(),
      }),
    };

    try {
      const res = await api.put(`/users/edit/${selectedUser.id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        toast.success("Usuario actualizado correctamente");
        setModalOpen(false);
        fetchUsers();
        return true;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al actualizar usuario");
      return false;
    }
  };

  const handleDeactivate = async (id) => {
    if (!confirm("¿Desactivar este usuario?")) return;
    try {
      await api.put(`/users/deactivate/${id}`);
      toast.success("Usuario desactivado");
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isActive: false } : u))
      );
    } catch (err) {
      toast.error("Error al desactivar");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Usuarios
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra todos los usuarios
          </p>
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <select
            className="input"
            value={filterRole}
            onChange={(e) => {
              setFilterRole(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="visitante">Visitante</option>
          </select>
          <select
            className="input"
            value={filterActive}
            onChange={(e) => {
              setFilterActive(e.target.value);
              setCurrentPage(1);
            }}
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Usuario
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Rol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginated.map((u) => {
                  const role = statusConfig[u.role.toLowerCase()] || statusConfig["visitante"];
                  const isActive = statusConfig[u.isActive] || statusConfig["false"];

                  return (
                    <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      {/* Usuario con avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            {u.profilePicture &&
                            u.profilePicture !== "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ? (
                              <img
                                src={u.profilePicture}
                                alt={u.username}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-700 flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-gray-700 flex-shrink-0">
                                {u.username[0].toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{u.username}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{u.email}</p>
                          </div>
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
                          <button onClick={() => handleDeactivate(u.id)} className="text-green-600 hover:text-green-500">
                            <UserX className="w-5 h-5" />
                          </button>
                          <button onClick={() => openModal(u)} className="text-indigo-600 hover:text-indigo-500">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-500">
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

          {/* PAGINACIÓN */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-6 py-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-ghost disabled:opacity-50"
              >
                ← Anterior
              </button>
              <span className="self-center text-sm font-medium text-gray-700 dark:text-gray-300">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-ghost disabled:opacity-50"
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <RegisterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedUser={selectedUser}
        onCreate={handleCreate}
        onEdit={handleEdit}
      />
    </div>
  );
}