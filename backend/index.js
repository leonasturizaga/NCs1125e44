const app = require("./src/app");
const port = process.env.PORT || 3000;
const { conn } = require("./src/db");

conn
  .sync({ force: false })
  .then(() => {
    console.log("Database sincronizada correctamente");
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto: ${port}`);
    });
  });