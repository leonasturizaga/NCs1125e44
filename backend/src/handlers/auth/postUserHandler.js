const postUserController = require("../../controllers/users/postUser");
require("dotenv").config();
const upload = require("../../services/upload");

module.exports = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const files = req.files;
    let fileData = {};

    if (files && files.length > 0) {
      const cloudImg = await upload(files[0].buffer);
      fileData = {
        url: cloudImg.url,
        publicId: cloudImg.publicId,
        type: "image",
      };
    }

    const data = await postUserController(username, email, password, fileData);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recibir los datos para crear el usuario",
      errorMessage: error.message,
    });
  }
};
