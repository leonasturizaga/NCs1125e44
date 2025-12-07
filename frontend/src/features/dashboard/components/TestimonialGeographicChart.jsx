//import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Paleta de colores consistente para la distribución geográfica
const GEOGRAPHIC_COLORS = [
    'rgba(74, 85, 104, 1)', // Gris oscuro
    'rgba(99, 102, 241, 1)', // Índigo
    'rgba(52, 211, 153, 1)', // Esmeralda
    'rgba(251, 191, 36, 1)', // Ámbar
    'rgba(239, 68, 68, 1)',  // Rojo
    'rgba(147, 51, 234, 1)', // Violeta
];

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
            labels: { color: '#9CA3AF' },
        },
        tooltip: {
            backgroundColor: '#374151',
            titleColor: '#E5E7EB',
            bodyColor: '#D1D5DB',
            callbacks: {
                label: function(context) {
                    let label = context.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed !== null) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const value = context.parsed;
                        const percentage = ((value / total) * 100).toFixed(1) + '%';
                        label += `${value} (${percentage})`;
                    }
                    return label;
                }
            }
        }
    }
};

/**
 * Componente para mostrar la distribución de testimonios por País.
 * Espera data en formato Chart.js: { labels: [], data: [] }
 */
const TestimonialGeographicChart = ({ data }) => {
    // Definición de la data para Chart.js
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.data,
                backgroundColor: data.labels.map((_, index) => GEOGRAPHIC_COLORS[index % GEOGRAPHIC_COLORS.length]),
                borderColor: '#1F2937', 
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 h-96">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">
                Distribución Geográfica de Testimonios
            </h3>
            <div className="h-72 flex justify-center items-center">
                <div className="w-full max-w-xs h-full">
                    <Pie data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default TestimonialGeographicChart;