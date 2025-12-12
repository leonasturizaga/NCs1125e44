const { Router } = require("express");
const router = Router();
const fs = require('fs'); // CRÍTICO: Necesario para la lógica de demostración
const path = require('path'); // CRÍTICO: Necesario para la lógica de demostración
// Importaciones de Routers
const authRouter = require("./auth/authRouter");
const testimonyRouter = require("./testimonies/testimoniesRouter");
const usersRouter = require("./users/usersRouter");
const categoriesRouter = require("./categories/categoriesRouter");
const videoTestimonialsRoutes = require("./videoTestimonials.routes"); // Router de Videos
// Nota: Eliminamos embedDemoRouter y embedRoutes si la lógica se pone aquí

// =========================================================
// 1. ENDPOINTS PROTEGIDOS (CMS)
// =========================================================

// Rutas CMS (API): Se montan bajo /api/ en el archivo principal (si fuera un router separado)
// Aquí, asumimos que app.js lo monta en /api o en la raíz.
router.use("/api/auth", authRouter);
router.use("/api/testimonies", testimonyRouter);
router.use("/api/users", usersRouter);
router.use("/api/categories", categoriesRouter);
router.use("/api/video-testimonials", videoTestimonialsRoutes); 

// =========================================================
// 2. ENDPOINT DE DEMOSTRACIÓN PÚBLICA (/public/demo)
// =========================================================
router.get('/public/demo', (req, res) => {
    // La URL base para el iframe (debe estar en el .env)
    const CMS_BASE_URL = process.env.CMS_BASE_URL || "http://localhost:3000"; 
    
    // Ruta al archivo demo.html
    // path.join(__dirname, '..', 'public/embed/demo.html') si public está al lado de routes
    const filePath = path.join(__dirname, '../public/embed/demo.html');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error leyendo archivo demo:", err);
            return res.status(500).send("No se pudo cargar la demo de embed.");
        }
        
        // Reemplazar el placeholder [CMS_BASE_URL] con la URL activa de ngrok/CMS
        const replacedHtml = data.replace(/\[CMS_BASE_URL\]/g, CMS_BASE_URL);
        
        res.setHeader('Content-Type', 'text/html');
        res.send(replacedHtml);
    });
});

// =========================================================
// 3. ENDPOINTS DE API (Ya que antes estaban en app.js)
// Debes mover los app.get y app.post de app.js aquí.
// =========================================================
// El código de los endpoints app.get('/api/video-testimonials', ...) y app.post(...) DEBE IR AQUÍ.
// Si no están aquí, Express no los encuentra.

// Ejemplo (Asumiendo que el router principal no tiene prefijo /api en app.js)
// router.get('/video-testimonials', async (req, res) => { ... });


// =========================================================
// 4. RUTA RAÍZ
// =========================================================
router.get('/', (req, res) => res.send('Servidor funcionando correctamente'));


module.exports = router;