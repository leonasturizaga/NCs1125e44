/* eslint-disable no-irregular-whitespace */
// src/features/dashboard/pages/DashboardPage.jsx
import TestimonialCountByProduct from '../components/TestimonialCountByProduct';
import TestimonialViewsChart from '../components/TestimonialViewsChart'; 
import AuthorsByCategory from '../components/AuthorsByCategory';
import RatingsDistributionChart from '../../testimonials/components/RatingsDistributionChart'; 
import TopKeywordsChart from '../components/TopKeywordsChart'; 
import TestimonialSentimentChart from '../components/TestimonialSentimentChart';
import AttributedRevenueChart from '../components/AttributedRevenueChart'; 
import TestimonialGeographicChart from '../components/TestimonialGeographicChart';
import MetricConsultationAndSolution from '../components/MetricConsultationAndSolution';


import { useState, /*useEffect*/} from 'react'; 
import { Line } from 'react-chartjs-2';
import { mockTestimonials } from '../../testimonials/data/testimonialMocks'; 
import {
Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,BarElement,
Title, Tooltip, Legend,
ArcElement,Filler,
} from 'chart.js';

ChartJS.register(
CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
BarElement, ArcElement,Filler 
);

// =================================================================
// CONSTANTES GLOBALES Y FUNCIONES DE UTILIDAD (AGREGACIÓN DE DATOS)
// =================================================================

const STOP_WORDS = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero', 'a', 'de', 'en', 'es', 'del', 'que', 'se', 'con', 'por', 'para', 'mi', 'su', 'muy', 'gracias', 'gran', 'rápido', 'buen', 'mis', 'sus', 'mejores', 'más', 'sin', 'yo', 'tu', 'él', 'ella', 'nos', 'os', 'les', 'les', 'lo', 'lo', 'fue']);
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

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
    
    const totalRevenue = data.reduce((sum, t) => sum + (t.attributedRevenue || 0), 0);

    return {
        total: total.toLocaleString(),
        pending: pending,
        approvalRate: `${approvalRate.toFixed(0)}%`,
        avgRating: avgRating.toFixed(1),
        totalRevenue: totalRevenue.toLocaleString('es-CL'),
    };
};

// FUNCIÓN DE UTILIDAD: Tendencia de Engagement
const aggregateTrendByMonth = (data) => {
    const trendMap = MONTHS.reduce((acc, month, index) => {
        acc[index] = { created: 0, approved: 0 };
        return acc;
    }, {});

    data.forEach(t => {
        const monthIndex = t.createdAt.getMonth(); 
        if (trendMap[monthIndex]) {
            trendMap[monthIndex].created += 1;
            if (t.status === 'published') {
                trendMap[monthIndex].approved += 1;
            }
        }
    });

    const createdData = MONTHS.map((_, index) => trendMap[index].created);
    const approvedData = MONTHS.map((_, index) => trendMap[index].approved);

    return {
        labels: MONTHS,
        datasets: [
            { label: 'Testimonios Creados', data: createdData, fill: true, backgroundColor: 'rgba(99, 102, 241, 0.2)', borderColor: 'rgb(99, 102, 241)', tension: 0.3 },
            { label: 'Testimonios Aprobados', data: approvedData, fill: true, backgroundColor: 'rgba(52, 211, 153, 0.2)', borderColor: 'rgb(52, 211, 153)', tension: 0.3 },
        ],
    };
};

// FUNCIÓN DE UTILIDAD: Análisis por Producto (Vistas)
const aggregateViewsByProduct = (data) => {
    const viewsMap = data.reduce((acc, t) => {
        const name = t.product || 'General';
        acc[name] = (acc[name] || 0) + (t.views || 0);
        return acc;
    }, {});
    
    const sortedViews = Object.entries(viewsMap)
        .sort(([, viewsA], [, viewsB]) => viewsB - viewsA);

    return {
        labels: sortedViews.map(([product]) => product).reverse(), 
        data: sortedViews.map(([, views]) => views).reverse()
    };
};

