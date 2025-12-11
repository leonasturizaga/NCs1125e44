//-------------- version con categorias ----------------
// // src/features/testimonials/components/TestimonialCard.jsx

// import { Edit2, Trash2 } from "lucide-react";
// import { STATUS_CONFIG } from "@/constants/statusConfig";

// export default function TestimonialCard({
//   testimonial,
//   showActions = false,
//   onEdit,
//   onDelete,
// }) {
//   const statusConfig = STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.draft;
//   const StatusIcon = statusConfig.Icon;

//   // Categorías con su config (ícono + color)
//   const categories = (testimonial.categories || []).map((cat) => ({
//     name: cat.name,
//     config: STATUS_CONFIG[cat.name] || { Icon: null, badge: "badge-draft", label: cat.name },
//   }));

//   const username = testimonial.user?.username || "Anónimo";
//   const createdDate = new Date(testimonial.createdAt).toLocaleDateString("es-ES", {
//     day: "numeric",
//     month: "short",
//     year: "2-digit",
//   });

//   return (
//     <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
//       {/* Header: Título + Estado */}
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex-1 pr-4">
//           <h3 className="text-lg font-semibold text-white line-clamp-2 leading-tight">
//             {testimonial.title}
//           </h3>
//           <p className="text-xs text-gray-400 mt-1">— {username}</p>
//         </div>

//         {/* Badge de estado (solo uno, arriba a la derecha) */}
//         <span className={`badge ${statusConfig.badge} flex items-center gap-1.5 text-xs font-medium`}>
//           <StatusIcon className="w-4 h-4" />
//           {statusConfig.label}
//         </span>
//       </div>

//       {/* Descripción */}
//       <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-5">
//         {testimonial.description}
//       </p>

//       {/* Categorías como badges con íconos */}
//       {categories.length > 0 && (
//         <div className="flex flex-wrap gap-2 mb-4">
//           {categories.map((cat, index) => {
//             const Icon = cat.config.Icon;
//             return (
//               <span
//                 key={index}
//                 className={`badge ${cat.config.badge} text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium`}
//               >
//                 {Icon && <Icon className="w-3.5 h-3.5" />}
//                 {cat.config.label}
//               </span>
//             );
//           })}
//         </div>
//       )}

//       {/* Footer: Fecha + Acciones */}
//       <div className="flex justify-between items-center pt-4 border-t border-gray-700">
//         <span className="text-xs text-gray-500">
//           {createdDate}
//         </span>

//         {showActions && (
//           <div className="flex gap-3">
//             <button
//               onClick={() => onEdit(testimonial)}
//               className="group relative p-2 rounded-lg hover:bg-gray-700 transition"
//               aria-label="Editar"
//             >
//               <Edit2 className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
//               <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                 Editar
//               </span>
//             </button>

//             <button
//               onClick={() => onDelete(testimonial)}
//               className="group relative p-2 rounded-lg hover:bg-gray-700 transition"
//               aria-label="Eliminar"
//             >
//               <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
//               <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                 Eliminar
//               </span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//-------------- version 2 categorias, imagen y video popup ----------------
// src/features/testimonials/components/TestimonialCard.jsx
// import { Edit2, Trash2, PlayCircle, X } from "lucide-react";
// import { STATUS_CONFIG } from "@/constants/statusConfig";
// import { useState } from "react";

// export default function TestimonialCard({
//   testimonial,
//   showActions = false,
//   onEdit,
//   onDelete,
// }) {
//   const statusConfig = STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.draft;
//   const StatusIcon = statusConfig.Icon;

//   const categories = (testimonial.categories || []).map((cat) => ({
//     name: cat.name,
//     config: STATUS_CONFIG[cat.name] || { Icon: null, badge: "badge-draft", label: cat.name },
//   }));

//   const username = testimonial.user?.username || "Anónimo";
//   const createdDate = new Date(testimonial.createdAt).toLocaleDateString("es-ES", {
//     day: "numeric",
//     month: "short",
//     year: "2-digit",
//   });

//   const hasImage = testimonial.images && testimonial.images.length > 0;
//   const firstImage = hasImage ? testimonial.images[0].url : null;
//   const hasVideo = !!testimonial.youtubeUrl;

