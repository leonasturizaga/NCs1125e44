/* eslint-disable no-irregular-whitespace */
// src/features/dashboard/pages/DashboardPage.jsx
//import VisitorMenu from '../../shared/components/VisitorMenu'; 
import TestimonialViewsChart from '../components/TestimonialViewsChart';
import AuthorsByCategory from '../components/AuthorsByCategory';
import React, { useState, /*useEffect*/} from 'react'; 
import { Line } from 'react-chartjs-2';
import { mockTestimonials } from '../../testimonials/data/testimonialMocks'; 
import {
Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
Title, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(
CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

// =================================================================
// CONSTANTES GLOBALES (DEBEN ESTAR ANTES DE DashboardPage())
// =================================================================
const chartData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    { label: 'Testimonios Creados', data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 90, 75, 85], fill: true, backgroundColor: 'rgba(99, 102, 241, 0.2)', borderColor: 'rgb(99, 102, 241)', tension: 0.3 },
    { label: 'Testimonios Aprobados', data: [50, 45, 70, 75, 50, 50, 35, 60, 55, 80, 70, 80], fill: true, backgroundColor: 'rgba(52, 211, 153, 0.2)', borderColor: 'rgb(52, 211, 153)', tension: 0.3 },
  ],
};

const chartOptions = { 
    responsive: true, maintainAspectRatio: false,
    plugins: {
        legend: { position: 'top', labels: { color: '#9CA3AF' } },
        tooltip: { backgroundColor: '#374151', titleColor: '#E5E7EB', bodyColor: '#D1D5DB' }
    },
    scales: { 
        x: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } }, 
        y: { ticks: { color: '#9CA3AF' }, grid: { color: '#374151' } } 
    }
};

const calculateMetrics = (data) => {
    const total = data.length;
    const published = data.filter(t => t.status === 'published').length;
    const pending = data.filter(t => t.status === 'pending').length;
    
    const approvalRate = total > 0 ? (published / total) * 100 : 0;

    return {
        total: total.toLocaleString(),
        pending: pending,
        approvalRate: `${approvalRate.toFixed(0)}%`,
    };
};
// =================================================================


function DashboardPage() {
    // 1. Estado para la Interactividad del Gráfico
    const [chartState, setChartState] = useState({
        isCreatedVisible: true,
        isApprovedVisible: true,
    });
    
    // 2. Estado para las Métricas (Cálculo Lazy)
    const [metrics] = useState(() => calculateMetrics(mockTestimonials));
    const [loading] = useState(false); 

    


    // Lógica para alternar la visibilidad de las líneas
    const handleLegendClick = (datasetIndex) => {
        setChartState(prev => ({
            ...prev,
            [datasetIndex === 0 ? 'isCreatedVisible' : 'isApprovedVisible']: !prev[datasetIndex === 0 ? 'isCreatedVisible' : 'isApprovedVisible']
        }));
    };
    
    // 3. Opciones Interactivas del Gráfico (Debe estar aquí dentro)
    const chartOptionsInteractive = {
        ...chartOptions, 
        plugins: {
            ...chartOptions.plugins,
            legend: {
                ...chartOptions.plugins.legend,
                labels: {
                    ...chartOptions.plugins.legend.labels,
                    onClick: (e, legendItem, /*legend*/) => {
                        handleLegendClick(legendItem.datasetIndex);
                    },
                    font: (context) => ({
                        color: chartState[context.datasetIndex === 0 ? 'isCreatedVisible' : 'isApprovedVisible'] ? '#E5E7EB' : '#6B7280',
                    }),
                }
            }
        }
    };
    
    // 4. Filtrar Datasets para Renderizado
    const filteredDatasets = chartData.datasets.filter((_, index) => {
        if (index === 0) return chartState.isCreatedVisible;
        if (index === 1) return chartState.isApprovedVisible;
        return true;
    });

    const finalChartData = { ...chartData, datasets: filteredDatasets };


    return (
        <div className="space-y-6 bg-gray-900 text-gray-100 "> 
            
            <h1 className="text-4xl font-extrabold text-white">Dashboard Principal</h1>
            <p className="text-xl text-indigo-400 mt-1">Visión general y métricas clave del CMS</p>
            
            <hr className="border-gray-700 mt-6" />

            {/* Área de Gráfico Principal */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                <p className="text-lg font-semibold text-gray-300 mb-4">Tendencias de Engagement (Últimos 12 meses)</p>
                <div className="h-72">
                    {loading ? (
                        <div className="flex justify-center items-center h-full text-gray-400">Cargando gráfico...</div>
                    ) : (
                        // 🛑 USAMOS EL GRÁFICO FILTRADO
                        <Line data={finalChartData} options={chartOptionsInteractive} /> 
                    )}
                </div>
            </div>
            
            {/* Tarjetas de Resumen (Usando datos del estado 'metrics') */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Tarjeta 1: Total Testimonios */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Total Testimonios</p>
                    <h3 className="text-3xl font-extrabold text-indigo-400 mt-1">{metrics.total}</h3>
                </div>
                
                {/* Tarjeta 2: Tasa de Aprobación */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Tasa de Aprobación</p>
                    <h3 className="text-3xl font-extrabold text-green-400 mt-1">{metrics.approvalRate}</h3>
                </div>

                {/* Tarjeta 3: Pendientes de Moderación */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Pendientes de Moderación</p>
                    <h3 className="text-3xl font-extrabold text-yellow-400 mt-1">{metrics.pending}</h3>
                </div>
                
            </div>
            {/* INTEGRACIÓN: Nuevo Componente de Gráfico de Vistas */}
        <div className="pt-8">
            <TestimonialViewsChart />
        </div>
        {/*  INTEGRACIÓN: Nuevo Componente de Distribución de Autores */}
                <div className="pt-8">
                    <AuthorsByCategory />
                </div>
            {/* Enlace Home */}
            <a href="/" className="inline-flex mt-8 items-center gap-3 px-4 py-3 text-indigo-400 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition border border-gray-700">
                Volver a Home Visitante
            </a>
        </div>
    );
}

export default DashboardPage;