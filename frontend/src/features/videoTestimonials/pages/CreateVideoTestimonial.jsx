import { useState } from "react";
import axios from "axios";
import { useLayout } from "../../../context/LayoutContext";

export default function VideoTestimonialsCreate() {
  const { setCurrentPage } = useLayout();
  const [form, setForm] = useState({ title: "", url: "", description: "", file: null });
  const [previewUrl, setPreviewUrl] = useState("");

  // Convertir URL de YouTube a embed (watch, shorts, youtu.be)
  const getEmbedUrl = (url) => {
    if (!url) return "";

    // YouTube watch?v=ID
    let match = url.match(/v=([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;

    // YouTube shorts/ID
    match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;

    // youtu.be/ID
    match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;

    return ""; // no es YouTube
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setForm({ ...form, file: files[0] });
      if (files[0]) setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
      if (name === "url") setPreviewUrl(getEmbedUrl(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos al backend
      // ⚡ Si querés manejar archivos locales, backend necesita recibir FormData
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("description", form.description);
      if (form.url) payload.append("url", form.url);
      if (form.file) payload.append("file", form.file);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/video-testimonials`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ title: "", url: "", description: "", file: null });
      setPreviewUrl("");
      setCurrentPage("videoTestimonials"); // volver al listado
    } catch (err) {
      console.error("Error creando video testimonial:", err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Nuevo Video Testimonial</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <input
          name="title"
          type="text"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="url"
          type="text"
          placeholder="URL de YouTube (watch, shorts, youtu.be)"
          value={form.url}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="file"
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Crear
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage("videoTestimonials")}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>

        {/* Previsualización */}
        {previewUrl && (
          <div className="mt-4">
            <video
              src={previewUrl}
              controls
              width="100%"
              className="rounded border"
              style={{ maxHeight: "300px" }}
            >
              Tu navegador no soporta previsualización de video.
            </video>
          </div>
        )}
      </form>
    </div>
  );
}
