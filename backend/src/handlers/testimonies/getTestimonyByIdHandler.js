const getTestimonyByIdController = require("../../controllers/testimonies/getTestimonyById");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getTestimonyByIdController(id);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error al recibir el ID del testimonio",
      });
  }
};
