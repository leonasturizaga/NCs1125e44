// src/features/settings/pages/SettingsPage.jsx

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import UserImportModal from "./components/UserImportModal";

function SettingsPage() {
   const [settings, setSettings] = useState({
      siteName: "Testimonial CMS",
      adminEmail: "admin@example.com",
      allowRegistrations: true,
      itemsPerPage: 10,

  
   });

    // integrar testimonios
   const [showWidget, setShowWidget] = useState(false);
   const [widgetCantidad, setWidgetCantidad] = useState(3);
   const [codigo, setCodigo] = useState("");

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
      // Aquí iría la lógica para enviar los datos al backend
      alert("Configuración guardada (Mock)");
   };



   // para importar usuarios desde un CSV
   const [importModalOpen, setImportModalOpen] = useState(false);
   const [showImportarDatos, setShowImportarDatos] = useState(false);

   // función para generar el embed
   const generarCodigo = () => {
      const embed = `
<div id="testimonial-widget"
     data-cantidad="${widgetCantidad}">
</div>

<script src="http://localhost:3000/widget.js" async></script>
`;

      setCodigo(embed.trim());
   };

 



   return (
      <div className="space-y-6">
         {/* Título Principal */}
         <h1 className="text-4xl font-extrabold text-white">Configuración</h1>
         <p className="text-xl text-indigo-400 mt-1">
            Ajusta las opciones generales del CMS
         </p>
         <hr className="border-gray-700 mt-6" />

         {/* Formulario de Configuración (Contenedor) */}
         <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-10">
               {/* Nombre del Sitio */}
               <div>
                  {/* Label: Gris claro */}
                  <label
                     htmlFor="siteName"
                     className="label text-gray-300 mb-1">
                     Nombre del Sitio
                  </label>
                  <input
                     type="text"
                     id="siteName"
                     name="siteName"
                     value={settings.siteName}
                     onChange={handleChange}
                     // Input: Fondo oscuro, texto blanco, foco índigo
                     className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  />
               </div>

               {/* Correo Electrónico del Administrador */}
               <div>
                  <label
                     htmlFor="adminEmail"
                     className="label text-gray-300 mb-1">
                     Correo Electrónico del Administrador
                  </label>
                  <input
                     type="email"
                     id="adminEmail"
                     name="adminEmail"
                     value={settings.adminEmail}
                     onChange={handleChange}
                     className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  />
               </div>

               {/* Permitir Registros (Checkbox) */}
               <div className="flex items-center gap-3 pt-2">
                  <input
                     type="checkbox"
                     id="allowRegistrations"
                     name="allowRegistrations"
                     checked={settings.allowRegistrations}
                     onChange={handleChange}
                     // Checkbox: Acento índigo
                     className="h-5 w-5 text-indigo-600 rounded border-gray-600 focus:ring-indigo-500 bg-gray-700 cursor-pointer"
                  />
                  <label htmlFor="allowRegistrations" className="text-gray-300">
                     Permitir Nuevos Registros de Usuarios
                  </label>
               </div>

               {/* Elementos por Página (Select) */}
               <div>
                  <label
                     htmlFor="itemsPerPage"
                     className="label text-gray-300 mb-1">
                     Elementos por Página (Tablas)
                  </label>
                  <select
                     id="itemsPerPage"
                     name="itemsPerPage"
                     value={settings.itemsPerPage}
                     onChange={handleChange}
                     // Select: Fondo oscuro
                     className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-indigo-500 focus:border-indigo-500">
                     <option className="bg-gray-700" value={5}>
                        5
                     </option>
                     <option className="bg-gray-700" value={10}>
                        10
                     </option>
                     <option className="bg-gray-700" value={20}>
                        20
                     </option>
                     <option className="bg-gray-700" value={50}>
                        50
                     </option>
                  </select>
               </div>

            
            </form>

            <div className="mt-10">
               {/* Botón Acordeón */}
               <button
                  type="button"
                  onClick={() => setShowImportarDatos(!showImportarDatos)}
                  className="w-full flex justify-between items-center text-2xl font-bold text-indigo-300">
                  Importar Datos iniciales
                  <span className="text-indigo-400 text-xl">
                     {showImportarDatos ? "▲" : "▼"}
                  </span>
               </button>
               {/* Contenido visible SOLO si showImportarDatos === true */}
               {showImportarDatos && (
                  <button
                     onClick={() => setImportModalOpen(true)}
                     className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium mt-8">
                     Importar Usuarios desde CSV
                  </button>
               )}
               <UserImportModal
                  isOpen={importModalOpen}
                  onClose={() => setImportModalOpen(false)}
               />
            </div>
   {/* ⭐ SECCIÓN INTEGRAR TESTIMONIOS */}
            <div className="mt-14">
               <button
                  type="button"
                  onClick={() => setShowWidget(!showWidget)}
                  className="w-full flex justify-between items-center text-2xl font-bold text-indigo-300"
               >
                  Integrar testimonios en tu sitio web
                  <span className="text-indigo-400 text-xl">
                     {showWidget ? "▲" : "▼"}
                  </span>
               </button>

               {showWidget && (
                  <div className="mt-6 bg-gray-900 p-6 rounded-lg border border-gray-700 space-y-6">

                     {/* Cantidad */}
                     <div>
                        <label className="text-gray-300 mb-1">
                           Cantidad de testimonios a mostrar
                        </label>
                        <input
                           type="number"
                           min="1"
                           value={widgetCantidad}
                           onChange={(e) => setWidgetCantidad(e.target.value)}
                           className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
                        />
                     </div>

                     {/* Generar */}
                     <button
                        onClick={generarCodigo}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md"
                     >
                        Generar código de inserción
                     </button>

                     {/* Resultado */}
                     {codigo && (
                        <textarea
                           readOnly
                           className="w-full h-48 p-4 bg-gray-800 text-indigo-300 border border-gray-700 
                           rounded-lg font-mono text-sm"
                           value={codigo}
                        />
                     )}
                  </div>
               )}
            </div>

         </div>
      </div>
   );
}

export default SettingsPage;