// src/features/dashboard/components/TopKeywordsChart.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2'; 

/**
 * Gráfico que muestra las 10 palabras clave más frecuentes en los testimonios.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.data - Datos ya agregados en formato { labels: ['palabra1', ...], data: [N1, ...] }
 */
const TopKeywordsChart = ({ data }) => {

    const chartJsData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Frecuencia de Palabras',
                data: data.data,
                // Color para la frecuencia de palabras (por ejemplo, un gris/azul claro)
                backgroundColor: 'rgba(59, 130, 246, 0.7)', 
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true, 
        maintainAspectRatio: false,
        indexAxis: 'y', // Gráfico horizontal
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
                    text: 'Frecuencia',
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
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Top 10 Palabras Clave</h2>
            <div className="h-full">
                <Bar data={chartJsData} options={options} />
            </div>
        </div>
    );
};

export default TopKeywordsChart;