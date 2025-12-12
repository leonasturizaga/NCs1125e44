// src/components/MediaThumbnail.jsx
import { Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const getYoutubeId = (url) => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    let id = null;
    if (parsed.pathname.startsWith("/shorts/")) {
      id = parsed.pathname.split("/shorts/")[1].split("?")[0];
    } else if (parsed.hostname === "youtu.be") {
      id = parsed.pathname.slice(1).split("?")[0];
    } else if (parsed.searchParams.has("v")) {
      id = parsed.searchParams.get("v");
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
};

export default function MediaThumbnail({ images = [], youtubeUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const youtubeId = getYoutubeId(youtubeUrl);
  const isValidVideo = !!youtubeId;
  const hasMultipleImages = images.length > 1;

  // Carrusel automático al hover
  useEffect(() => {
    if (!isHovered || !hasMultipleImages) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, hasMultipleImages, images.length]);

  // 1. Varias imágenes → carrusel
  if (hasMultipleImages) {
    return (
      <div
        className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-600 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={images[currentIndex].url}
          alt="testimonio"
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/src/assets/TestimonialCMSicon.svg")}
        />
        {/* Contador pequeño */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[9px] text-white text-center font-medium">
          {currentIndex + 1}/{images.length}
        </div>
      </div>
    );
  }

  // 2. Una sola imagen
  if (images.length === 1) {
    return (
      <img
        src={images[0].url}
        alt="testimonio"
        className="w-12 h-12 rounded-lg object-cover border border-gray-600"
        onError={(e) => (e.target.src = "/src/assets/TestimonialCMSicon.svg")}
      />
    );
  }

  // 3. Video válido
  if (isValidVideo) {
    return (
      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-600">
        <img
          src={`https://img.youtube.com/vi/${youtubeId}/default.jpg`}
          alt="video"
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/src/assets/TestimonialCMSicon.svg")}
        />
        <div className="absolute  inset-0 bg-black/40 flex items-center justify-center">
          <Play className="w-2 h-2  text-white fill-white" />
        </div>
      </div>
    );
  }

  // 4. Nada → tu logo
  return (
    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
      <img src="/src/assets/TestimonialCMSicon.svg" alt="sin media" className="w-10 h-10 opacity-70" />
    </div>
  );
}