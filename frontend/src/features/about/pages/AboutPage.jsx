// src/features/about/pages/AboutPage.jsx
import React from 'react';
// Importamos los íconos necesarios para la visualización de valor
import { Server, Zap, Users, Shield, TrendingUp, Code } from 'lucide-react'; 

// 🛑 ELIMINAMOS la constante ABOUT_BACKGROUND_URL

// Secciones de Valor para el CMS
const valueSections = [
    { 
        title: "Prueba Social Centralizada", 
        description: "Recopilamos testimonios de múltiples fuentes (video, texto, imagen) y los organizamos en un único panel de control.",
        Icon: Users, // Icono para comunidad/fuentes
    },
    { 
        title: "Moderación de Calidad", 
        description: "Implementamos flujos de revisión por roles (Admin, Editor) para garantizar que solo el contenido verificado y de alto impacto se publique.",
        Icon: Shield, // Icono para seguridad/moderación
    },
    { 
        title: "Escalabilidad e Integración", 
        description: "Ofrecemos una API REST robusta y embeds sencillos para que puedas integrar los testimonios en cualquier sitio web o plataforma de terceros.",
        Icon: Code, // Icono para integración/código
    }
];

function AboutPage() {
    return (
        // 1. Contenedor principal con fondo oscuro SOLIDO (bg-gray-900)
        <div className="min-h-screen bg-gray-900 text-gray-100 py-16 px-4">
            
            {/* 2. Contenido (Ya no necesitamos el overlay bg-black bg-opacity-70) */}
            <div className="max-w-6xl mx-auto">
                
                {/* Sección 1: Título y Misión */}
                <section className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="text-5xl font-extrabold text-white mb-4">
                        Impulsando la Credibilidad EdTech
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Construimos el CMS definitivo para transformar la voz de tu comunidad en tu herramienta de marketing más poderosa.
                    </p>
                </section>

                {/* Sección 2: El Valor Central (3 Columnas con Iconos) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-700/50">
                    {valueSections.map((item, index) => (
                        // Tarjeta Oscura, alineada con el estilo de Dashboard
                        <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-indigo-500/50">
                            
                            {/* 🛑 INTEGRACIÓN DEL ICONO: Acento Índigo */}
                            <item.Icon className="w-8 h-8 text-orange-400 mb-4" /> 
                            
                            {/* Título Centrado */}
                            <h3 className="text-2xl font-bold text-indigo-400 mb-3 text-center">{item.title}</h3>
                            
                            {/* Descripción Justificada */}
                            <p className="text-gray-400 text-justify">{item.description}</p>
                        </div>
                    ))}
                </section>

                {/* Sección 3: Llamada a la Acción (Footer) */}
                <section className="text-center bg-gray-800/90 p-10 rounded-xl max-w-5xl mx-auto mt-20 border border-gray-700">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        ¿Listo para gestionar tu prueba social?
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Nuestro equipo está listo para ayudarte a integrar Testimonial CMS en tus flujos de trabajo.
                    </p>
                    <a 
                        href="/contacto"
                        className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-xl text-lg"
                    >
                        Solicitar Demo Personalizada
                    </a>
                </section>

            </div>
        </div>
    );
}

export default AboutPage;