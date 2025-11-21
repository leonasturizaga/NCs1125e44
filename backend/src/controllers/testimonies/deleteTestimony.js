const { testimony, user } = require("../../db");

const deleteTestimony = async (id, userId) => {
  try {
    const foundUser = user.findByPk(userId);

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

    if (
      foundTestimony.userId === userId ||
      foundUser.role === ("admin" || "editor")
    ) {
      await testimony.destroy({ where: { id } });
    }

    return {
      success: true,
      message: "Testimonio eliminado con exito",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al intentar eliminar el testimonio",
    };
  }
};

module.exports = deleteTestimony;
