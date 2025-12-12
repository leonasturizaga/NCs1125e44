//import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';
import { mockTestimonials } from '../../testimonials/data/testimonialMocks'; // Importa la data

// Registrar los elementos necesarios para un gráfico de barras
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
);

// ----------------------------------------------------
// LÓGICA PARA PROCESAR DATA (Títulos vs. Vistas)
// ----------------------------------------------------
const processViewsData = () => {
    // Ordenar los testimonios por número de vistas de mayor a menor
    const sortedData = [...mockTestimonials].sort((a, b) => b.views - a.views);
    
    // Tomar solo los 10 más vistos (para que el gráfico sea legible)
    const topData = sortedData.slice(0, 10); 

    const labels = topData.map(t => t.title || t.author).map(title => title.length > 25 ? title.substring(0, 25) + '...' : title);
    const views = topData.map(t => t.views);
    
    return { labels, views };
};


function TestimonialViewsChart() {
    const { labels, views } = processViewsData();

    // Data del gráfico (Estilo Índigo/Oscuro)
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total de Vistas',
                data: views,
                backgroundColor: 'rgba(99, 102, 241, 0.7)', // Índigo
                borderColor: 'rgb(99, 102, 241)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(99, 102, 241, 0.9)',
            },
        ],
    };

    // Opciones del gráfico (Dark Theme)
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Ocultar leyenda si solo hay un dataset
            },
            title: {
                display: true,
                text: 'Top 10 Testimonios por Vistas',
                color: '#E5E7EB', // Blanco
                font: { size: 20 }
            },
            tooltip: {
                backgroundColor: '#374151', 
                titleColor: '#E5E7EB',
                bodyColor: '#D1D5DB',
            }
        },
        scales: {
            x: {
                title: {
                    display: false,
                },
                ticks: {
                    color: '#9CA3AF', // Gris para etiquetas
                },
                grid: {
                    display: false, // Quitar líneas verticales
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Vistas',
                    color: '#9CA3AF',
                },
                ticks: {
                    color: '#9CA3AF',
                    beginAtZero: true,
                },
                grid: {
                    color: '#374151', // Líneas horizontales oscuras
                }
            },
        },
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
            <div className="h-96"> {/* Altura fija para el Bar Chart */}
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default TestimonialViewsChart;