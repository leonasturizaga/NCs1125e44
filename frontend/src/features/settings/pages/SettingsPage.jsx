/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react";
import { Pencil, Trash2, Code } from "lucide-react";
import UserImportModal from "../components/UserImportModal";
import TestimonyImportModal from "../components/TestimonyImportModal";
import SettingsEmbeds from "../components/SettingsEmbeds"; // 🎯 Importación del componente de Embeds

function SettingsPage() {
   // === ESTADOS DE CONFIGURACIÓN ===
   const [settings, setSettings] = useState({
      siteName: "Testimonial CMS",
      adminEmail: "admin@example.com",
      allowRegistrations: true,
      itemsPerPage: 10,
      categories: ["Clientes", "Proveedores", "Empleados", "Partners"],
      newCategory: "",
   });

   // === ESTADOS DE UI ===
   const [showCategories, setShowCategories] = useState(false);
   const [showImportarDatos, setShowImportarDatos] = useState(false);
   const [importModalOpen, setImportModalOpen] = useState(false);
   const [importTestimonyOpen, setImportTestimonyOpen] = useState(false);


   // === LÓGICA GENERAL ===

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setSettings((prevSettings) => ({
         ...prevSettings,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Configuración guardada:", settings);
      alert("Configuración guardada (Mock)");
   };


   // === LÓGICA DE CATEGORÍAS ===

   const addCategory = () => {
      if (settings.newCategory.trim() === "") return;

      setSettings((prev) => ({
         ...prev,
         categories: [...prev.categories, prev.newCategory],
         newCategory: "",
      }));
   };

   const deleteCategory = (index) => {
      setSettings((prev) => ({
         ...prev,
         categories: prev.categories.filter((_, i) => i !== index),
      }));
   };

   const editCategory = (index) => {
      const nuevoNombre = prompt(
         "Editar categoría:",
         settings.categories[index]
      );
      if (!nuevoNombre || nuevoNombre.trim() === "") return;

      setSettings((prev) => {
         const updated = [...prev.categories];
         updated[index] = nuevoNombre;
         return { ...prev, categories: updated };
      });
   };


   // === RENDERIZADO (JSX) ===

   return (
      <div className="space-y-6">
         {/* Título Principal */}
         <h1 className="text-4xl font-extrabold text-white">Configuración</h1>
         <p className="text-xl text-indigo-400 mt-1">
            Ajusta las opciones generales del CMS
         </p>
         <hr className="border-gray-700 mt-6" />

         {/* Contenedor Principal de Ajustes */}
         <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 space-y-12">
            
            {/* 1. SECCIÓN DE AJUSTES GENERALES */}
            <form onSubmit={handleSubmit} className="space-y-10">
               
                {/* Nombre del Sitio */}
                <div>
                   <label htmlFor="siteName" className="label text-gray-300 mb-1">Nombre del Sitio</label>
                   <input type="text" id="siteName" name="siteName" value={settings.siteName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Correo Electrónico del Administrador */}
                <div>
                   <label htmlFor="adminEmail" className="label text-gray-300 mb-1">Correo Electrónico del Administrador</label>
                   <input type="email" id="adminEmail" name="adminEmail" value={settings.adminEmail} onChange={handleChange} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Permitir Registros (Checkbox) */}
                <div className="flex items-center gap-3 pt-2">
                   <input type="checkbox" id="allowRegistrations" name="allowRegistrations" checked={settings.allowRegistrations} onChange={handleChange} className="h-5 w-5 text-indigo-600 rounded border-gray-600 focus:ring-indigo-500 bg-gray-700 cursor-pointer" />
                   <label htmlFor="allowRegistrations" className="text-gray-300">Permitir Nuevos Registros de Usuarios</label>
                </div>

                {/* Elementos por Página (Select) */}
                <div>
                   <label htmlFor="itemsPerPage" className="label text-gray-300 mb-1">Elementos por Página (Tablas)</label>
                   <select id="itemsPerPage" name="itemsPerPage" value={settings.itemsPerPage} onChange={handleChange} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-indigo-500 focus:border-indigo-500">
                      <option className="bg-gray-700" value={5}>5</option>
                      <option className="bg-gray-700" value={10}>10</option>
                      <option className="bg-gray-700" value={20}>20</option>
                      <option className="bg-gray-700" value={50}>50</option>
                   </select>
                </div>

                {/* --- ACORDEÓN DE CATEGORÍAS --- */}
                <div className="space-y-4">
                   <button type="button" onClick={() => setShowCategories(!showCategories)} className="w-full flex justify-between items-center text-2xl font-bold text-indigo-300">
                      Gestión de Categorías
                      <span className="text-indigo-400 text-xl">{showCategories ? "▲" : "▼"}</span>
                   </button>

                   {showCategories && (
                      <div className="space-y-4 pt-4 border-t border-gray-700/50">
                         {/* Nueva Categoría Input */}
                         <div>
                            <label htmlFor="newCategory" className="label text-gray-300 mb-1">Nueva Categoría</label>
                            <div className="flex gap-3">
                               <input type="text" id="newCategory" name="newCategory" placeholder="Ej: Nueva categoría..." value={settings.newCategory} onChange={handleChange} className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                               <button type="button" onClick={addCategory} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center">Agregar</button>
                            </div>
                         </div>

                         {/* Categorías existentes Listado */}
                         <label className="label text-gray-300 mb-1">Categorías existentes</label>
                         <ul className="space-y-2">
                            {settings.categories.map((cat, i) => (
                              <li key={i} className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white flex justify-between items-center">
                                <span>{cat}</span>
                                <div className="flex gap-4">
                                   <button type="button" onClick={() => editCategory(i)} className="text-indigo-400 hover:text-indigo-300">
                                      <Pencil size={20} strokeWidth={2.4} />
                                   </button>
                                   <button type="button" onClick={() => deleteCategory(i)} className="text-red-400 hover:text-red-300">
                                      <Trash2 size={20} strokeWidth={2.4} />
                                   </button>
                                </div>
                              </li>
                            ))}
                         </ul>
                      </div>
                   )}
               </div>

               {/* Botón de Guardar */}
               <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium mt-8">
                  Guardar Configuración
               </button>
            </form>
            
            {/* 2. SECCIÓN DE EMBEDS (API PÚBLICA) */}
            <div className="mt-12 pt-8 border-t border-gray-700/50">
                <SettingsEmbeds /> 
            </div>

            {/* 3. SECCIÓN DE IMPORTACIÓN */}
            <div className="mt-10 pt-8 border-t border-gray-700/50">
                <button type="button" onClick={() => setShowImportarDatos(!showImportarDatos)} className="w-full flex justify-between items-center text-2xl font-bold text-indigo-300">
                  Importar Datos iniciales
                  <span className="text-indigo-400 text-xl">{showImportarDatos ? "▲" : "▼"}</span>
                </button>
                
                {showImportarDatos && (
                   <div className="flex flex-col sm:flex-row gap-4 mt-6">   
                      <button onClick={() => setImportModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium">
                        Importar Usuarios desde CSV
                      </button>
                      <button onClick={() => setImportTestimonyOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium">
                        Importar Testimonios desde CSV
                      </button>
                   </div>
               )}
               <UserImportModal isOpen={importModalOpen} onClose={() => setImportModalOpen(false)} />
               <TestimonyImportModal isOpen={importTestimonyOpen} onClose={() => setImportTestimonyOpen(false)} />
            </div>
         </div>
      </div>
   );
}

export default SettingsPage;