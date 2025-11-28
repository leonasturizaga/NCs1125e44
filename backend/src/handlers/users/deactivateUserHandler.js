const deactivateUserController = require("../../controllers/users/deactivateUser");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await deactivateUserController(id);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error al recibir el ID del usuario",
        messageError: error.message,
      });
  }
};
