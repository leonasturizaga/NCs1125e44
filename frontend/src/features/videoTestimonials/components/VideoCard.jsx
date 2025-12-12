/* eslint-disable no-irregular-whitespace */
import React from "react";
import { getEmbedInfo } from "../../../utils/videoUtils"; 

export default function VideoCard({ video }) {
    // CORRECCIÓN: Definimos las variables de forma segura con un valor por defecto si es null
    const url = video.url || video.videourl || video.videoUrl || ''; // Aseguramos que sea una cadena vacía si es null
    const title = video.title || 'Título Desconocido';
    const description = video.description || '';

    // Si la URL es una cadena vacía (o null después de la comprobación), salimos del componente.
    if (!url) return null;

    // EXTRAEMOS LA INFO DEL UTILITY
    const { videoId, embedUrl, isYouTube } = getEmbedInfo(url); 

    // Si la URL es de YouTube pero no se pudo extraer el ID, muestra el error.
    if (isYouTube && !videoId) { 
        return (
            <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-2 text-gray-200">{title}</h3>
                <p className="text-red-500">
                    🛑 Error: URL de YouTube no es válida o está incompleta.
                </p>
            </div>
        );
    }
    
    // --- Renderizado Principal ---
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2 text-gray-200">{title}</h3>
            <div className="mb-2 video-embed-container">
                {videoId ? (
                    <iframe
                        width="100%"
                        height="180"
                        src={embedUrl} // URL limpia del utility
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg w-full h-44"
                      ></iframe>
                ) : url.endsWith(".mp4") || url.endsWith(".webm") ? ( // Usamos la variable 'url' simplificada
                    // Video local/Cloudinary
                    <video
                        src={url}
                        controls
                        className="w-full h-44 rounded-lg object-cover"
                    ></video>
                ) : (
                    // Fallback final
                    <p className="text-red-500">
                        URL inválida o no soportada para embeber.
                    </p>
                )}
            </div>
            {description && <p className="text-gray-400 text-sm">{description}</p>}
        </div>
    );
}