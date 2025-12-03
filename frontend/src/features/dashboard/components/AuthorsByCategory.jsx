// src/features/dashboard/components/AuthorsByCategory.jsx

import React, { useState, useEffect } from 'react';
// Importamos la lista completa de testimonios (incluye content/title)
import { mockTestimonials } from '../../testimonials/data/testimonialMocks'; 

// Estilos de color para cada categoría (usando nuestra paleta oscura)
const categoryColors = {
    Clients: 'text-indigo-400 bg-indigo-900/40',
    Employees: 'text-green-400 bg-green-900/40',
    Suppliers: 'text-yellow-400 bg-yellow-900/40',
};

// NOMBRES DE CATEGORÍAS EN ESPAÑOL
const categoryNamesEs = {
    Clients: 'Clientes',
    Employees: 'Empleados',
    Suppliers: 'Proveedores',
};

function AuthorsByCategory() {
    // CAMBIADO a 'testimonialsByCat' para reflejar el contenido
    const [testimonialsByCat, setTestimonialsByCat] = useState({}); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const processTestimonies = () => {
            const grouped = {};
            
            // 1. Agrupar los objetos de testimonio (con título y contenido) por categoría
            mockTestimonials.forEach(t => {
                const category = t.category;
                
                if (!grouped[category]) {
                    grouped[category] = [];
                }
                
                //  GUARDAMOS EL TÍTULO Y AUTOR para el listado
                grouped[category].push({
                    title: t.title || t.author, // Usar título o autor como fallback
                    content: t.content,
                    id: t.id,
                });
            });

            // 2. Simplificar el resultado
            const finalGroups = {
                Clients: grouped.Clients || [],
                Employees: grouped.Employees || [],
                Suppliers: grouped.Suppliers || [],
            };
            
            setTestimonialsByCat(finalGroups);
            setLoading(false);
        };

        processTestimonies();
    }, []); 
    
    if (loading) {
        return <div className="text-center text-gray-500 py-10">Cargando testimonios agrupados...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Título en Español */}
            <h2 className="text-2xl font-bold text-white mb-4">Historias Agrupadas por Categoría de Usuario</h2>
            <p className="text-gray-400">Visualiza los títulos de los testimonios más recientes</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.keys(testimonialsByCat).map(categoryKey => (
                    // Tarjeta de Categoría
                    <div 
                        key={categoryKey} 
                        className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-xl"
                    >
                        {/* Título de la Categoría */}
                        <h3 className={`text-lg font-semibold mb-3 px-3 py-1 rounded-full w-fit ${categoryColors[categoryKey]}`}>
                            {categoryNamesEs[categoryKey]} ({testimonialsByCat[categoryKey].length})
                        </h3>
                        
                        {/* LISTA DE CONTENIDO: Forzar texto blanco o gris claro */}
                        <ul className="space-y-3 h-32 overflow-y-auto mt-4 pr-1 
                            custom-scroll-indigospace-y-3 h-32 overflow-y-auto mt-4 pr-1 
                            scrollbar scrollbar-thumb-indigo-600 scrollbar-track-gray-800">
                            {testimonialsByCat[categoryKey].length > 0 ? (
                                testimonialsByCat[categoryKey].slice(0, 5).map((t, index) => ( 
                                    <li 
                                        key={index} 
                                        // CORRECCIÓN CLAVE: Usar text-gray-100 para que se vea
                                        className="text-sm text-gray-100 hover:text-indigo-400 transition cursor-pointer border-b border-gray-700/50 pb-2"
                                        title={t.content} // Muestra el contenido completo al pasar el ratón
                                    >
                                        • {t.title}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 text-sm">No hay historias disponibles.</li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AuthorsByCategory;