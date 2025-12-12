const deleteTestimonyController = require("../../controllers/testimonies/deleteTestimony");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const data = await deleteTestimonyController(id, userId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recibir el ID del testimonio",
    });
  }
};