// FUNCIÓN DE UTILIDAD: Agregación Geográfica
const aggregateByCountry = (data) => {
    const countryMap = data.reduce((acc, t) => {
        const country = t.country || 'Desconocido';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(countryMap);
    const dataCounts = Object.values(countryMap);

    return {
        labels: labels,
        data: dataCounts
    };
};


// Funciones de agregación existentes (sin cambios significativos)
const aggregateByProduct = (data) => {
    const aggregationMap = data.reduce((acc, t) => {
        const name = t.product || 'General';
        acc[name] = (acc[name] || 0) + 1;
        return acc;
    }, {});
    return { labels: Object.keys(aggregationMap), data: Object.values(aggregationMap) };
};

const aggregateAuthorsByCategory = (data) => {
    const categoryMap = data.reduce((acc, t) => {
        acc[t.category] = acc[t.category] || new Set();
        acc[t.category].add(t.author);
        return acc;
    }, {});
    const labels = Object.keys(categoryMap);
    const dataCounts = labels.map(category => categoryMap[category].size);
    return { labels: labels, data: dataCounts };
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
    return { labels: labels, data: dataCounts };
};

const aggregateSentiment = (data) => {
    const sentimentMap = data.reduce((acc, t) => {
        const sentiment = t.sentiment; 
        if (sentiment) { acc[sentiment] = (acc[sentiment] || 0) + 1; }
        return acc;
    }, {});
    const labels = Object.keys(sentimentMap);
    const dataCounts = Object.values(sentimentMap);
    return { labels: labels, data: dataCounts };
};

const aggregateKeywords = (data, limit = 10) => {
    const keywordMap = {};
    const textContent = data.map(t => t.content || t.comment || 'great service product').join(' ');
    const words = textContent
        .toLowerCase()
        .replace(/[.,\\/#!$%\\^&\\*;:{}=\-_`~()]/g,"") 
        .split(/\s+/) 
        .filter(word => word.length > 2 && !STOP_WORDS.has(word)); 
    words.forEach(word => { keywordMap[word] = (keywordMap[word] || 0) + 1; });
    const sortedKeywords = Object.entries(keywordMap)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, limit);
    return {
        labels: sortedKeywords.map(([word]) => word).reverse(),
        data: sortedKeywords.map(([, count]) => count).reverse()
    };
};

//  FUNCIÓN DE UTILIDAD: Agregación de Ingresos Atribuidos (ROBUSTECIDA)
const aggregateAttributedRevenue = (data) => {
  const revenueMap = data
    .filter(t =>
      t &&
      t.status === 'published' &&
      typeof t.product === 'string' &&
      t.product.trim() !== '' &&
      typeof t.attributedRevenue === 'number'
    )
    .reduce((acc, t) => {
      const name = t.product.trim();
      acc[name] = (acc[name] || 0) + t.attributedRevenue;
      return acc;
    }, {}); // ← valor inicial AGREGADO

  const sortedRevenue = Object.entries(revenueMap)
    .sort(([, revenueA], [, revenueB]) => revenueB - revenueA);

  return {
    labels: sortedRevenue.map(([product]) => product).reverse(),
    data: sortedRevenue.map(([, revenue]) => revenue).reverse()
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
    const [keywordsData] = useState(() => aggregateKeywords(mockTestimonials));
    // sentimentData se utiliza en TestimonialSentimentChart
    const [sentimentData] = useState(() => aggregateSentiment(mockTestimonials)); 
    const [revenueData] = useState(() => aggregateAttributedRevenue(mockTestimonials)); 
    
    // DATA DINÁMICA DE TENDENCIA Y VISTAS POR PRODUCTO
    const [trendData] = useState(() => aggregateTrendByMonth(mockTestimonials));
    const [viewsData] = useState(() => aggregateViewsByProduct(mockTestimonials));
    
    // DATA GEOGRÁFICA
    const [geographicData] = useState(() => aggregateByCountry(mockTestimonials));


    // Lógica para alternar la visibilidad de las líneas
    const handleLegendClick = (datasetIndex) => {
        setChartState(prev => ({
            ...prev,
            [datasetIndex === 0 ? 'isCreatedVisible' : 'isApprovedVisible']: !prev[datasetIndex === 0 ? 'isCreatedVisible' : 'isApprovedVisible']
        }));
    };
    
    // Opciones Interactivas del Gráfico (para el de Tendencia)
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
    
    // Filtrado Dinámico de Data de Tendencia
    const finalTrendData = { 
        ...trendData, 
        datasets: trendData.datasets.filter((_, index) => {
            if (index === 0) return chartState.isCreatedVisible;
            if (index === 1) return chartState.isApprovedVisible;
            return true;
        })
    };


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
        <Line data={finalTrendData} options={chartOptionsInteractive} /> 
    )} 
</div>
            </div>
            
            {/* Tarjetas de Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Tarjeta 1-4 existentes... */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Total Testimonios</p>
                    <h3 className="text-3xl font-extrabold text-indigo-400 mt-1">{metrics.total}</h3>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Tasa de Aprobación</p>
                    <h3 className="text-3xl font-extrabold text-green-400 mt-1">{metrics.approvalRate}</h3>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Pendientes de Moderación</p>
                    <h3 className="text-3xl font-extrabold text-yellow-400 mt-1">{metrics.pending}</h3>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Rating Promedio (Publicado)</p>
                    <h3 className="text-3xl font-extrabold text-amber-400 mt-1">
                        {metrics.avgRating} <span className="text-xl">★</span>
                    </h3>
                </div>

                {/* Tarjeta de Ingresos Totales */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 md:col-span-4">
                    <p className="text-gray-400">Ingresos Totales Atribuidos (Lifetime)</p>
                    <h3 className="text-4xl font-extrabold text-orange-400 mt-1">
                        ${metrics.totalRevenue}
                    </h3>
                </div>
            </div>
            
        {/* GRÁFICOS DE ANÁLISIS POR PRODUCTO: VISTAS y CONTEO */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <TestimonialViewsChart data={viewsData} />
            <TestimonialCountByProduct data={productCountData} />
        </div>

        {/* GRÁFICOS DE SEGMENTACIÓN: Autores y Geográfico */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <AuthorsByCategory data={authorsByCategoryData} />
            {/* GRÁFICO GEOGRÁFICO */}
            <TestimonialGeographicChart data={geographicData} />
        </div>

        {/* SECCIÓN DE GRÁFICO DE VENTAS: Ingresos Atribuidos por Producto */}
        <div className="pt-6 grid grid-cols-1 gap-6">
            <AttributedRevenueChart data={revenueData} />
        </div>


        {/* GRÁFICOS DE CALIDAD Y CONSULTA */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* GRÁFICOS DE CALIDAD */}
            <div className="lg:col-span-1">
                <RatingsDistributionChart data={ratingsData} />
            </div>
            <div className="lg:col-span-1">
                <TestimonialSentimentChart data={sentimentData} />
            </div>
            {/* GRÁFICO ADICIONAL DE PALABRAS CLAVE */}
        <div className="lg:col-span-1">
            <TopKeywordsChart data={keywordsData} />
        </div>
            
            
        </div>

        {/* COMPONENTE DE SOLUCIÓN Y CONSULTA */}
            <div className="pt-8 grid grid-cols-1 lg:grid-cols-1 gap-6">
                <MetricConsultationAndSolution 
                    approvalRate={metrics.approvalRate}
                    avgRating={metrics.avgRating}
                    totalRevenue={metrics.totalRevenue}
                />
            </div>
            
            {/* Enlace Home */}
            <a href="/" className="inline-flex mt-8 items-center gap-3 px-4 py-3 text-indigo-400 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition border border-gray-700">
                Volver a Home Visitante
            </a>
        </div>
    );
}

export default DashboardPage;