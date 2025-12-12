const { testimony, user } = require("../../db");

const deleteTestimony = async (id, userId) => {
  try {
    const foundUser = await user.findByPk(userId);

    if (!foundUser) {
      return {
        success: false,
        message: "Usuario no encontrado",
      };
    }

    const foundTestimony = await testimony.findByPk(id);

    if (!foundTestimony) {
      return {
        success: false,
        message: "Testimonio no encontrado",
      };
    }

    const isOwner = foundTestimony.userId === userId;
    const isAdminOrEditor = ["admin", "editor"].includes(foundUser.role);

    if (isOwner || isAdminOrEditor) {
      await testimony.destroy({ where: { id } });
      return {
        success: true,
        message: "Testimonio eliminado con éxito",
      };
    } else {
      return {
        success: false,
        message: "No tienen permisos para eliminar este testimonio",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al intentar eliminar el testimonio",
    };
  }
};

module.exports = deleteTestimony;
