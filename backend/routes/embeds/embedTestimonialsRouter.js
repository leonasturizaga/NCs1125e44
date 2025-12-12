const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/testimonials", (req, res) => {
    const CMS_BASE_URL = process.env.CMS_BASE_URL || "http://localhost:3000";

    // __dirname = /backend/routes/embeds
    const filePath = path.join(__dirname, "../../../public/embed/testimonials.html");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo testimonials.html:", err);
            return res.status(500).send("Error cargando testimonials.html");
        }

        const replacedHtml = data.replace(/\[CMS_BASE_URL\]/g, CMS_BASE_URL);

        res.setHeader("Content-Type", "text/html");
        res.send(replacedHtml);
    });
});

module.exports = router;
