const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { VideoTestimonial } = require("../db"); 

// =============================================================
// MULTER: guarda archivos locales en /uploads/videos
// =============================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// =============================================================
// VALIDACIÓN DE URL DE YOUTUBE (incluye Shorts)
// =============================================================
function isYouTubeUrl(url) {
  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w\-]+/;
  return regex.test(url);
}

// =============================================================
// POST /video-testimonials
// Permite:
//    A) Subir archivo de video local
//    B) Registrar un video de YouTube (incluye Shorts)
// =============================================================
router.post("/", upload.single("videoFile"), async (req, res) => {
  try {
    const { title, description, youtubeUrl } = req.body;

    let videoUrl = null;
    let type = null;

    // Caso A: archivo subido
    if (req.file) {
      videoUrl = `/uploads/videos/${req.file.filename}`;
      type = "file";
    }

    // Caso B: URL de YouTube
    if (youtubeUrl) {
      if (!isYouTubeUrl(youtubeUrl)) {
        return res.status(400).json({ error: "URL de YouTube inválida" });
      }
      videoUrl = youtubeUrl;
      type = "youtube";
    }

    // Validación final: se necesita al menos una opción
    if (!videoUrl) {
      return res.status(400).json({
        error: "Debes subir un archivo o proporcionar una URL de YouTube"
      });
    }

    const newVideo = await VideoTestimonial.create({
      title,
      description,
      videoUrl,
      type
    });

    res.status(201).json(newVideo);

  } catch (error) {
    console.error("Error creating video testimonial:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/", async (req, res) => {
  try {
    const videos = await VideoTestimonial.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


module.exports = router;
