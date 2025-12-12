import { useState, useEffect } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { useLayout } from "../../../context/LayoutContext";

export default function VideoTestimonialsPage() {
  const { setCurrentPage } = useLayout();
  const [videos, setVideos] = useState([]);

  const fetchVideos = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/video-testimonials`)
      .then(res => setVideos(res.data.data))
      .catch(err => console.error("Error cargando videos:", err));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Testimonios en Video</h2>
        <button
          onClick={() => setCurrentPage("videoTestimonialsCreate")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Nuevo Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.length === 0 && <p className="text-gray-500">No hay videos cargados.</p>}
        {videos.map(video => <VideoCard key={video.id} video={video} />)}
      </div>
    </div>
  );
}
