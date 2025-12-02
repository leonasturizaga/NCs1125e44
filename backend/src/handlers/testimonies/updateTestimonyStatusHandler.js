const updateTestimonyStatus = require("../../controllers/testimonies/updateTestimonyStatus");

module.exports = async (req, res) => {
  try {
    const { testimonyId, userId, status } = req.body;

    if (status === undefined || !testimonyId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Faltan datos obligatorios",
      });
    }

    if (status !== "approved" && status !== "rejected") {
      return res.status(400).json({
        success: false,
        message: "Estado inválido para el testimonio",
      });
    }

    const data = await updateTestimonyStatus(testimonyId, userId, status);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado del testimonio",
    });
  }
};
