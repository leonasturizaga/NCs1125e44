/* eslint-disable no-irregular-whitespace */
/**
 * Extrae el ID de YouTube de una URL y construye la URL de embed segura.
 * @param {string} url - La URL de video de la base de datos.
 * @returns {{videoId: string | null, embedUrl: string | null, isYouTube: boolean}}
 */
export function getEmbedInfo(url) {
    if (!url) {
        return { videoId: null, embedUrl: null, isYouTube: false };
    }

    // Regex robusta para capturar el ID de YouTube (Shorts, watch, youtu.be, embed, etc.)
    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    
    const videoId = youtubeMatch ? youtubeMatch[1] : null;
    const isYouTube = youtubeMatch !== null;

    let embedUrl = null;
    if (videoId) {
        // Parámetros seguros: autoplay=0, rel=0, showinfo=0 para evitar bloqueos
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&rel=0&showinfo=0`;
    }

    return { videoId, embedUrl, isYouTube };
}