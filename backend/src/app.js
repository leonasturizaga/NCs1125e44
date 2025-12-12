const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const routes = require("./routes/index");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// rutas API
app.use("/api", routes);

module.exports = app;
