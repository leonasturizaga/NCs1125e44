// src/features/testimonials/components/TestimonialModal.jsx
import { X } from "lucide-react";

export default function TestimonialModal({
  isOpen,
  onClose,
  testimonial,
  onSave,
  onDelete,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-xl font-semibold">
            {testimonial?.id ? "Edit Testimonial" : "New Testimonial"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="modal-body space-y-5">
          <div>
            <label className="label">Author</label>
            <input
              type="text"
              className="input"
              defaultValue={testimonial?.author || ""}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="label">Content</label>
            <textarea
              rows="5"
              className="input"
              defaultValue={testimonial?.content || ""}
              placeholder="Write your testimonial..."
            />
          </div>

          <div>
            <label className="label">Category</label>
            <select className="input" defaultValue={testimonial?.category || "Clients"}>
              <option>Clients</option>
              <option>Suppliers</option>
              <option>Employees</option>
            </select>
          </div>

          <div>
            <label className="label">Status</label>
            <select className="input" defaultValue={testimonial?.status || "draft"}>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          {testimonial?.id && (
            <button onClick={onDelete} className="btn-danger mr-auto">
              Delete
            </button>
          )}
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button onClick={onSave} className="btn-primary">
            {testimonial?.id ? "Save Changes" : "Create Testimonial"}
          </button>
        </div>
      </div>
    </div>
  );
}