
// src/features/dashboard/pages/DashboardPage.jsx

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes de Chart.js que vamos a usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Datos y opciones de ejemplo para el gráfico
const chartData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Testimonios Creados',
      data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 90, 75, 85],
      fill: true,
      backgroundColor: 'rgba(99, 102, 241, 0.2)', // Índigo suave
      borderColor: 'rgb(99, 102, 241)', // Índigo
      tension: 0.3, // Suaviza la línea
    },
    {
      label: 'Testimonios Aprobados',
      data: [50, 45, 70, 75, 50, 50, 35, 60, 55, 80, 70, 80],
      fill: true,
      backgroundColor: 'rgba(52, 211, 153, 0.2)', // Verde suave
      borderColor: 'rgb(52, 211, 153)', // Verde
      tension: 0.3,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Permite que el gráfico se ajuste al contenedor
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#9CA3AF', // Texto de leyenda gris claro
      }
    },
    title: {
      display: false, // No necesitamos un título separado si ya tenemos uno en el HTML
    },
    tooltip: {
      backgroundColor: '#374151', // Fondo de tooltip oscuro
      titleColor: '#E5E7EB',
      bodyColor: '#D1D5DB',
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#9CA3AF', // Color de las etiquetas del eje X
      },
      grid: {
        color: '#374151', // Color de las líneas de la cuadrícula
      }
    },
    y: {
      ticks: {
        color: '#9CA3AF', // Color de las etiquetas del eje Y
      },
      grid: {
        color: '#374151', // Color de las líneas de la cuadrícula
      }
    },
  },
};

function DashboardPage() {
  return (
    // Ajustar el fondo del contenido principal del dashboard
    // bg-gray-900 para que coincida con el fondo general del Layout si es necesario
    // Pero el Layout ya suele dar el fondo, así que el 'space-y-6' es suficiente
    <div className="space-y-6 bg-gray-900 text-gray-100 min-h-screen"> 
      
      {/* Título Principal */}
      <h1 className="text-4xl font-extrabold text-white">Dashboard Principal</h1>
      <p className="text-xl text-indigo-400 mt-1">Visión general y métricas clave del CMS</p>
      
      <hr className="border-gray-700 mt-6" />

      {/* Área de Gráfico Principal */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
          <p className="text-lg font-semibold text-gray-300 mb-4">Tendencias de Engagement (Últimos 12 meses)</p>
          <div className="h-72"> {/* Aumentar un poco la altura para el gráfico */}
              <Line data={chartData} options={chartOptions} />
          </div>
      </div>
      
      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-400">Total Testimonios</p>
              <h3 className="text-3xl font-extrabold text-indigo-400 mt-1">2,540</h3>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-400">Tasa de Aprobación</p>
              <h3 className="text-3xl font-extrabold text-green-400 mt-1">92%</h3>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-400">Pendientes de Moderación</p>
              <h3 className="text-3xl font-extrabold text-yellow-400 mt-1">12</h3>
          </div>
      </div>

      {/* Enlace Home (Mantenido, con estilo correcto) */}
      <a href="/" className="inline-flex mt-8 items-center gap-3 px-4 py-3 text-indigo-400 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition border border-gray-700">
        Volver a Home Visitante
      </a>
    </div>
  );
}

export default DashboardPage;
