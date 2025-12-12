const express = require("express");
const router = express.Router();
// ... (omito imports y multer)

// =============================================================
// GET /video-testimonials
// Esta ruta es pública y devuelve la lista de videos.
// =============================================================
router.get("/", async (req, res) => {
  try {
    const videos = await VideoTestimonial.findAll({
      order: [["createdAt", "DESC"]],
    });

    // CORRECCIÓN CRÍTICA: Envolvemos la respuesta en { message, data }
    res.json({
        message: "Lista de video testimonials",
        data: videos // El array de videos
    }); 
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ... (resto del router, incluyendo POST, se mantiene)


module.exports = router;
