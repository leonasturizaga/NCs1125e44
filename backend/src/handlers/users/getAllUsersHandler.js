const getAllUsersController = require("../../controllers/users/getAllUsers");

module.exports = async (req, res) => {
  try {
    const { page, size, isActive } = req.query;

    const filters = {};
    if (isActive !== undefined) {
      filters.isActive = isActive === "true";
    }

    const data = await getAllUsersController(page, size, filters);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recibir los datos para la lista de usuarios",
    });
  }
};