// src/features/users/pages/UserList.jsx
import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, UserX } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import api from "@/services/apiClient";

const mockUserIds = [
  "d8f0e841-b298-4638-9865-7f303e511223",
  "fe74ff61-de00-4412-946e-e9d45db3cce0",
  "895e3aa4-475e-410c-8e26-e53f347e2cca",
];

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const promises = mockUserIds.map(id =>
          api.get(`/users/getById/${id}`).then(res => res.data.data)
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

  const handleDelete = (username) => {
    alert(`Eliminar usuario ${username} (no implementado aún)`);
  };

  const filtered = users.filter(u =>
    u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
          <p className="text-gray-600 dark:text-gray-400">Administra todos los usuarios del sistema</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            className="input pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
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
                          {u.username?.[0]?.toUpperCase() || "U"}
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
                        <button className="btn-ghost text-indigo-600">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeactivate(u.id)}
                          className="btn-ghost text-orange-600"
                          title="Desactivar"
                        >
                          <UserX className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(u.username)} className="btn-ghost text-red-600">
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
    </div>
  );
}