import React, { useState } from 'react';
import { Copy, Key, Code } from 'lucide-react';

export default function SettingsEmbeds() {
    // 1. Configuración de API Key y URL (Simulado para mostrar)
    // Usamos una clave SIMULADA, que en producción sería generada por el backend.
    const SIMULATED_API_KEY = "NC-CMS-KEY-0012345-VIDEO"; 
    
    // NOTA: La URL se construye con VITE_BACKEND_URL para el ambiente local
    // y apunta al endpoint GET de videos que creamos.
    const PUBLIC_API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/video-testimonials`;

    // 2. Lógica de Copia
    const [copied, setCopied] = useState(false);
    const [copiedIframe, setCopiedIframe] = useState(false);

    const handleCopy = (text, setter) => {
        navigator.clipboard.writeText(text);
        setter(true);
        setTimeout(() => setter(false), 2000);
    };

    // 3. Código de incrustación (iframe simple)
    const iframeCode = `
<iframe 
    id="nc-video-testimonials"
    src="${PUBLIC_API_URL}" 
    width="100%" 
    height="400" 
    frameborder="0" 
    allowfullscreen
    data-api-key="${SIMULATED_API_KEY}">
</iframe>
    `.trim();

    return (
        <section className="space-y-6">
            <h3 className="text-2xl font-bold text-indigo-300 flex items-center gap-2">
                <Code className="w-6 h-6"/> Integración y Embeds (API Pública)
            </h3>
            <p className="text-gray-400">
                Utiliza este código para incrustar la lista de videos en cualquier sitio web externo.
            </p>
            
            <hr className="border-gray-700" />

            {/* Generación y Copia del API Key */}
            <div className="space-y-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Key className="w-4 h-4 text-yellow-400"/> API Key (Clave Pública)
                </h4>
                <div className="flex bg-gray-700 p-3 rounded-lg items-center justify-between">
                    <code className="select-all font-mono text-sm text-yellow-400 break-all">
                        {SIMULATED_API_KEY}
                    </code>
                    <button 
                        type="button"
                        onClick={() => handleCopy(SIMULATED_API_KEY, setCopied)}
                        className="flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition ml-4">
                        <Copy className="w-4 h-4 mr-1" /> {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                </div>
                <p className="text-xs text-gray-500">
                    La URL del embed apunta a: <code className="text-indigo-400">{PUBLIC_API_URL}</code>
                </p>
            </div>

            {/* Generación del Código Iframe */}
            <div className="space-y-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Code className="w-4 h-4 text-indigo-400"/> Código de Incrustación (Iframe)
                </h4>
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto relative">
                    <pre>
                        <code className="text-green-300 font-mono text-xs whitespace-pre-wrap">
                            {iframeCode}
                        </code>
                    </pre>
                    <button 
                        type="button"
                        onClick={() => handleCopy(iframeCode, setCopiedIframe)}
                        className="absolute top-2 right-2 text-white/70 hover:text-white transition">
                        <Copy className="w-4 h-4 mr-1"/> {copiedIframe ? 'Copiado!' : 'Copiar'}
                    </button>
                </div>
            </div>
            
        </section>
    );
}