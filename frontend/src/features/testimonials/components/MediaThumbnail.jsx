// // src/components/MediaThumbnail.jsx
// import { Play } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import placeholder from '@/assets/TestimonialCMSicon.svg';

// const getYoutubeId = (url) => {
//   if (!url) return null;
//   try {
//     const parsed = new URL(url);
//     let id = null;
//     if (parsed.pathname.startsWith("/shorts/")) {
//       id = parsed.pathname.split("/shorts/")[1].split("?")[0];
//     } else if (parsed.hostname === "youtu.be") {
//       id = parsed.pathname.slice(1).split("?")[0];
//     } else if (parsed.searchParams.has("v")) {
//       id = parsed.searchParams.get("v");
//     }
//     return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
//   } catch {
//     return null;
//   }
// };

//   // EXTRAER ID DE YOUTUBE (100% fiable) FROM TestimonialCard.jsx
// //   const getYoutubeId = (url) => {
// //     if (!url) return null;
// //     try {
// //       const parsed = new URL(url);
// //       let id = null;
// //       if (parsed.pathname.startsWith("/shorts/")) {
// //         id = parsed.pathname.split("/shorts/")[1].split("?")[0];
// //       } else if (parsed.hostname === "youtu.be") {
// //         id = parsed.pathname.slice(1).split("?")[0];
// //       } else if (parsed.searchParams.has("v")) {
// //         id = parsed.searchParams.get("v");
// //       } else if (parsed.pathname.startsWith("/embed/")) {
// //         id = parsed.pathname.split("/embed/")[1].split("?")[0];
// //       }
// //       return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
// //     } catch {
// //       const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
// //       return match ? match[1] : null;
// //     }
// //   };


// export default function MediaThumbnail({ images = [], youtubeUrl }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const intervalRef = useRef(null);

//   const youtubeId = getYoutubeId(youtubeUrl);
//   const isValidVideo = !!youtubeId;
//   const hasMultipleImages = images.length > 1;

//   // Carrusel automático al hover
//   useEffect(() => {
//     if (!isHovered || !hasMultipleImages) {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       return;
//     }
//     intervalRef.current = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 1500);
//     return () => clearInterval(intervalRef.current);
//   }, [isHovered, hasMultipleImages, images.length]);

//   // 1. Varias imágenes → carrusel
//   if (hasMultipleImages) {
//     return (
//       <div
//         className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-600 cursor-pointer"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <img
//           src={images[currentIndex].url}
//           alt="testimonio"
//           className="w-full h-full object-cover"
//           onError={(e) => (e.target.src = `"${placeholder}"` )}
//         />
//         {/* Contador pequeño */}
//         <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[9px] text-white text-center font-medium">
//           {currentIndex + 1}/{images.length}
//         </div>
//       </div>
//     );
//   }

//   // 2. Una sola imagen
//   if (images.length === 1) {
//     return (
//       <img
//         src={images[0].url}
//         alt="testimonio"
//         className="w-12 h-12 rounded-lg object-cover border border-gray-600"
//         onError={(e) => (e.target.src = `"${placeholder}"` )}
//       />
//     );
//   }

//   // 3. Video válido
//   if (isValidVideo) {
//     return (
//       <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-600">
//         <img
//           src={`https://img.youtube.com/vi/${youtubeId}/default.jpg`}
//           alt="video"
//           className="w-full h-full object-cover"
//           onError={(e) => (e.target.src = `"${placeholder}"` )}
//         />
//         <div className="absolute  inset-0 bg-black/40 flex items-center justify-center">
//           <Play className="w-2 h-2  text-white fill-white" />
//         </div>
//       </div>
//     );
//   }

//   // 4. Nada → tu logo
//   return (
//     <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
//       <img src={`${placeholder}`}  alt="sin media" className="w-10 h-10 opacity-70" />
//     </div>
//   );
// }

// // src/components/MediaThumbnail.jsx
// import { PlayCircle } from "lucide-react";
// import { useState } from "react";

// const getYoutubeId = (url) => {
//   if (!url) return null;
//   try {
//     const parsed = new URL(url);
//     let id = null;
//     if (parsed.pathname.startsWith("/shorts/")) {
//       id = parsed.pathname.split("/shorts/")[1].split("?")[0];
//     } else if (parsed.hostname === "youtu.be") {
//       id = parsed.pathname.slice(1).split("?")[0];
//     } else if (parsed.searchParams.has("v")) {
//       id = parsed.searchParams.get("v");
//     }
//     return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
//   } catch {
//     return null;
//   }
// };

// export default function MediaThumbnail({ images = [], youtubeUrl }) {
//   const [showVideo, setShowVideo] = useState(false);
//   const youtubeId = getYoutubeId(youtubeUrl);
//   const isValidVideo = !!youtubeId;
//   const hasImage = images.length > 0;

//   // 1. Imagen real
//   if (hasImage) {
//     return (
//       <img
//         src={images[0].url}
//         alt="testimonio"
//         className="w-12 h-12 rounded-lg object-cover border border-gray-600"
//         onError={(e) => (e.target.src = "/src/assets/TestimonialCMSicon.svg")}
//       />
//     );
//   }

//   // 2. Video válido → thumbnail + botón de play
//   if (isValidVideo) {
//     return (
//       <>
//         <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-600 cursor-pointer group">
//           <img
//             src={`https://img.youtube.com/vi/${youtubeId}/default.jpg`}
//             alt="video"
//             className="w-full h-full object-cover"
//             onError={(e) => (e.target.src = "/src/assets/TestimonialCMSicon.svg")}
//           />
//           {/* Botón de play visible al hover */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowVideo(true);
//             }}
//             className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
//             title="Reproducir video"
//           >
//             <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
//           </button>
//         </div>

//         {/* Popup de video */}
//         {showVideo && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setShowVideo(false)}>
//             <div className="relative max-w-3xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
//               <button
//                 onClick={() => setShowVideo(false)}
//                 className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-full backdrop-blur-sm transition"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//               <div className="aspect-video">
//                 <iframe
//                   src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
//                   title="Video"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   className="w-full h-full"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }

//   // 3. Nada → tu logo
//   return (
//     <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
//       <img src="/src/assets/TestimonialCMSicon.svg" alt="sin media" className="w-10 h-10 opacity-70" />
//     </div>
//   );
// }


//--------------- 3
//-------------- version 2 -----------------
// src/components/MediaThumbnail.jsx
import { Play, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

  if (!images.length && !hasVideo) {
    return <div className="w-12 h-12 bg-gray-200 border-2 border-dashed rounded-lg" />;
  }

  return (
    <>
      <div
        className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-600 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen actual */}
        <img
          src={images.length > 0 ? images[currentIdx].url : `https://img.youtube.com/vi/${youtubeId}/default.jpg`}
          alt="thumb"
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Contador si hay múltiples */}
        {hasMultiple && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[9px] text-white text-center font-medium">
            {currentIdx + 1}/{images.length}
          </div>
        )}

        {/* Ícono de video pequeño (solo triángulo) */}
        {hasVideo && (
          <div className="absolute top-1 right-1 bg-black/30 p-1 rounded">
            <Play className="w-2 h-2 text-white fill-white" />
          </div>
        )}

        {/* Overlay al hover + play grande */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (hasVideo) setShowVideo(true);
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {hasVideo && <Play className="absolute top-2 right-2 bg-black/70 w-2 h-2 text-white fill-white drop-shadow-lg" />}
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