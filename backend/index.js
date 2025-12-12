

require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------------
// ⚡ Crear carpeta uploads si no existe
// -------------------------
//const uploadsDir = path.join(__dirname, 'uploads');
//if (!fs.existsSync(uploadsDir)) {
 // fs.mkdirSync(uploadsDir, { recursive: true });
 // console.log('Carpeta "uploads" creada automáticamente.');
//}

// ==========================
// Middleware
// ==========================
app.use(express.json());
app.use(cors()); // ⚡ permitir CORS desde frontend

// Carpeta para almacenar videos subidos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================
// Configuración Multer
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ==========================
// Inicializar Sequelize
// ==========================
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

// Probar conexión
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.error('Error de conexión:', err));

// ==========================
// Modelos
// ==========================
const VideoTestimonial = sequelize.define('VideoTestimonial', {
  title: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING }, // YouTube URL
  file: { type: DataTypes.STRING }, // archivo local
  description: { type: DataTypes.TEXT }
}, {
  tableName: 'videoTestimonials',
  timestamps: true
});

// ==========================
// Sincronizar tablas
// ==========================
sequelize.sync({ alter: true })
  .then(() => console.log('Tablas sincronizadas correctamente'))
  .catch(err => console.error('Error al sincronizar las tablas:', err));

// ==========================
// Endpoints
// ==========================

// Listado
app.get('/api/video-testimonials', async (req, res) => {
  try {
    const testimonials = await VideoTestimonial.findAll();
    res.json({ message: 'Lista de video testimonials', data: testimonials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los testimonials' });
  }
});

// Crear
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

// Root
app.get('/', (req, res) => res.send('Servidor funcionando correctamente'));

// ==========================
// Iniciar servidor
// ==========================
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