//   // Estado para el popup
//   const [videoPopup, setVideoPopup] = useState(false);

//   // Extraer ID de YouTube
//   const getYoutubeId = (url) => {
//     if (!url) return null;
//     const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
//     return match ? match[1] : null;
//   };
//   const youtubeId = getYoutubeId(testimonial.youtubeUrl);

//   return (
//     <>
//       <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl overflow-hidden group">

//         {/* Imagen o thumbnail de video */}
//         {(hasImage || (hasVideo && !hasImage)) && (
//           <div className="relative h-40 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => hasVideo && setVideoPopup(true)}>
//             <img
//               src={hasImage ? firstImage : `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
//               alt={testimonial.title}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-90"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />

//             {/* Ícono Play grande y blanco */}
//             {hasVideo && (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="bg-black/60 backdrop-blur-sm p-4 rounded-full hover:bg-black/80 transition-all hover:scale-110">
//                   <PlayCircle className="w-14 h-14 text-white drop-shadow-2xl" />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Contenido */}
//         <div className={`p-6 ${hasImage || (hasVideo && !hasImage) ? "pt-4" : ""}`}>
//           <div className="flex justify-between items-start mb-4">
//             <div className="flex-1 pr-4">
//               <h3 className="text-lg font-semibold text-white line-clamp-2 leading-tight">
//                 {testimonial.title}
//               </h3>
//               <p className="text-xs text-gray-400 mt-1">— {username}</p>
//             </div>
//             <span className={`badge ${statusConfig.badge} flex items-center gap-1.5 text-xs font-medium`}>
//               <StatusIcon className="w-4 h-4" />
//               {statusConfig.label}
//             </span>
//           </div>

//           <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-5">
//             {testimonial.description}
//           </p>

//           {categories.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-4">
//               {categories.map((cat, index) => {
//                 const Icon = cat.config.Icon;
//                 return (
//                   <span
//                     key={index}
//                     className={`badge ${cat.config.badge} text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium`}
//                   >
//                     {Icon && <Icon className="w-3.5 h-3.5" />}
//                     {cat.config.label}
//                   </span>
//                 );
//               })}
//             </div>
//           )}

//           <div className="flex justify-between items-center pt-4 border-t border-gray-700">
//             <span className="text-xs text-gray-500">{createdDate}</span>

//             {showActions && (
//               <div className="flex gap-3">
//                 <button onClick={() => onEdit(testimonial)} className="group relative p-2 rounded-lg hover:bg-gray-700 transition">
//                   <Edit2 className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
//                   <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                     Editar
//                   </span>
//                 </button>
//                 <button onClick={() => onDelete(testimonial)} className="group relative p-2 rounded-lg hover:bg-gray-700 transition">
//                   <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
//                   <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                     Eliminar
//                   </span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Popup de video (pequeño y centrado) */}
//       {videoPopup && youtubeId && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setVideoPopup(false)}>
//           <div className="relative max-w-2xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
//             <button
//               onClick={() => setVideoPopup(false)}
//               className="absolute top-3 right-3 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <div className="aspect-video">
//               <iframe
//                 src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
//                 title="Video testimonio"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-full"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

//-------------- version 1 categorias, imagen y video ----------------
// src/features/testimonials/components/TestimonialCard.jsx
// import { Edit2, Trash2, PlayCircle, Image as ImageIcon } from "lucide-react";
// import { STATUS_CONFIG } from "@/constants/statusConfig";

// export default function TestimonialCard({
//   testimonial,
//   showActions = false,
//   onEdit,
//   onDelete,
// }) {
//   const statusConfig = STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.draft;
//   const StatusIcon = statusConfig.Icon;

//   const categories = (testimonial.categories || []).map((cat) => ({
//     name: cat.name,
//     config: STATUS_CONFIG[cat.name] || { Icon: null, badge: "badge-draft", label: cat.name },
//   }));

//   const username = testimonial.user?.username || "Anónimo";
//   const createdDate = new Date(testimonial.createdAt).toLocaleDateString("es-ES", {
//     day: "numeric",
//     month: "short",
//     year: "2-digit",
//   });

