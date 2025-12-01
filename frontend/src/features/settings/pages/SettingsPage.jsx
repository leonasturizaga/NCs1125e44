// src/features/settings/pages/SettingsPage.jsx

import React, { useState } from 'react';

function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: 'Testimonial CMS',
        adminEmail: 'admin@example.com',
        allowRegistrations: true,
        itemsPerPage: 10,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Configuración guardada:', settings);
        // Aquí iría la lógica para enviar los datos al backend
        alert('Configuración guardada (Mock)');
    };

    return (
        <div className="space-y-6">
            {/* Título Principal */}
            <h1 className="text-4xl font-extrabold text-white">Configuración</h1>
            <p className="text-xl text-indigo-400 mt-1">Ajusta las opciones generales del CMS</p>
            <hr className="border-gray-700 mt-6" />

            {/* Formulario de Configuración (Contenedor) */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Nombre del Sitio */}
                    <div>
                        {/* Label: Gris claro */}
                        <label htmlFor="siteName" className="label text-gray-300 mb-1">Nombre del Sitio</label>
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
                        <label htmlFor="adminEmail" className="label text-gray-300 mb-1">Correo Electrónico del Administrador</label>
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
                        <label htmlFor="allowRegistrations" className="text-gray-300">Permitir Nuevos Registros de Usuarios</label>
                    </div>

                    {/* Elementos por Página (Select) */}
                    <div>
                        <label htmlFor="itemsPerPage" className="label text-gray-300 mb-1">Elementos por Página (Tablas)</label>
                        <select
                            id="itemsPerPage"
                            name="itemsPerPage"
                            value={settings.itemsPerPage}
                            onChange={handleChange}
                            // Select: Fondo oscuro
                            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option className="bg-gray-700" value={5}>5</option>
                            <option className="bg-gray-700" value={10}>10</option>
                            <option className="bg-gray-700" value={20}>20</option>
                            <option className="bg-gray-700" value={50}>50</option>
                        </select>
                    </div>

                    {/* Botón de Guardar */}
                    <button
                        type="submit"
                        // Botón Primario: Índigo
                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium mt-8"
                    >
                        Guardar Configuración
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SettingsPage;