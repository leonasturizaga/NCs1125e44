const express = require("express");
const router = express.Router();

// 1) Endpoint público de testimonios (por ahora mock)
router.get("/public/testimonies", (req, res) => {
  const cantidad = Number(req.query.cantidad) || 3;

  const mock = [
    { id: 1, autor: "Ana", texto: "Excelente plataforma." },
    { id: 2, autor: "Luis", texto: "Muy útil para nuestra institución." },
    { id: 3, autor: "Marcos", texto: "El mejor CMS de testimonios." },
  ];

  res.json(mock.slice(0, cantidad));
});

// 2) Página del iframe (widget)
router.get("/embed", (req, res) => {
  const cantidad = req.query.cantidad || 3;

  res.send(`
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          .testimonio { 
            margin-bottom: 15px; 
            padding: 12px 16px; 
            border-left: 4px solid #4f46e5; 
            background: #f4f4f8;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <h3>Testimonios</h3>
        <div id="widget"></div>

        <script>
          fetch("/public/testimonies?cantidad=${cantidad}")
            .then(r => r.json())
            .then(data => {
              const root = document.getElementById("widget");
              root.innerHTML = data.map(t =>
                \`<div class="testimonio"><p>\${t.texto}</p><small>— \${t.autor}</small></div>\`
              ).join("");
            });
        </script>
      </body>
    </html>
  `);
});

// 3) Script que se incrusta en sitios externos
router.get("/widget.js", (req, res) => {
  res.type("application/javascript");

  res.send(`
    (function(){
      const el = document.getElementById("testimonial-widget");
      const cantidad = el?.dataset?.cantidad || 3;

      const iframe = document.createElement("iframe");
iframe.src = "http://localhost:3000/embed?cantidad=" + cantidad;
      iframe.width = "100%";
      iframe.height = "300";
      iframe.style.border = "none";

      el.appendChild(iframe);
    })();
  `);
});

module.exports = router;