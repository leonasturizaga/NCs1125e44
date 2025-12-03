const bcrypt = require("bcrypt");
const { user } = require("./src/db");

async function main() {
  try {
    const adminExists = await user.findOne({ where: { role: "admin" } });

    if (adminExists) {
      console.log("Ya existe un administrador. Nada por hacer.");
      process.exit(0);
    }

    const password = process.env.INT_ADMIN_PASSWORD;

    if(!password){
        console.error("Falta variable de entorno INIT_ADMIN_PASSWORD");
        process.exit(1);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await user.create({
      username: "admin",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Administrador creado correctamente: ", newAdmin.email);
    process.exit(0);
  } catch (err) {
    console.error("Error creando administrador: ", err.message);
    process.exit(1);
  }
}

main();