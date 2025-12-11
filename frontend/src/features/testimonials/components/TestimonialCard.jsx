//---------------- verion 4 small carousel función youtube ----------------
// src/features/testimonials/components/TestimonialCard.jsx
import { Edit2, Trash2, PlayCircle, X } from "lucide-react";
import { STATUS_CONFIG } from "@/constants/statusConfig";
import { useState, useEffect, useRef } from "react";

export default function TestimonialCard({
   testimonial,
   showActions = false,
   onEdit,
   onDelete,
}) {
   const statusConfig = STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.draft;
   const StatusIcon = statusConfig.Icon;

   const categories = (testimonial.categories || []).map((cat) => ({
      name: cat.name,
      config: STATUS_CONFIG[cat.name] || {
         Icon: null,
         badge: "badge-draft",
         label: cat.name,
      },
   }));

   const username = testimonial.user?.username || "Anónimo";
   const createdDate = new Date(testimonial.createdAt).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "2-digit",
   });

   const images = testimonial.images || [];
   const hasImage = images.length > 0;
   const hasVideo = !!testimonial.youtubeUrl;

   // Estados
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [autoPlay, setAutoPlay] = useState(false);
   const [showVideo, setShowVideo] = useState(false);
   const intervalRef = useRef(null);

   // Auto-play al hover
   useEffect(() => {
      if (!autoPlay || images.length <= 1) {
         if (intervalRef.current) clearInterval(intervalRef.current);
         return;
      }

      intervalRef.current = setInterval(() => {
         setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, 1500);

      return () => clearInterval(intervalRef.current);
   }, [autoPlay, images.length]);

   // MEJOR FUNCIÓN PARA EXTRAER ID DE YOUTUBE (100% fiable)
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
    } else if (parsed.pathname.startsWith("/embed/")) {
      id = parsed.pathname.split("/embed/")[1].split("?")[0];
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?/ ]{11})/i);
    return match ? match[1] : null;
  }
};

   const youtubeId = getYoutubeId(testimonial.youtubeUrl);

   return (
      <>
         <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl overflow-hidden group">

            {/* Carrusel de imágenes */}
            {hasImage && (
               <div 
                  className="relative h-40 bg-gray-900 overflow-hidden"
                  onMouseEnter={() => images.length > 1 && setAutoPlay(true)}
                  onMouseLeave={() => setAutoPlay(false)}
               >
                  <img
                     src={images[currentImageIndex].url}
                     alt={`${testimonial.title} - ${currentImageIndex + 1}`}
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />

                  {/* Indicadores */}
                  {images.length > 1 && (
                     <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                           <button
                              key={i}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setCurrentImageIndex(i);
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                 i === currentImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                              }`}
                           />
                        ))}
                     </div>
                  )}

{/* Ícono Play en imagen */}
{hasVideo && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setShowVideo(true);
    }}
    className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md p-3 rounded-full hover:bg-black/90 transition-all hover:scale-110 z-10"
    title="Reproducir video"
  >
    <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
  </button>
)}
               </div>
            )}

            {/* Sin imagen pero con video */}
{!hasImage && hasVideo && (
  <div 
    className="relative h-40 bg-gray-900 overflow-hidden cursor-pointer"
    onClick={() => setShowVideo(true)}
  >
    <img
      src={youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : "https://via.placeholder.com/800x450/333/fff?text=Video"}
      alt="Video thumbnail"
      className="w-full h-full object-cover brightness-75"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
    <div className="absolute inset-0 flex items-center justify-center">
      <PlayCircle className="w-16 h-16 text-white opacity-90 hover:opacity-100 transition" />
    </div>
  </div>
)}

            {/* Contenido principal (sin cambios) */}
            <div className={`p-6 ${hasImage || (!hasImage && hasVideo && youtubeId) ? "pt-4" : ""}`}>
               <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 pr-4">
                     <h3 className="text-lg font-semibold text-white line-clamp-2 leading-tight">
                        {testimonial.title}
                     </h3>
                     <p className="text-xs text-gray-400 mt-1">— {username}</p>
                  </div>
                  <span className={`badge ${statusConfig.badge} flex items-center gap-1.5 text-xs font-medium`}>
                     <StatusIcon className="w-4 h-4" />
                     {statusConfig.label}
                  </span>
               </div>

               <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-5">
                  {testimonial.description}
               </p>

               {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                     {categories.map((cat, index) => {
                        const Icon = cat.config.Icon;
                        return (
                           <span
                              key={index}
                              className={`badge ${cat.config.badge} text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium`}
                           >
                              {Icon && <Icon className="w-3.5 h-3.5" />}
                              {cat.config.label}
                           </span>
                        );
                     })}
                  </div>
               )}

               <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                     <span>{createdDate}</span>
                     {images.length > 1 && (
                        <span className="text-xs text-gray-400">
                           {currentImageIndex + 1}/{images.length}
                        </span>
                     )}
                  </div>

                  {showActions && (
                     <div className="flex gap-3">
                        <button onClick={() => onEdit(testimonial)} className="group relative p-2 rounded-lg hover:bg-gray-700 transition">
                           <Edit2 className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                           <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                              Editar
                           </span>
                        </button>
                        <button onClick={() => onDelete(testimonial)} className="group relative p-2 rounded-lg hover:bg-gray-700 transition">
                           <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                           <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                              Eliminar
                           </span>
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* POPUP DE VIDEO (solo si hay ID válido) */}
         {showVideo && youtubeId && (
            <div 
               className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
               onClick={() => setShowVideo(false)}
            >
               <div 
                  className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
                  onClick={e => e.stopPropagation()}
               >
                  <button
                     onClick={() => setShowVideo(false)}
                     className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-full backdrop-blur-sm transition"
                  >
                     <X className="w-6 h-6" />
                  </button>
                  <div className="aspect-video">
                     <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                        title="Video testimonio"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                     />
                  </div>
               </div>
            </div>
         )}
      </>
   );
}