//   const hasImage = testimonial.images && testimonial.images.length > 0;
//   const firstImage = hasImage ? testimonial.images[0].url : null;
//   const hasVideo = !!testimonial.youtubeUrl;

//   // Extraer ID del video de YouTube para embed
//   const getYoutubeId = (url) => {
//     if (!url) return null;
//     const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
//     return match ? match[1] : null;
//   };
//   const youtubeId = getYoutubeId(testimonial.youtubeUrl);

//   return (
//     <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl overflow-hidden group">

//       {/* Imagen destacada (más pequeña y elegante) */}
//       {hasImage && (
//         <div className="relative h-40 bg-gray-900 overflow-hidden"> {/* ← h-40 en vez de h-48 */}
//           <img
//             src={firstImage}
//             alt={testimonial.title}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />

//           {/* Ícono de video con color blanco y clickeable */}
//           {hasVideo && (
//             <button
//               onClick={() => window.open(testimonial.youtubeUrl, "_blank")}
//               className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md p-3 rounded-full hover:bg-black/90 transition-all hover:scale-110"
//               title="Reproducir video"
//             >
//               <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
//             </button>
//           )}
//         </div>
//       )}

//       {/* Si NO hay imagen pero SÍ hay video → mostramos thumbnail de YouTube */}
//       {!hasImage && hasVideo && youtubeId && (
//         <div className="relative h-40 bg-gray-900 overflow-hidden cursor-pointer" onClick={() => window.open(testimonial.youtubeUrl, "_blank")}>
//           <img
//             src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
//             alt="Video thumbnail"
//             className="w-full h-full object-cover brightness-75"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <PlayCircle className="w-16 h-16 text-white opacity-90 hover:opacity-100 transition" />
//           </div>
//         </div>
//       )}

//       {/* Contenido principal */}
//       <div className={`p-6 ${hasImage || (hasVideo && !hasImage) ? "pt-4" : ""}`}>
//         {/* Header */}
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex-1 pr-4">
//             <h3 className="text-lg font-semibold text-white line-clamp-2 leading-tight">
//               {testimonial.title}
//             </h3>
//             <p className="text-xs text-gray-400 mt-1">— {username}</p>
//           </div>
//           <span className={`badge ${statusConfig.badge} flex items-center gap-1.5 text-xs font-medium`}>
//             <StatusIcon className="w-4 h-4" />
//             {statusConfig.label}
//           </span>
//         </div>

//         {/* Descripción */}
//         <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-5">
//           {testimonial.description}
//         </p>

//         {/* Categorías */}
//         {categories.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-4">
//             {categories.map((cat, index) => {
//               const Icon = cat.config.Icon;
//               return (
//                 <span
//                   key={index}
//                   className={`badge ${cat.config.badge} text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium`}
//                 >
//                   {Icon && <Icon className="w-3.5 h-3.5" />}
//                   {cat.config.label}
//                 </span>
//               );
//             })}
//           </div>
//         )}

//         {/* Footer */}
//         <div className="flex justify-between items-center pt-4 border-t border-gray-700">
//           <div className="flex items-center gap-3 text-xs text-gray-500">
//             <span>{createdDate}</span>

//             {/* Indicadores si no hay imagen/video arriba */}
//             {!hasImage && !hasVideo && (
//               <>
//                 {hasImage && <ImageIcon className="w-4 h-4 text-blue-400" />}
//                 {hasVideo && <PlayCircle className="w-4 h-4 text-red-400" />}
//               </>
//             )}
//           </div>

//           {showActions && (
//             <div className="flex gap-3">
//               <button onClick={() => onEdit(testimonial)} className="group relative p-2 rounded-lg hover:bg-gray-700 transition">
//                 <Edit2 className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
//                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                   Editar
//                 </span>
//               </button>

//               <button onClick={() => onDelete(testimonial)} className="group relative p-2 rounded-lg hover:bg-gray-700 transition">
//                 <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
//                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                   Eliminar
//                 </span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//---------------- verion 3 small carousel ----------------
// src/features/testimonials/components/TestimonialCard.jsx
// import { Edit2, Trash2, PlayCircle, X } from "lucide-react";
// import { STATUS_CONFIG } from "@/constants/statusConfig";
// import { useState, useEffect, useRef } from "react";

