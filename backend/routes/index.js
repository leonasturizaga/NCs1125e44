// backend/routes/index.js
const express = require('express');
const router = express.Router();

// Importar sub-rutas
const videoRoutes = require('./videoTestimonials.routes');
const embedDemoRouter = require('./embeds/embedDemoRouter');   // ← ESTA ES LA CORRECCIÓN
const embedTestimonialsRouter = require('./embeds/embedTestimonialsRouter');

// Montar rutas
router.use('/api/video-testimonials', videoRoutes);
router.use('/embed', embedDemoRouter); // ← AQUÍ SE MONTAN TODAS LAS RUTAS DE EMBED
router.use('/embed', embedTestimonialsRouter);

module.exports = router;
