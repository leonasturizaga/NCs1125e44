// src/features/settings/components/UserImportModal.jsx
import { useState } from "react";
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/services/apiClient";

export default function UserImportModal({ isOpen, onClose }) {
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
    const lines = text.split(/\r\n|\n|\r/);
    const headers = lines[0].split(/[,;]/).map(h => h.trim().toLowerCase().replace(/"/g, ""));
    
    return lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(/[,;]/).map(v => v.trim().replace(/^"|"$/g, ""));
        const obj = {};
        headers.forEach((h, i) => {
          if (values[i] !== undefined && values[i] !== "") {
            obj[h] = values[i];
          }
        });
        return obj;
      });
  };

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    const text = await file.text();
    const users = parseCSV(text);

    let created = 0;
    let updated = 0;
    let errors = 0;

    for (const user of users) {
      try {
        // Buscar si el usuario ya existe por email
        const searchRes = await api.get("/users/getAll");
        const existingUser = searchRes.data.data?.find(u => 
          u.email.toLowerCase() === user.email?.toLowerCase()
        );

        if (existingUser) {
          // EDITAR
          await api.put(`/users/edit/${existingUser.id}`, {
            username: user.username || existingUser.username,
            email: user.email || existingUser.email,
            role: user.role || existingUser.role,
            profilePicture: user.profilepicture || existingUser.profilePicture,
          });
          updated++;
        } else {
          // CREAR (sin contraseña → el backend debe permitirlo o generar una)
          await api.post("/auth/register", {
            username: user.username,
            email: user.email,
            role: user.role || "visitante",
            password: user.password || "Pass1234",
            profilePicture: user.profilepicture || null,
          });
          created++;
        }
      } catch (err) {
        console.error("Error procesando:", user.email, err);
        errors++;
      }
    }

    setResults({ created, updated, errors });
    setLoading(false);
    toast.success(`Importación completa: ${created} creados, ${updated} actualizados`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Importar Usuarios desde CSV
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
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Soporta separadores: coma (,), punto y coma (;)
            </p>
          </div>

          {file && (
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>Columnas esperadas:</strong></p>
              <p>username, email, role, profilePicture (opcional)</p>
            </div>
          )}

          {results && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>{results.created} usuarios creados</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <CheckCircle className="w-5 h-5" />
                <span>{results.updated} usuarios actualizados</span>
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
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleImport}
              disabled={!file || loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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