// export default function TestimonialCard({
//    testimonial,
//    showActions = false,
//    onEdit,
//    onDelete,
// }) {
//    const statusConfig =
//       STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.draft;
//    const StatusIcon = statusConfig.Icon;

//    const categories = (testimonial.categories || []).map((cat) => ({
//       name: cat.name,
//       config: STATUS_CONFIG[cat.name] || {
//          Icon: null,
//          badge: "badge-draft",
//          label: cat.name,
//       },
//    }));

//    const username = testimonial.user?.username || "Anónimo";
//    const createdDate = new Date(testimonial.createdAt).toLocaleDateString(
//       "es-ES",
//       {
//          day: "numeric",
//          month: "short",
//          year: "2-digit",
//       }
//    );

//    const images = testimonial.images || [];
//    const hasImage = images.length > 0;
//    const hasVideo = !!testimonial.youtubeUrl;

//    // Estado para carrusel
//    const [currentImageIndex, setCurrentImageIndex] = useState(0);
// const [autoPlay, setAutoPlay] = useState(false);
//   const [showVideo, setShowVideo] = useState(false); 
//   const intervalRef = useRef(null);

//   // Auto-play al hover
//   useEffect(() => {
//     if (!autoPlay || images.length <= 1) {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       return;
//     }

//     intervalRef.current = setInterval(() => {
//       setCurrentImageIndex(prev => (prev + 1) % images.length);
//     }, 1500);

//     return () => clearInterval(intervalRef.current);
//   }, [autoPlay, images.length]);

//   // Extraer ID de YouTube
// const getYoutubeId = (url) => {
//       if (!url) return null;
//       try {
//          const parsed = new URL(url);
//          if (parsed.hostname.includes('youtu.be')) {
//             return parsed.pathname.slice(1);
//          }
//          if (parsed.hostname.includes('youtube.com')) {
//             return parsed.searchParams.get('v') || (parsed.pathname.match(/\/embed\/([^/?]+)/) || [])[1];
//          }
//       } catch {
//          // Si falla URL, intenta regex simple
//          const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
//          return match ? match[1] : null;
//       }
//       return null;
//    };

//   const youtubeId = getYoutubeId(testimonial.youtubeUrl);

//    return (
//       <>
//          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl overflow-hidden group">
//             {/* Mini carrusel de imágenes (solo si hay más de 1) */}
//             {hasImage && (
//                <div className="relative h-40 bg-gray-900 overflow-hidden">
//                   {/* Imagen actual */}
//                   <img
//                      src={images[currentImageIndex].url}
//                      alt={`${testimonial.title} - ${currentImageIndex + 1}`}
//                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />

//                   {/* Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />

//                   {/* Indicadores de imágenes */}
//                   {images.length > 1 && (
//                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
//                         {images.map((_, index) => (
//                            <button
//                               key={index}
//                               onClick={(e) => {
//                                  e.stopPropagation();
//                                  setCurrentImageIndex(index);
//                               }}
//                               className={`w-2 h-2 rounded-full transition-all ${
//                                  index === currentImageIndex
//                                     ? "bg-white w-6"
//                                     : "bg-white/50 hover:bg-white/80"
//                               }`}
//                               aria-label={`Imagen ${index + 1}`}
//                            />
//                         ))}
//                      </div>
//                   )}

//                   {/* Ícono de video */}
//                   {/* video on new tab */}
//                   {/* {hasVideo && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 window.open(testimonial.youtubeUrl, "_blank");
//               }}
//               className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md p-3 rounded-full hover:bg-black/90 transition-all hover:scale-110"
//               title="Reproducir video"
//             >
//               <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
//             </button>
//           )} */}
//                   {/* video popup */}
//                   {hasVideo && (
//                      <button
//                         onClick={(e) => {
//                            e.stopPropagation();
//                            setShowVideo(true);
//                         }}
//                         className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md p-3 rounded-full hover:bg-black/90 transition-all hover:scale-110 z-10"
//                         title="Reproducir video">
//                         <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
//                      </button>
//                   )}
//                </div>
//             )}

