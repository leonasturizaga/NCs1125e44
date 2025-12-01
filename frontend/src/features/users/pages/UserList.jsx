/* eslint-disable no-irregular-whitespace */
// src/features/users/pages/UserList.jsx

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, UserX } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
// Asegúrate de que las rutas @/context/AuthContext y @/services/apiClient sean correctas
import api from "@/services/apiClient"; 

const mockUserIds = [
  "d8f0e841-b298-4638-9865-7f303e511223",
  "fe74ff61-de00-4412-946e-e9d45db3cce0",
  "895e3aa4-475e-410c-8e26-e53f347e2cca",
];

// Mapeo de estilos para el rol y el estado
const roleConfig = {
    'admin': 'bg-red-700/50 text-red-300',
    'editor': 'bg-indigo-700/50 text-indigo-300',
    'visitante': 'bg-gray-700/50 text-gray-300',
};
const statusStyle = {
    'Activo': 'bg-green-700/50 text-green-300',
    'Inactivo': 'bg-yellow-700/50 text-yellow-300',
};

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterActive, setFilterActive] = useState("all");


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const promises = mockUserIds.map(id =>
          api.get(`/users/getById/${id}`).then(res => res.data.data)
        );
        const results = await Promise.all(promises);
        setUsers(results.filter(Boolean).map(u => ({...u, username: u.username || u.email, role: u.role || 'visitante'}))); // Normalizar datos
// eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Error cargando usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

// Filtros
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

  const handleDeactivate = async (id) => {
    if (!confirm("¿Desactivar este usuario?")) return;
    try {
      await api.put(`/users/deactivate/${id}`);
      toast.success("Usuario desactivado");
      setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: false } : u));
// eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Error al desactivar");
    }
  };

  const handleDelete = (username) => {
    alert(`Eliminar usuario ${username} (no implementado aún)`);
  };


  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Usuarios</h1>
          <p className="text-gray-400">Administra todos los usuarios del sistema</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md">
          <Plus className="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>

{/* Filtros */}
      <div className="bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              className="w-full pl-12 pr-4 py-3 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter by Role */}
          <select
            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-white"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="visitante">Visitante</option>
          </select>

          {/* Filter by Status */}
          <select
            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-white"
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
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Usuario</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Rol</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-700/40 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {u.username?.[0]?.toUpperCase() || "U"}
                        </div>
                        <span className="font-medium text-white">
                          {u.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleConfig[u.role]}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${u.isActive ? statusStyle['Activo'] : statusStyle['Inactivo']}`}>
                        {u.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="p-2 rounded-full hover:bg-gray-700 text-indigo-400 transition">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeactivate(u.id)}
                          className="p-2 rounded-full hover:bg-gray-700 text-orange-400 transition"
                          title="Desactivar"
                        >
                          <UserX className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(u.username)} className="p-2 rounded-full hover:bg-gray-700 text-red-400 transition">
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