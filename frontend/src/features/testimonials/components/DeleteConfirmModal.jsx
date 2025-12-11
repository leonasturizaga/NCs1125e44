// src/features/testimonials/components/DeleteConfirmModal.jsx
import { AlertCircle, Trash2 } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title = "este testimonio" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center mb-5">
          <AlertCircle className="w-10 h-10 text-red-400" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3">¿Eliminar testimonio?</h3>
        <p className="text-gray-400 mb-8">
          Vas a eliminar permanentemente <strong>{title}</strong>.<br />
          <span className="text-red-400">Esta acción no se puede deshacer</span>.
        </p>

        <div className="flex gap-4 justify-center">
          <button onClick={onClose} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}