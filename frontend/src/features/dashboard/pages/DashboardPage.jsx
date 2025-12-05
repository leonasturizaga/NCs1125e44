/* eslint-disable no-irregular-whitespace */
// src/features/dashboard/pages/DashboardPage.jsx
import TestimonialCountByProduct from '../components/TestimonialCountByProduct';
import TestimonialsByProductChart from '../components/TestimonialsByProductChart';
import TestimonialViewsChart from '../components/TestimonialViewsChart';
import AuthorsByCategory from '../components/AuthorsByCategory';
import RatingsDistributionChart from '../components/RatingsDistributionChart'; 
// 🛑 NUEVA IMPORTACIÓN
import TopKeywordsChart from '../components/TopKeywordsChart'; 

import { useState, /*useEffect*/} from 'react'; 
import { Line } from 'react-chartjs-2';
import { mockTestimonials } from '../../testimonials/data/testimonialMocks'; 
import {
Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,BarElement,
Title, Tooltip, Legend,
ArcElement,
} from 'chart.js';

ChartJS.register(
CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
BarElement, ArcElement
);

// =================================================================
// CONSTANTES GLOBALES Y FUNCIONES DE UTILIDAD (AGREGACIÓN DE DATOS)
// =================================================================

// Lista simple de palabras comunes (stop words) para filtrar
const STOP_WORDS = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero', 'a', 'de', 'en', 'es', 'del', 'que', 'se', 'con', 'por', 'para', 'mi', 'su', 'muy', 'gracias']);

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
    const publishedTestimonials = data.filter(t => t.status === 'published' && t.rating);
    const totalRating = publishedTestimonials.reduce((sum, t) => sum + t.rating, 0);
    const avgRating = publishedTestimonials.length > 0 ? (totalRating / publishedTestimonials.length) : 0;

    return {
        total: total.toLocaleString(),
        pending: pending,
        approvalRate: `${approvalRate.toFixed(0)}%`,
        avgRating: avgRating.toFixed(1),
    };
};

const aggregateByProduct = (data) => {
    const aggregationMap = data.reduce((acc, t) => {
        const name = t.product || 'General';
        acc[name] = (acc[name] || 0) + 1;
        return acc;
    }, {});

    return {
        labels: Object.keys(aggregationMap),
        data: Object.values(aggregationMap)
    };
};

const aggregateAuthorsByCategory = (data) => {
    const categoryMap = data.reduce((acc, t) => {
        acc[t.category] = acc[t.category] || new Set();
        acc[t.category].add(t.author);
        return acc;
    }, {});

    const labels = Object.keys(categoryMap);
    const dataCounts = labels.map(category => categoryMap[category].size);

    return {
        labels: labels,
        data: dataCounts
    };
};

const aggregateRatings = (data) => {
    const ratedData = data.filter(t => t.status === 'published' && t.rating);
    const ratingMap = ratedData.reduce((acc, t) => {
        const rating = t.rating;
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
    }, {});

    const labels = [5, 4, 3, 2, 1].map(r => `${r} ★`);
    const dataCounts = [5, 4, 3, 2, 1].map(r => ratingMap[r] || 0);

    return {
        labels: labels,
        data: dataCounts
    };
};

// 🛑 NUEVA FUNCIÓN DE UTILIDAD: Palabras clave
const aggregateKeywords = (data, limit = 10) => {
    const keywordMap = {};

    // Asumimos que el testimonio tiene una propiedad 'content' o 'text' que contiene el texto.
    // Si tus mockTestimonials tienen otra clave, ajústala aquí (e.g., t.comment)
    const textContent = data.map(t => t.content || t.comment || 'great service product').join(' ');

    const words = textContent
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") // Eliminar puntuación
        .split(/\s+/) // Dividir por espacios
        .filter(word => word.length > 2 && !STOP_WORDS.has(word)); // Filtrar longitud y stop words

    words.forEach(word => {
        keywordMap[word] = (keywordMap[word] || 0) + 1;
    });

    const sortedKeywords = Object.entries(keywordMap)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, limit);

    return {
        // Invertimos el orden para que el gráfico de barras horizontal se vea descendente
        labels: sortedKeywords.map(([word]) => word).reverse(),
        data: sortedKeywords.map(([, count]) => count).reverse()
    };
};


// =================================================================


function DashboardPage() {
    const [chartState, setChartState] = useState({
        isCreatedVisible: true,
        isApprovedVisible: true,
    });
    
    const [metrics] = useState(() => calculateMetrics(mockTestimonials));
    const [loading] = useState(false); 

    
    // CÁLCULO DE DATOS: Preparamos la data para los componentes de gráficos
    const [productCountData] = useState(() => aggregateByProduct(mockTestimonials));
    const [authorsByCategoryData] = useState(() => aggregateAuthorsByCategory(mockTestimonials));
    const [ratingsData] = useState(() => aggregateRatings(mockTestimonials));
    // 🛑 NUEVO: Data para el gráfico de palabras clave
    const [keywordsData] = useState(() => aggregateKeywords(mockTestimonials));


    // Lógica para alternar la visibilidad de las líneas
    const handleLegendClick = (datasetIndex) => {
        setChartState(prev => ({
            ...prev,
            [datasetIndex === 0 ? 'isCreatedVisible' : 'isApprovedVisible']: !prev[datasetIndex === 0 ? 'isCreatedVisible' : 'isApprovedVisible']
        }));
    };
    
    // Opciones Interactivas del Gráfico
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
    
    // Filtrar Datasets para Renderizado
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

            {/* Área de Gráfico Principal (Línea) */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                <p className="text-lg font-semibold text-gray-300 mb-4">Tendencias de Engagement (Últimos 12 meses)</p>
                <div className="h-72">
                    {loading ? (
                        <div className="flex justify-center items-center h-full text-gray-400">Cargando gráfico...</div>
                    ) : (
                        <Line data={finalChartData} options={chartOptionsInteractive} /> 
                    )}
                </div>
            </div>
            
            {/* Tarjetas de Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Tarjetas de métricas ... */}
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

                {/* Tarjeta 4: Rating Promedio */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Rating Promedio (Publicado)</p>
                    <h3 className="text-3xl font-extrabold text-amber-400 mt-1">
                        {metrics.avgRating} <span className="text-xl">★</span>
                    </h3>
                </div>
            </div>
            
        {/* GRÁFICOS DE BARRAS/VISTAS (2 columnas) */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TestimonialViewsChart />
            <TestimonialsByProductChart />
        </div>

        {/* GRÁFICOS DE TORTA Y BARRAS HORIZONTALES (2 columnas) */}
                <div className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Gráfico de Torta */}
                    <AuthorsByCategory data={authorsByCategoryData} />
                    
                    {/* Gráfico de Barras Horizontal */}
                    <TestimonialCountByProduct data={productCountData} />
                </div>

        {/* 🛑 NUEVA SECCIÓN PARA GRÁFICOS DE CALIDAD Y PALABRAS CLAVE */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* GRÁFICO 1: Distribución de Ratings (Calidad) */}
            <div className="lg:col-span-1">
                <RatingsDistributionChart data={ratingsData} />
            </div>

            {/* 🛑 GRÁFICO 2: Top Palabras Clave */}
            <div className="lg:col-span-1">
                <TopKeywordsChart data={keywordsData} />
            </div>
            
        </div>
            
            {/* Enlace Home (Corrección del cierre de etiquetas) */}
            <a href="/" className="inline-flex mt-8 items-center gap-3 px-4 py-3 text-indigo-400 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition border border-gray-700">
                Volver a Home Visitante
            </a>
        </div>
    );
}

export default DashboardPage;