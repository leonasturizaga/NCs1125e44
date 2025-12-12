require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { Sequelize, DataTypes } = require('sequelize');

// Inicializar app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/embed', express.static(path.join(__dirname, 'public', 'embed')));

// Conexión a la base de datos con logging
const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: console.log, // Loguea todas las queries
  }
);

// Testear conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('❌ Error de conexión a PostgreSQL:', err));

// Modelos
const VideoTestimonialModel = require('./src/models/VideoTestimonial');
const VideoTestimonial = VideoTestimonialModel(sequelize, DataTypes);

// Sincronizar DB
sequelize.sync({ force: true })

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.random().toString(36).substring(2);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ----------------- RUTAS -----------------

// API Video Testimonials
const apiRouter = express.Router();

apiRouter.get('/video-testimonials', async (req, res) => {
  try {
    const testimonials = await VideoTestimonial.findAll();
    res.json(testimonials);
  } catch (err) {
    console.error('❌ Error al obtener testimonios:', err); // Log real
    res.status(500).json({ error: 'Error al obtener testimonios' });
  }
});

app.use('/api', apiRouter);

// Servir testimonials.html
app.get('/embed/testimonials', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'embed', 'testimonials.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ Error leyendo testimonials.html:', err); // Log real
      return res.status(500).send('Error cargando testimonials.html');
    }
    res.send(data);
  });
});

// Home
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Exportar sequelize y modelos
module.exports = { sequelize, VideoTestimonial };
