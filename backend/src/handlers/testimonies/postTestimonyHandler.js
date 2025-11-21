const postTestimonyController = require("../../controllers/testimonies/postTestimony");

module.exports = async (req, res) => {
  try {
    const { title, description, youtubeUrl, userId } = req.body;

    if (!title || title.length === 0) {
      res
        .status(500)
        .json({ success: false, message: "El titulo es obligatorio" });
    }

    if (!description || description.length === 0) {
      res
        .status(500)
        .json({ success: false, message: "La descripcion es obligatoria" });
    }

    if (!userId) {
      res
        .status(500)
        .json({ success: false, message: "No se encontro el ID de usuario" });
    }

    const data = await postTestimonyController(
      title,
      description,
      youtubeUrl,
      userId
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recibir los datos para crear el testimonio",
    });
  }
};
