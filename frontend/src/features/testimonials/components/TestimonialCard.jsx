
//------------------------  version 4 ---------------------
// src/features/testimonials/components/TestimonialCard.jsx
import { STATUS_CONFIG } from "@/constants/statusConfig";

export default function TestimonialCard({ testimonial, showActions = false, onEdit, onDelete }) {
  const config = STATUS_CONFIG[testimonial.status] || STATUS_CONFIG.draft;
  const StatusIcon = config.Icon;

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {testimonial.title || testimonial.author}
        </h3>
        <span className={`badge ${config.badge}`}>
          <StatusIcon className="w-4 h-4" />
          {config.label}
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
        {testimonial.description || testimonial.content}
      </p>

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{testimonial.category || "—"}</span>
        <span>{new Date(testimonial.createdAt || testimonial.date).toLocaleDateString()}</span>
      </div>

      {showActions && (
        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={() => onEdit(testimonial)} className="btn-ghost text-indigo-600">
            Edit
          </button>
          <button onClick={() => onDelete(testimonial)} className="btn-ghost text-red-600">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}