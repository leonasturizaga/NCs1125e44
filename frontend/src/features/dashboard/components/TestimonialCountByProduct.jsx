// src/features/dashboard/components/TestimonialCountByProduct.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2'; 

/**
 * Gráfico que muestra el conteo simple de testimonios por producto usando Chart.js.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.data - Datos ya agregados en formato { labels: [], data: [] }
 */
const TestimonialCountByProduct = ({ data }) => {

    const chartJsData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Conteo de Testimonios',
                data: data.data,
                backgroundColor: 'rgba(255, 128, 66, 0.8)', 
                borderColor: 'rgb(255, 128, 66)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true, 
        maintainAspectRatio: false,
        indexAxis: 'y', // Hace el gráfico horizontal
        plugins: {
            legend: { 
                display: false,
            },
            tooltip: { 
                backgroundColor: '#374151', 
                titleColor: '#E5E7EB', 
                bodyColor: '#D1D5DB' 
            }
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Conteo',
                    color: '#9CA3AF',
                },
                ticks: { color: '#9CA3AF' },
                grid: { color: '#374151' }
            },
            y: {
                type: 'category',
                ticks: { color: '#9CA3AF' },
                grid: { color: '#374151' }
            }
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 h-96">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Conteo Simple de Testimonios por Producto</h2>
            <div className="h-full">
                <Bar data={chartJsData} options={options} />
            </div>
        </div>
    );
};

export default TestimonialCountByProduct;