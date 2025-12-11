import { useEffect, useState } from "react";

export default function VideoTestimonialsList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/video-testimonials`)
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error("Error cargando videos:", err));
  }, []);

  // Extrae ID desde cualquier tipo de URL de YouTube (normal o Shorts)
  const extractYouTubeId = (url) => {
    if (!url) return null;

    // Shorts
    if (url.includes("/shorts/")) {
      return url.split("/shorts/")[1].split("?")[0];
    }

    // watch?v=
    const match = url.match(/v=([^&]+)/);
    if (match) return match[1];

    // youtu.be
    if (url.includes("youtu.be")) {
      return url.split("youtu.be/")[1].split("?")[0];
    }

    return null;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Testimonios de Video</h1>

      <a
        href="/video-testimonials/create"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Nuevo Testimonio
      </a>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map(video => {
          const isYouTube = video.type === "youtube";
          const youtubeId = isYouTube ? extractYouTubeId(video.videoUrl) : null;

          return (
            <div key={video.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{video.title}</h2>

              {isYouTube && youtubeId ? (
                <iframe
                  className="w-full h-64"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  allowFullScreen
                />
              ) : (
                <video
                  className="w-full h-64"
                  src={`${import.meta.env.VITE_BACKEND_URL}${video.videoUrl}`}
                  controls
                />
              )}

              <p className="text-sm text-gray-600 mt-2">
                {video.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
