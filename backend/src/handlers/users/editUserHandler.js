const editUserController = require("../../controllers/users/editUser");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const data = await editUserController(id, updates);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recibir los datos para editar el usuario",
    });
  }
};