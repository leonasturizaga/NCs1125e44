// src/features/dashboard/components/RatingsDistributionChart.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2'; 
// No es necesario importar lucide-react aquí, ya que Chart.js lo maneja con texto

/**
 * Gráfico que muestra la distribución de ratings (1 a 5 estrellas) como un BarChart vertical.
 * RESPETA EL MODELO: Solo recibe props.data y renderiza la visualización.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.data - Datos ya agregados en formato { labels: ['5 ★', '4 ★', ...], data: [N1, N2, ...] }
 */
const RatingsDistributionChart = ({ data }) => {

    const chartJsData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Conteo de Ratings',
                data: data.data,
                // Color asociado a las estrellas (Ámbar)
                backgroundColor: 'rgba(251, 191, 36, 0.8)', 
                borderColor: 'rgb(251, 191, 36)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                display: false, // Ocultar la leyenda si solo hay un dataset
            },
            tooltip: { 
                backgroundColor: '#374151', 
                titleColor: '#E5E7EB', 
                bodyColor: '#D1D5DB' 
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Rating (Estrellas)',
                    color: '#9CA3AF',
                },
                ticks: { color: '#9CA3AF' },
                grid: { color: '#374151' }
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Número de Testimonios',
                    color: '#9CA3AF',
                },
                ticks: { color: '#9CA3AF' },
                grid: { color: '#374151' }
            }
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 h-96">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Distribución de Ratings (Calidad)</h2>
            <div className="h-full">
                <Bar data={chartJsData} options={options} />
            </div>
        </div>
    );
};

export default RatingsDistributionChart;