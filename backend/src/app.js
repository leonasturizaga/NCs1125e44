const fs = require('fs'); // 🎯 1. IMPORTAR FS para leer el archivo HTML
const express = require('express');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ... (omito la sección de crear carpeta uploads)

// ==========================
// Middleware
// ==========================
app.use(express.json());
app.use(cors()); // Permitir CORS desde frontend

// Carpeta para almacenar videos subidos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Asegúrate de que esta línea exista y sea correcta:
app.use('/public', express.static(path.join(__dirname, 'public')));
// ... (omito la configuración de Multer y Sequelize)

// ==========================
// Endpoints (Rutas)
// ==========================

// Listado (GET /api/video-testimonials)
app.get('/api/video-testimonials', async (req, res) => {
  try {
    const testimonials = await VideoTestimonial.findAll();
    res.json({ message: 'Lista de video testimonials', data: testimonials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los testimonials' });
  }
});

// Crear (POST /api/video-testimonials)
app.post('/api/video-testimonials', upload.single('file'), async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : null;

    const newVideo = await VideoTestimonial.create({ title, url, description, file });
    res.status(201).json({ message: 'Video testimonial creado', data: newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear video testimonial' });
  }
});

// ==========================================================
// 🎯 NUEVO ENDPOINT DE DEMOSTRACIÓN PÚBLICA (GET /public/demo)
// ==========================================================
app.get('/public/demo', (req, res) => {
    // ⚠️ La URL base es la que usas en el frontend (ngrok)
    const CMS_BASE_URL = "https://bloodier-nonnegative-knox.ngrok-free.dev"; 
    
    // Ruta al archivo demo.html
    const filePath = path.resolve(__dirname, 'public/embed/demo.html');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error leyendo archivo demo:", err);
            // Esto es para que veas el error en la consola si el archivo no existe
            return res.status(500).send("No se pudo cargar la demo de embed. Archivo no encontrado.");
        }
        
        // Reemplazar el placeholder [CMS_BASE_URL] con la URL activa
        const replacedHtml = data.replace(/\[CMS_BASE_URL\]/g, CMS_BASE_URL);
        
        res.setHeader('Content-Type', 'text/html');
        res.send(replacedHtml);
    });
});
// ==========================================================

// Root
app.get('/', (req, res) => res.send('Servidor funcionando correctamente'));

// ==========================
// Iniciar servidor
// ==========================
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));