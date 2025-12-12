// backend/routes/embeds/embedDemoRouter.js

const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Ruta: /embed/demo
router.get("/demo", (req, res) => {

    // Leer la base del CMS desde .env o fallback
    const CMS_BASE_URL = process.env.CMS_BASE_URL || "http://localhost:3000";

    // CORRECCIÓN IMPORTANTE:
    // __dirname = /backend/routes/embeds
    // Necesitamos subir 3 niveles para llegar a /backend/
    const filePath = path.join(__dirname, "../../public/embed/demo.html");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo demo.html:", err);
            return res
                .status(500)
                .send("No se pudo cargar demo.html. Verifica que exista en /backend/public/embed/");
        }

        // Reemplazar placeholder
        const replacedHtml = data.replace(/\[CMS_BASE_URL\]/g, CMS_BASE_URL);

        res.setHeader("Content-Type", "text/html");
        res.send(replacedHtml);
    });
});

module.exports = router;