//             {/* Si NO hay imagen pero SÍ hay video → thumbnail de YouTube */}
//             {!hasImage && hasVideo && (
//                <div
//                   className="relative h-40 bg-gray-900 overflow-hidden cursor-pointer"
//                   onClick={() => window.open(testimonial.youtubeUrl, "_blank")}>
//                   <img
//                      src={`https://img.youtube.com/vi/${
//                         testimonial.youtubeUrl.match(
//                            /(?:v=|\/)([\w-]{11})/
//                         )?.[1]
//                      }/maxresdefault.jpg`}
//                      alt="Video thumbnail"
//                      className="w-full h-full object-cover brightness-75"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                      <PlayCircle className="w-16 h-16 text-white opacity-90" />
//                   </div>
//                </div>
//             )}

//             {/* Contenido principal */}
//             <div
//                className={`p-6 ${
//                   hasImage || (!hasImage && hasVideo) ? "pt-4" : ""
//                }`}>
//                <div className="flex justify-between items-start mb-4">
//                   <div className="flex-1 pr-4">
//                      <h3 className="text-lg font-semibold text-white line-clamp-2 leading-tight">
//                         {testimonial.title}
//                      </h3>
//                      <p className="text-xs text-gray-400 mt-1">— {username}</p>
//                   </div>
//                   <span
//                      className={`badge ${statusConfig.badge} flex items-center gap-1.5 text-xs font-medium`}>
//                      <StatusIcon className="w-4 h-4" />
//                      {statusConfig.label}
//                   </span>
//                </div>

//                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-5">
//                   {testimonial.description}
//                </p>

//                {categories.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mb-4">
//                      {categories.map((cat, index) => {
//                         const Icon = cat.config.Icon;
//                         return (
//                            <span
//                               key={index}
//                               className={`badge ${cat.config.badge} text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium`}>
//                               {Icon && <Icon className="w-3.5 h-3.5" />}
//                               {cat.config.label}
//                            </span>
//                         );
//                      })}
//                   </div>
//                )}

//                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
//                   <div className="flex items-center gap-3 text-xs text-gray-500">
//                      <span>{createdDate}</span>
//                      {images.length > 1 && (
//                         <span className="text-xs text-gray-400">
//                            {currentImageIndex + 1}/{images.length}
//                         </span>
//                      )}
//                   </div>

//                   {showActions && (
//                      <div className="flex gap-3">
//                         <button
//                            onClick={() => onEdit(testimonial)}
//                            className="group relative p-2 rounded-lg hover:bg-gray-700 transition">
//                            <Edit2 className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
//                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                               Editar
//                            </span>
//                         </button>
//                         <button
//                            onClick={() => onDelete(testimonial)}
//                            className="group relative p-2 rounded-lg hover:bg-gray-700 transition">
//                            <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
//                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
//                               Eliminar
//                            </span>
//                         </button>
//                      </div>
//                   )}
//                </div>
//             </div>
//             {/* POPUP DE VIDEO */}
// {showVideo && (
//   <div 
//     className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
//     onClick={() => setShowVideo(false)}
//   >
//     <div 
//       className="relative max-w-3xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
//       onClick={e => e.stopPropagation()}
//     >
//       <button
//         onClick={() => setShowVideo(false)}
//         className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm"
//       >
//         <X className="w-6 h-6" />
//       </button>
//       <div className="aspect-video">
//         <iframe
//           src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
//           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           className="w-full h-full"
//         />
//       </div>
//     </div>
//   </div>
// )}
//          </div>
//       </>
//    );
// }


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
         if (parsed.hostname.includes('youtu.be')) {
            return parsed.pathname.slice(1);
         }
         if (parsed.hostname.includes('youtube.com')) {
            return parsed.searchParams.get('v') || (parsed.pathname.match(/\/embed\/([^/?]+)/) || [])[1];
         }
      } catch {
         // Si falla URL, intenta regex simple
         const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);
         return match ? match[1] : null;
      }
      return null;
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

                  {/* Ícono Play con popup (solo si hay ID válido) */}
                  {hasVideo && youtubeId && (
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
            {!hasImage && hasVideo && youtubeId && (
               <div 
                  className="relative h-40 bg-gray-900 overflow-hidden cursor-pointer"
                  onClick={() => setShowVideo(true)}
               >
                  <img
                     src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
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