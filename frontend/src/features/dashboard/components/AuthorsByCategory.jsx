// src/features/dashboard/components/AuthorsByCategory.jsx

import React from 'react';
// 🛑 Usamos Pie de react-chartjs-2 para el gráfico de torta
import { Pie } from 'react-chartjs-2'; 

/**
 * Gráfico que muestra la distribución de autores únicos por categoría como un Gráfico de Torta.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.data - Datos ya agregados en formato { labels: [], data: [] }
 */
const AuthorsByCategory = ({ data }) => {

    const chartJsData = {
        labels: data.labels,
        datasets: [
            {
                data: data.data,
                // Colores distintivos para el gráfico de torta
                backgroundColor: [
                    'rgba(79, 70, 229, 0.8)', // Indigo
                    'rgba(52, 211, 153, 0.8)', // Green
                    'rgba(251, 191, 36, 0.8)', // Amber
                    'rgba(239, 68, 68, 0.8)',  // Red
                    'rgba(99, 102, 241, 0.8)', // Light Indigo
                ],
                borderColor: '#1F2937', // Fondo oscuro del borde
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                position: 'right', // Colocamos la leyenda a la derecha
                labels: {
                    color: '#9CA3AF',
                }
            },
            tooltip: { 
                backgroundColor: '#374151', 
                titleColor: '#E5E7EB', 
                bodyColor: '#D1D5DB' 
            }
        },
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 h-96">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Distribución de Autores por Categoría</h2>
            <div className="h-full flex items-center justify-center">
                <div className="w-full max-w-sm h-72"> {/* Contenedor para controlar el tamaño de la torta */}
                    <Pie data={chartJsData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default AuthorsByCategory;