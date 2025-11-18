const postUserController = require("../../controllers/users/postUser");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    //subida de archivo a nube para foto de perfil
    //==============================================

    //==============================================

    const data = await postUserController(
      username,
      email,
      password,
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recibir los datos para crear el usuario",
      errorMessage: error.message,
    });
  }
};
