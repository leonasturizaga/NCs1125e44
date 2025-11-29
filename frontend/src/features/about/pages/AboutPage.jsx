// src/features/about/pages/AboutPage.jsx
import React from 'react';

// URL de la imagen de fondo para la página About
const ABOUT_BACKGROUND_URL = 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80';

// Secciones de Valor para el CMS
const valueSections = [
    { 
        title: "Prueba Social Centralizada", 
        description: "Recopilamos testimonios de múltiples fuentes (video, texto, imagen) y los organizamos en un único panel de control."
    },
    { 
        title: "Moderación de Calidad", 
        description: "Implementamos flujos de revisión por roles (Admin, Editor) para garantizar que solo el contenido verificado y de alto impacto se publique."
    },
    { 
        title: "Escalabilidad e Integración", 
        description: "Ofrecemos una API REST robusta y embeds sencillos para que puedas integrar los testimonios en cualquier sitio web o plataforma de terceros."
    }
];

function AboutPage() {
    return (
        // 1. Contenedor principal con la Imagen de Fondo
        <div 
            className="min-h-screen text-gray-100"
            style={{
                backgroundImage: `url(${ABOUT_BACKGROUND_URL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            {/* 2. Overlay Oscuro para asegurar la legibilidad del texto */}
            <div className="w-full h-full bg-black bg-opacity-70 py-16">
                
                {/* Contenido Centrado */}
                <div className="space-y-12">
                    
                    {/* Sección 1: Título y Misión */}
                    <section className="text-center max-w-4xl mx-auto px-4">
                        <h1 className="text-5xl font-extrabold text-white mb-4">
                            Impulsando la Credibilidad EdTech
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Construimos el CMS definitivo para transformar la voz de tu comunidad en tu herramienta de marketing más poderosa.
                        </p>
                    </section>

                    {/* Sección 2: El Valor Central (3 Columnas) */}
                    <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-700/50 px-4">
                        {valueSections.map((item, index) => (
                            // Las tarjetas internas deben seguir siendo oscuras (bg-gray-800)
                            <div key={index} className="bg-gray-800/80 p-6 rounded-xl shadow-2xl border border-indigo-500/50">
                                <h3 className="text-2xl font-bold text-indigo-400 mb-3">{item.title}</h3>
                                {/* 2. DESCRIPCIÓN JUSTIFICADA: Agregamos text-justify */}
                                <p className="text-gray-400 text-justify">{item.description}</p>
                            </div>
                        ))}
                    </section>

                    {/* Sección 3: Llamada a la Acción o Testimonios */}
                    <section className="text-center bg-gray-800/90 p-10 rounded-xl max-w-5xl mx-auto mt-12 border border-gray-700 px-4">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            ¿Listo para gestionar tu prueba social?
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Nuestro equipo está listo para ayudarte a integrar Testimonial CMS en tus flujos de trabajo.
                        </p>
                        <a 
                            href="/contact"
                            className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-xl text-lg"
                        >
                            Solicitar Demo Personalizada
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;