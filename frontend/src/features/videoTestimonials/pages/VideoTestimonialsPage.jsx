/* eslint-disable no-irregular-whitespace */
import { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import VideoCard from "../components/VideoCard";
import { useLayout } from "../../../context/LayoutContext";

export default function VideoTestimonialsPage() {
  const { setCurrentPage } = useLayout();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null); 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/video-testimonials`;
        const res = await axios.get(apiUrl);

        // 1. EXTRACCIÓN ROBUSTA DE DATOS
        const rawData = res.data.data || res.data;
        const data = Array.isArray(rawData) ? rawData : [];

        // 2. FILTRO FINAL: Acepta solo si 'url' existe y no es nulo/vacío
        const filteredVideos = data.filter(v => v.url); 
        
        console.log("--- VIDEOS ENCONTRADOS ---:", filteredVideos.length);

        setVideos(filteredVideos);
        setFetchError(null);
        
      } catch (err) {
        console.error("❌ ERROR DE CONEXIÓN/SERVIDOR:", err);
        setFetchError("Error al cargar videos. Verifica el backend y ngrok.");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="space-y-6">
      {/* Título + Botón Crear */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Testimonios en Video
        </h2>
        <button
          onClick={() => setCurrentPage("videoTestimonialsCreate")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <FiPlus className="w-5 h-5" />
          Nuevo Video
        </button>
      </div>

      {/* Grid de Videos */}
      {loading ? (
        <p className="text-gray-500">Cargando videos...</p>
      ) : fetchError ? (
         <p className="text-red-500 font-medium">{fetchError}</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-500">No hay videos cargados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}