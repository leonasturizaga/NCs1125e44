import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
// Nota: NO usamos LayoutContext ni useAuth aquí, debe ser público.

export default function PublicVideoList() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // La URL se inyectará dinámicamente o se leerá de un entorno de producción
                // Aquí, asumimos que estamos en el mismo dominio o usamos una variable global
                const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/video-testimonials`;
                
                const res = await axios.get(apiUrl);
                
                const rawData = res.data.data || res.data;
                const data = Array.isArray(rawData) ? rawData : [];

                // Filtro: Solo videos con URL válida
                const filteredVideos = data.filter(v => v.url); 

                setVideos(filteredVideos);
                setFetchError(null);

            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setFetchError("No se pudieron cargar los testimonios. Servidor no disponible.");
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // 🎯 RENDERIZADO PÚBLICO
    return (
        <div style={{ padding: '20px', backgroundColor: '#1f2937', color: '#f3f4f6', minHeight: '100vh' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Testimonios de Clientes</h2>
            
            {loading && <p>Cargando videos...</p>}
            {fetchError && <p style={{ color: '#ef4444' }}>{fetchError}</p>}
            
            {!loading && !fetchError && videos.length === 0 && (
                <p>Aún no hay videos para mostrar.</p>
            )}

            <div className="grid grid-cols-1 gap-6">
                {videos.map(video => (
                    // NOTA: VideoCard debe ser un componente puro, sin dependencias del CMS
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}