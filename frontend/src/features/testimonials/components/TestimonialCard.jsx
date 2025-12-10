//-------------- version basica sin categorias ----------------
// src/features/testimonials/components/TestimonialCard.jsx
// import { Edit2, Trash2 } from "lucide-react"; 
// import { STATUS_CONFIG } from "@/constants/statusConfig";

// export default function TestimonialCard({ testimonial, showActions = false, onEdit, onDelete }) {
//   const config = STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.draft;
//   const StatusIcon = config.Icon;

//   return (
//     <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-700">
//       <div className="flex justify-between items-start mb-4">

//         {/* Título */}
//         <h3 className="text-xl font-semibold text-white line-clamp-2">
//           {testimonial.title || testimonial.author}
//         </h3>

//         {/* Badge */}
//         <span className={`badge ${config.badge}`}>
//           <StatusIcon className="w-4 h-4" />
//           {config.label}
//         </span>
//       </div>

//       {/* Contenido */}
//       <p className="text-gray-400 line-clamp-3 mb-4 text-sm">
//         {testimonial.description || testimonial.content}
//       </p>

//       {/* Metadatos */}
//       <div className="flex justify-between text-sm text-gray-500 border-t border-gray-700 pt-3">
//         <span>{testimonial.category || "—"}</span>
//         <span>{new Date(testimonial.createdAt || testimonial.date).toLocaleDateString()}</span>
//       </div>

//       {/* ACCIONES */}
//       {showActions && (
//         <div className="mt-6 flex gap-3 justify-end border-t border-gray-700 pt-3">

//           {/* Botón EDIT */}
//           <button
//             onClick={() => onEdit(testimonial)}
//             className="group p-2 rounded-full hover:bg-gray-700 transition flex items-center justify-center"
//           >
//             <Edit2 className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
//             {/* Tooltip */}
//             <span className="absolute mt-10 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition">
//               Editar
//             </span>
//           </button>

//           {/* Botón DELETE */}
//           <button
//             onClick={() => onDelete(testimonial)}
//             className="group p-2 rounded-full hover:bg-gray-700 transition flex items-center justify-center"
//           >
//             <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
//             {/* Tooltip */}
//             <span className="absolute mt-10 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition">
//               Eliminar
//             </span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


//-------------- version con categorias ----------------
// src/features/testimonials/components/TestimonialCard.jsx

import { Edit2, Trash2 } from "lucide-react";
import { STATUS_CONFIG } from "@/constants/statusConfig";

export default function TestimonialCard({
  testimonial,
  showActions = false,
  onEdit,
  onDelete,
}) {
  const statusConfig = STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.draft;
  const StatusIcon = statusConfig.Icon;

  // Categorías con su config (ícono + color)
  const categories = (testimonial.categories || []).map((cat) => ({
    name: cat.name,
    config: STATUS_CONFIG[cat.name] || { Icon: null, badge: "badge-draft", label: cat.name },
  }));

  const username = testimonial.user?.username || "Anónimo";
  const createdDate = new Date(testimonial.createdAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
      {/* Header: Título + Estado */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-white line-clamp-2 leading-tight">
            {testimonial.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">— {username}</p>
        </div>

        {/* Badge de estado (solo uno, arriba a la derecha) */}
        <span className={`badge ${statusConfig.badge} flex items-center gap-1.5 text-xs font-medium`}>
          <StatusIcon className="w-4 h-4" />
          {statusConfig.label}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-5">
        {testimonial.description}
      </p>

      {/* Categorías como badges con íconos */}
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

      {/* Footer: Fecha + Acciones */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
        <span className="text-xs text-gray-500">
          {createdDate}
        </span>

        {showActions && (
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(testimonial)}
              className="group relative p-2 rounded-lg hover:bg-gray-700 transition"
              aria-label="Editar"
            >
              <Edit2 className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                Editar
              </span>
            </button>

            <button
              onClick={() => onDelete(testimonial)}
              className="group relative p-2 rounded-lg hover:bg-gray-700 transition"
              aria-label="Eliminar"
            >
              <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                Eliminar
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}