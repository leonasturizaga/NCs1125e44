import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const sentimentColors = {
    'Positivo': 'rgba(52, 211, 153, 1)', // Verde (Emerald)
    'Neutro': 'rgba(251, 191, 36, 1)',  // Amarillo (Amber)
    'Negativo': 'rgba(239, 68, 68, 1)', // Rojo (Red)
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right', // Posiciona la leyenda a la derecha
            labels: {
                color: '#9CA3AF', // Color de texto de la leyenda
            },
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
                        // Calcula el porcentaje
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
 * Componente para mostrar la distribución de sentimientos de los testimonios.
 * Espera data en formato Chart.js: { labels: [], data: [] }
 */
const TestimonialSentimentChart = ({ data }) => {
    // Preparar los datasets para Chart.js
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.data,
                backgroundColor: data.labels.map(label => sentimentColors[label] || '#6B7280'),
                borderColor: '#1F2937', // Color de fondo oscuro para el borde
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 h-96">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">
                Distribución de Sentimiento (Calidad)
            </h3>
            <div className="h-full flex justify-center items-center">
                <div className="w-full max-w-sm h-72">
                    <Pie data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default TestimonialSentimentChart;