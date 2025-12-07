//import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Hace el gráfico horizontal para mejor lectura de nombres de productos
    plugins: {
        legend: { position: 'top', labels: { color: '#9CA3AF' } },
        tooltip: {
            backgroundColor: '#374151',
            titleColor: '#E5E7EB',
            bodyColor: '#D1D5DB',
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    // Formato de moneda para el tooltip
                    label += `$${context.parsed.x.toLocaleString('es-CL')}`; 
                    return label;
                }
            }
        },
        title: {
            display: false,
        }
    },
    scales: {
        x: {
            ticks: { color: '#9CA3AF', callback: (value) => `$${value.toLocaleString('es-CL')}` }, // Eje X con formato de moneda
            grid: { color: '#374151' },
            title: { display: true, text: 'Ingresos ($)', color: '#9CA3AF' }
        },
        y: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } }
    }
};

/**
 * Componente para mostrar la distribución de Ingresos Atribuidos por Producto.
 * Espera data en formato Chart.js: { labels: [], data: [] }
 */
const AttributedRevenueChart = ({ data }) => {
    // Definición de la data para Chart.js
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Ingresos Atribuidos',
                data: data.data,
                backgroundColor: 'rgba(255, 165, 0, 0.8)', // Color naranja/ámbar para ventas
                borderColor: 'rgba(255, 165, 0, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 h-96">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">
                Distribución de Ingresos Atribuidos ($)
            </h3>
            <div className="h-72">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default AttributedRevenueChart;