// src/features/settings/components/TestimonyImportModal.jsx
import { useState } from "react";
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
// import { toast } from "react-hot-toast";
import api from "@/services/apiClient";
import { toast } from "react-toastify";

export default function TestimonyImportModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setResults(null);
    } else {
      toast.error("Por favor selecciona un archivo CSV");
    }
  };

  const parseCSV = (text) => {
    const lines = text.split(/\r\n|\n|\r/).filter(line => line.trim());
    const headers = lines[0].split(/[;]/).map(h => h.trim().toLowerCase().replace(/"/g, ""));

    return lines.slice(1).map(line => {
      const values = line.split(/[;]/).map(v => v.trim().replace(/^"|"$/g, ""));
      const obj = {};
      headers.forEach((h, i) => {
        if (i < values.length) obj[h] = values[i];
      });
      return obj;
    });
  };

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    const text = await file.text();
    const testimonies = parseCSV(text);

// ← NUEVO: mostrar cuántas filas va a importar
  const totalRows = testimonies.length;
  if (totalRows === 0) {
    toast.error("El CSV no contiene datos");
    setLoading(false);
    return;
  }
  toast.info(`Preparando importación de ${totalRows} testimonio${totalRows > 1 ? 's' : ''}...`);


    let created = 0;
    let errors = 0;

// ... tu bucle de importación ...

  setResults({ created, errors, total: totalRows }); // ← NUEVO
  setLoading(false);
console.log("Importación completada:", { created, errors, total: totalRows });

  if (errors === 0) {
    toast.success(`${created} de ${totalRows} testimonios importados`);
  } else {
    toast.warning(`Importados: ${created}/${totalRows} | Errores: ${errors}`);
  }

    for (const t of testimonies) {
      try {
        const data = new FormData();

        // Campos básicos
        data.append("title", t.title || "Sin título");
        data.append("description", t.description || "Sin descripción");
        data.append("userId", t.userid || "");

        if (t.youtubeurl) data.append("youtubeUrl", t.youtubeurl);

        // === REPLICA EXACTAMENTE EL FORMULARIO ===
        let categories = [];

        if (t.categories && t.categories.trim()) {
          categories = t.categories
            .split("|")           // Soporta | solo para categorias
            .map(c => c.trim())
            .filter(Boolean);
        }

// Si no hay categorías → Clients por defecto
if (categories.length === 0) {
  categories = ["Products", "Products"];
} else if (categories.length === 1) {
  categories = [categories[0], categories[0]];
}

        // ← ESTE ES EL TRUCO: enviar como múltiples entradas "categories"
        categories.forEach(cat => data.append("categories", cat));

        // Imágenes como URLs
        if (t.images && t.images.trim()) {
          const urls = t.images.split(/[,;|]/).map(u => u.trim()).filter(Boolean);
          urls.forEach(url => data.append("images", url));
        }

        const res = await api.post("/testimonies/post", data);

        if (res.data.success) {
          created++;
        }
      } catch (err) {
        console.error("Error importando:", t.title, err.response?.data || err);
        errors++;
      }
    }

    setResults({ created, errors });
    setLoading(false);

    if (errors === 0) {
      toast.success(`${created} testimonios importados correctamente`);
    } else {
      toast.warning(`Importados: ${created} | Errores: ${errors}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Importar Testimonios desde CSV
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <label className="cursor-pointer">
              <span className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                {file ? file.name : "Selecciona un archivo CSV"}
              </span>
              <input type="file" accept=".csv,text/csv" onChange={handleFileChange} className="hidden" />
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Separador de celdas: ";"  Separador de Categorías múltiples: "|" (Suppliers|Products)
            </p>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p><strong>Ejemplo válido:</strong></p>
            <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
              Mi testimonio;Gran servicio;idUser895e3aa;Clients|Suppliers;https://picsum.photos/800
            </code>
          </div>

{results && (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
    <div className="flex items-center gap-2 text-blue-600">
      <FileText className="w-5 h-5" />
      <span>Total de filas procesadas: {results.total}</span>
    </div>
    <div className="flex items-center gap-2 text-green-600">
      <CheckCircle className="w-5 h-5" />
      <span>{results.created} creados</span>
    </div>
    {results.errors > 0 && (
      <div className="flex items-center gap-2 text-red-600">
        <AlertCircle className="w-5 h-5" />
        <span>{results.errors} errores</span>
      </div>
    )}
  </div>
)}

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-medium">
              Cancelar
            </button>
            <button
              onClick={handleImport}
              disabled={!file || loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
              {loading ? "Importando..." : "Importar CSV"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}