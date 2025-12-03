// src/features/home/HomeVisitante.jsx

import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
// Íconos de Lucide
import { BarChart, Shield, Zap, TrendingUp, Layers } from 'lucide-react'; // Eliminamos Mail si no se usa
import VisitorMenu from '../../shared/components/VisitorMenu'; // 💡 IMPORTACIÓN CORRECTA DEL MENÚ

// =================================================================
// 🛑 DEFINICIÓN DE FEATURES (TOP LEVEL)
// =================================================================
const virtueFeatures = [
    { 
        icon: TrendingUp, 
        title: "Escala tus Ventas con 1 Clic", 
        description: "Implementa tu widget de testimonios dinámico en cualquier Landing Page o sitio web en segundos.",
        color: 'text-indigo-400'
    },
    { 
        icon: BarChart, 
        title: "Decisiones Basadas en Datos", 
        description: "Obtén analíticas de engagement en tiempo real para saber qué historias convierten mejor desde el dashboard.",
        color: 'text-green-400'
    },
    { 
        icon: Layers, 
        title: "Máxima Credibilidad y Moderación", 
        description: "Controla la curación y aprueba solo las narrativas que validan tu marca. Adiós a los testimonios de baja calidad.",
        color: 'text-red-400'
    }
];
// =================================================================


function HomeVisitante() {
    // 💡 ESTADO DEL MENÚ RESTAURADO
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const HERO_ILLUSTRATION = 'https://embedsocial.com/wp-content/uploads/2025/07/instagram-social-media-listening-tool.png'; 
    
    // Función para alternar la visibilidad del menú
    const handleMenuToggle = () => {
        setIsMenuOpen(prev => !prev);
    };


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            
            {/* HEADER PÚBLICO (CON LÓGICA DE DROPDOWN) */}
            <header className="p-4 md:px-12 border-b border-gray-700 flex justify-between items-center bg-gray-800 shadow-md relative z-40">
                
                {/* 1. Logo/Marca - TOGGLE DEL MENÚ */}
                <button 
                    onClick={handleMenuToggle} 
                    // 🛑 USAMOS EL BOTÓN PARA EL TOGGLE Y LO MOSTRAMOS EN PANTALLAS PEQUEÑAS
                    className="sm:inline-block text-2xl font-extrabold text-white tracking-tight hover:text-indigo-400 transition cursor-pointer"
                >
                    Testimonial CMS
                </button>
                
                {/* 2. Botón de Login (Visible solo en pantallas grandes) */}
                <Link 
                    to="/login" 
                    className="hidden sm:inline-block px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md"
                >
                    Empieza a recopilar Testimonios Gratis
                </Link>

                {/* 3. MENÚ DESPLEGABLE (Se renderiza si isMenuOpen es true) */}
                {isMenuOpen && (
                    <div 
                        // 🛑 POSICIONAMIENTO EN LA ESQUINA SUPERIOR izquierda (mejor para móviles)
                        className="absolute top-full left-9 mt-6 mr-4"
                    >
                        {/* 🛑 COMPONENTE DEL MENÚ QUE CONTIENE LOS ENLACES PÚBLICOS */}
                        <VisitorMenu onClose={handleMenuToggle} /> 
                    </div>
                )}
            </header>

            {/* SECCIÓN PRINCIPAL HERO */}
            <main className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    
                    {/* Lado Derecho: TEXTO CONVINCENTE */}
                    <div className="text-center md:text-left order-1 md:order-2 self-center"> 
                        <p className="text-indigo-400 text-base font-semibold uppercase mb-3 tracking-widest">
                            PRUEBA SOCIAL PARA LA ERA EDTECH
                        </p>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                            <p>Atestigua tu Marca</p> <p>Multiplica las Ventas</p> 
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-xl md:max-w-none text-justify">
                            Cansado de testimonios dispersos? Centraliza, modera y publica narrativas de alto impacto. Tu crecimiento ya no es una historia, es una métrica.
                            
                        </p>
                        {/* Línea de Compromiso */}
                        <p className="text-gray-400 text-3xl font-bold">
                            <strong>Te ayudamos a obtener resultados</strong>
                        </p><br></br><br></br>
                        
                        {/* CTA Principal */}
                        <Link to="/register" 
                            className="px-10 py-3 bg-indigo-600 text-white text-xl font-semibold rounded-lg shadow-2xl hover:bg-indigo-700 transition duration-300 mb-3"
                        >
                            Unite Ahora 
                        </Link>
                        
                    </div>

                    {/* Lado Izquierdo: IMAGEN */}
                    <div className="flex justify-center md:justify-start order-2 md:order-1">
                        <img 
                            src={HERO_ILLUSTRATION}
                            alt="Ilustración de gestión de testimonios" 
                            className="max-w-xl w-full h-auto rounded-3xl shadow-2xl border border-gray-700 bg-gray-800 p-1 transform hover:scale-105 transition-transform duration-300" 
                        />
                    </div>
                </div>

                {/* SECCIÓN 2: VIRTUDES CLAVE - El bloque donde estaba el error */}
                <section className="mt-3 pt-16 border-t border-gray-800/50">
                    <h2 className="text-4xl font-bold text-center text-white mb-12">
                        ¿Por qué el Testimonial CMS es esencial para tu crecimiento?
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {virtueFeatures.map((feature, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
                                <feature.icon className={`w-8 h-8 mb-4 ${feature.color}`} />
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* SECCIÓN 3: CTA Final / Dashboard Preview */}
                <section className="text-center pt-20 pb-10">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Diseño Intuitivo, Decisiones Certeras.
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                        Nuestro dashboard te permite visualizar métricas clave de engagement de forma práctica y agradable, traduciendo historias en datos de ventas.
                    </p>
                    <Link to="/register" className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition shadow-lg text-lg">
                        Ver Dashboard en Acción
                    </Link>
                </section>

            </main>
            
        </div>
    );
}

export default HomeVisitante;