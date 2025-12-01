// src/features/testimonials/components/TestimonialCard.jsx

import { Edit2, Trash2 } from "lucide-react"; 
import { STATUS_CONFIG } from "@/constants/statusConfig";

export default function TestimonialCard({ testimonial, showActions = false, onEdit, onDelete }) {
  const config = STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.draft;
  const StatusIcon = config.Icon;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-700">
      <div className="flex justify-between items-start mb-4">

        {/* Título */}
        <h3 className="text-xl font-semibold text-white line-clamp-2">
          {testimonial.title || testimonial.author}
        </h3>

        {/* Badge */}
        <span className={`badge ${config.badge}`}>
          <StatusIcon className="w-4 h-4" />
          {config.label}
        </span>
      </div>

      {/* Contenido */}
      <p className="text-gray-400 line-clamp-3 mb-4 text-sm">
        {testimonial.description || testimonial.content}
      </p>

      {/* Metadatos */}
      <div className="flex justify-between text-sm text-gray-500 border-t border-gray-700 pt-3">
        <span>{testimonial.category || "—"}</span>
        <span>{new Date(testimonial.createdAt || testimonial.date).toLocaleDateString()}</span>
      </div>

      {/* ACCIONES */}
      {showActions && (
        <div className="mt-6 flex gap-3 justify-end border-t border-gray-700 pt-3">

          {/* Botón EDIT */}
          <button
            onClick={() => onEdit(testimonial)}
            className="group p-2 rounded-full hover:bg-gray-700 transition flex items-center justify-center"
          >
            <Edit2 className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
            {/* Tooltip */}
            <span className="absolute mt-10 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition">
              Editar
            </span>
          </button>

          {/* Botón DELETE */}
          <button
            onClick={() => onDelete(testimonial)}
            className="group p-2 rounded-full hover:bg-gray-700 transition flex items-center justify-center"
          >
            <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
            {/* Tooltip */}
            <span className="absolute mt-10 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition">
              Eliminar
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
