import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react'; // Iconos

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario de contacto enviado:', formData);
        alert('Mensaje enviado. ¡Gracias por contactarnos!');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        // Contenedor Principal: Fondo oscuro, centrado, coherente con Login/About
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-16">
            
            {/* Tarjeta Central del Formulario */}
            <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
                
                <h2 className="text-3xl font-extrabold text-white text-center mb-2">
                    Solicita tu Demo o Soporte
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    Te responderemos en menos de 24 horas.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Campo Nombre */}
                    <div>
                        <label htmlFor="name" className="label text-gray-300 sr-only">Nombre</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Tu Nombre Completo"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                // Input Oscuro
                                className="w-full pl-12 pr-5 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Campo Email */}
                    <div>
                        <label htmlFor="email" className="label text-gray-300 sr-only">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Correo Electrónico de Contacto"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-5 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Campo Mensaje */}
                    <div>
                        <label htmlFor="message" className="label text-gray-300 sr-only">Mensaje</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-5 text-gray-500 w-5 h-5" />
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Describe tu solicitud (Demo, Soporte, Socios)"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-5 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>

                    {/* Botón de Enviar: Acento Índigo */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg flex items-center justify-center gap-2 mt-6"
                    >
                        <Send className="w-5 h-5" />
                        Enviar Solicitud
                    </button>
                </form>
                
            </div>
        </div>
    );
}