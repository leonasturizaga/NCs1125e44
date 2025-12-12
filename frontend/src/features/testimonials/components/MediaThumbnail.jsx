// src/components/MediaThumbnail.jsx
import { Play, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import TestimonialCMSicon from '@/assets/TestimonialCMSicon.svg';

const getYoutubeId = (url) => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/shorts/")[1].split("?")[0];
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1).split("?")[0];
    if (parsed.searchParams.has("v")) return parsed.searchParams.get("v");
    if (parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/embed/")[1].split("?")[0];
  } catch {}
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

export default function MediaThumbnail({ images = [], youtubeUrl }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [thumbError, setThumbError] = useState(false); // <--- NEW
  const intervalRef = useRef(null);

  const youtubeId = getYoutubeId(youtubeUrl);
  const hasVideo = !!youtubeId;
  const hasMultiple = images.length > 1;

  // Auto-carrusel al hover
  useEffect(() => {
    if (!isHovered || !hasMultiple) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, hasMultiple, images.length]);

  // ------------------------------------------------------------------
  // DECISION: WHAT IMAGE TO DISPLAY IN THE 48x48 TABLE CELL
  // ------------------------------------------------------------------

  let thumbnailSrc = TestimonialCMSicon; // default fallback

  if (images.length > 0) {
    // If there are real images → always use them
    thumbnailSrc = images[currentIdx].url;
  } else if (hasVideo && youtubeId && !thumbError) {
    // Try YouTube thumbnail first, fallback only if error occurs
    thumbnailSrc = `https://img.youtube.com/vi/${youtubeId}/default.jpg`;
  }

  // ------------------------------------------------------------------

  if (!images.length && !hasVideo) {
    return (
      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-600 flex items-center justify-center">
        <img src={TestimonialCMSicon} alt="fallback" className="w-10 h-10 opacity-80" />
      </div>
    );
  }

  return (
    <>
      <div
        className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-600 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen actual o fallback */}
        <img
          src={thumbnailSrc}
          alt="thumb"
          onError={() => setThumbError(true)} // <--- fallback trigger
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Contador si hay múltiples */}
        {hasMultiple && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[9px] text-white text-center font-medium">
            {currentIdx + 1}/{images.length}
          </div>
        )}

        {/* Ícono de video pequeño */}
        {hasVideo && (
          <div className="absolute top-1 right-1 bg-black/30 p-1 rounded">
            <Play className="w-2 h-2 text-white fill-white" />
          </div>
        )}

        {/* Overlay al hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (hasVideo) setShowVideo(true);
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {hasVideo && (
            <Play className="w-6 h-6 text-white fill-white drop-shadow-lg" />
          )}
        </button>
      </div>

      {/* POPUP DE VIDEO (autoplay) */}
      {showVideo && youtubeId && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="relative max-w-3xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title="Video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}