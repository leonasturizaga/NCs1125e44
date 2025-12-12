import React from 'react';
import { Bar } from 'react-chartjs-2';
// Se corrigió la ruta de importación ajustando el nivel de profundidad a '../../' 
// para resolver el problema de compilación en el entorno.
import { mockTestimonials } from '../../testimonials/data/testimonialMocks.js'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'top', labels: { color: '#9CA3AF' } },
        title: { display: false },
        tooltip: { backgroundColor: '#374151', titleColor: '#E5E7EB', bodyColor: '#D1D5DB' }
    },
    scales: {
        x: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } },
        y: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } }
    }
};

/**
 * Función que agrega los testimonios publicados por el campo productName
 * y calcula el número total de testimonios por cada producto.
 */
const aggregateTestimonialsByProduct = () => {
    // 1. Filtrar solo los testimonios publicados
    const published = mockTestimonials.filter(t => t.status === 'published');

    // 2. Agrupar por productName y contar
    const aggregation = published.reduce((acc, t) => {
        const name = t.productName || 'General';
        acc[name] = (acc[name] || 0) + 1;
        return acc;
    }, {});

    // 3. Preparar los datos para Chart.js
    const labels = Object.keys(aggregation);
    const data = Object.values(aggregation);
    const backgroundColors = [
        'rgba(249, 115, 22, 0.7)', // Naranja (Plataforma Web)
        'rgba(99, 102, 241, 0.7)', // Índigo (App Móvil)
        'rgba(52, 211, 153, 0.7)', // Verde (Soporte VIP)
        'rgba(239, 68, 68, 0.7)',  // Rojo (Otro)
    ];

    return {
        labels,
        datasets: [
            {
                label: 'Testimonios Publicados',
                data: data,
                backgroundColor: labels.map((_, index) => backgroundColors[index % backgroundColors.length]),
                borderColor: labels.map((_, index) => backgroundColors[index % backgroundColors.length].replace('0.7', '1')),
                borderWidth: 1,
            }
        ]
    };
};

const TestimonialsByProductChart = () => {
    const chartData = aggregateTestimonialsByProduct();

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 col-span-1">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">
                Distribución por Producto (Clave para Ventas)
            </h2>
            <p className="text-sm text-gray-500 mb-4">
                Muestra qué productos generan más contenido de prueba social.
            </p>
            <div className="h-72">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default TestimonialsByProductChart;