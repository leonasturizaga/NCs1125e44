const postTestimonyController = require("../../controllers/testimonies/postTestimony");
const upload = require("../../services/upload");

module.exports = async (req, res) => {
  try {
    const { title, description, youtubeUrl, userId, categories } = req.body;
    const files = req.files;

    if (typeof categories === "string") {
      categories = JSON.parse(categories);
    }

    if (!title)
      return res.status(400).json({ message: "El título es obligatorio" });
    if (!description)
      return res.status(400).json({ message: "La descripción es obligatoria" });
    if (!userId)
      return res
        .status(400)
        .json({ message: "No se encontró el ID de usuario" });

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Debe incluir al menos una categoría",
      });
    }

    const uploadedImages = [];

    for (const file of files) {
      const cloudImg = await upload(file.buffer);
      uploadedImages.push({
        url: cloudImg.url,
        publicId: cloudImg.publicId,
        type: "image",
      });
    }

    const data = await postTestimonyController(
      title,
      description,
      youtubeUrl,
      userId,
      uploadedImages,
      categories
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear el testimonio",
      error: error.message,
    });
  }
};
