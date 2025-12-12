const express = require('express');
const router = express.Router();

// Importa solo el modelo evitando dependencias circulares
const { VideoTestimonial } = require('../src/models/VideoTestimonial');

// Obtener testimonios
router.get('/', async (req, res) => {
  try {
    const items = await VideoTestimonial.findAll();
    res.json(items);
  } catch (err) {
    console.error('Error al obtener testimonios:', err);
    res.status(500).json({ error: 'Error al obtener testimonios' });
  }
});

module.exports = router;
