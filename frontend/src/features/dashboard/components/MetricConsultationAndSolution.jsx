import { useState } from 'react';
import { Lightbulb, Settings, CornerDownRight } from 'lucide-react';

// Simulación de insights y soluciones basados en métricas generales
const getSolution = (metric) => {
    if (metric === 'conversionRate') {
        return {
            insight: "La Tasa de Aprobación de Testimonios está por debajo del 75%.",
            solution: "Implementar un filtro de calidad inicial en el formulario de envío y capacitar al equipo de moderación con criterios más estrictos para reducir el volumen de rechazos y mejorar la eficiencia."
        };
    }
    if (metric === 'negativeSentiment') {
        return {
            insight: "El porcentaje de Sentimiento Negativo es alto, especialmente para el producto 'Plataforma Web'.",
            solution: "Crear un flujo de alerta automática para el equipo de CX/Producto cuando se reciba un testimonio Negativo o un Rating de 1-2 estrellas para gestionar la crisis inmediatamente."
        };
    }
    if (metric === 'lowRevenueProduct') {
        return {
            insight: "El producto 'App Móvil' tiene un alto volumen de testimonios pero bajo Ingreso Atribuido.",
            solution: "Revisar la ubicación de los testimonios de App Móvil en las páginas de alto valor. Añadir 'call-to-action' directos (ej: 'Descargar Demo') junto a los testimonios más persuasivos."
        };
    }
    return {
        insight: "Selecciona una métrica para obtener un análisis rápido.",
        solution: "La implementación de soluciones basadas en IA es clave para la optimización de contenido. Empieza por definir tu métrica más crítica."
    };
};

/**
 * Componente interactivo para consulta rápida y sugerencia de solución.
 */
function MetricConsultationAndSolution({ approvalRate, avgRating, totalRevenue }) {
    const [selectedMetric, setSelectedMetric] = useState('none');
    const solution = getSolution(selectedMetric);

    // Métricas del dashboard (pasadas como props para la simulación)
    const metrics = [
        { key: 'conversionRate', label: `Tasa de Aprobación: ${approvalRate}`, insight: "Tasa de Aprobación" },
        { key: 'negativeSentiment', label: `Rating Promedio: ${avgRating} ★`, insight: "Salud del Rating" },
        { key: 'lowRevenueProduct', label: `Ingreso Atribuido Total: $${totalRevenue}`, insight: "ROI de Contenido" },
    ];

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border-2 border-indigo-600 h-full">
            <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Consulta de Métrica y Solución Rápida
            </h3>
            <p className="text-gray-400 mb-4">
                Selecciona una métrica clave para obtener un análisis y una sugerencia de acción inmediata.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
                {metrics.map((m) => (
                    <button
                        key={m.key}
                        onClick={() => setSelectedMetric(m.key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                            ${selectedMetric === m.key 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            {selectedMetric !== 'none' && (
                <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg space-y-3">
                    <p className="text-green-400 font-semibold flex items-center">
                        <CornerDownRight className="w-4 h-4 mr-2" />
                        Insight Clave:
                    </p>
                    <p className="text-white ml-6">{solution.insight}</p>
                    
                    <p className="text-red-400 font-semibold flex items-center pt-2">
                        <Settings className="w-4 h-4 mr-2" />
                        Solución Recomendada:
                    </p>
                    <p className="text-white ml-6 italic">{solution.solution}</p>
                </div>
            )}
        </div>
    );
}

export default MetricConsultationAndSolution;