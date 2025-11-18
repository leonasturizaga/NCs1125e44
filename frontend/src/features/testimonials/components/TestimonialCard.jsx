import { CheckCircle, Clock, XCircle } from "lucide-react";

const statusConfig = {
  published: { color: "text-green-800 bg-green-100", icon: CheckCircle },
  pending:   { color: "text-yellow-800 bg-yellow-100", icon: Clock },
  draft:     { color: "text-gray-800 bg-gray-100", icon: XCircle },
};

export default function TestimonialCard({ testimonial, showActions = false, onEdit, onDelete }) {
  const { icon: StatusIcon, color } = statusConfig[testimonial.status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{testimonial.author}</h3>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${color}`}>
          <StatusIcon className="w-4 h-4" />
          {testimonial.status === "published" ? "Publicado" :
           testimonial.status === "pending" ? "Pendiente" : "Borrador"}
        </span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{testimonial.content}</p>

      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
        <span>{testimonial.category}</span>
        <span>{testimonial.date}</span>
      </div>

      {showActions && (
        <div className="mt-4 flex gap-2 justify-end">
          <button
            onClick={() => onEdit?.(testimonial)}
            className="px-3 py-1 text-indigo-600 hover:bg-indigo-50 rounded-md text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete?.(testimonial)}
            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md text-sm"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}