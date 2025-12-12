const { user } = require("../../db");

const deactivateUser = async (id, userId) => {
  try {
    const foundUser = await user.findByPk(id);
    if (!foundUser) {
      return {
        success: false,
        message: "No se encontró el usuario",
      };
    }

    const foundAdmin = await user.findByPk(userId);
    if (!foundAdmin) {
      return {
        success: false,
        message: "No se encontró el usuario administrador",
      };
    }

    if (foundAdmin && foundAdmin.role === "admin") {
      foundUser.isActive = !foundUser.isActive;
      await foundUser.save();

      return {
        success: true,
        message: "Usuario actualizado con éxito",
        data: {
          id: foundUser.id,
          username: foundUser.username,
          isActive: foundUser.isActive,
        },
      };
    } else {
      return {
        success: false,
        message: "No puedes actualizar a este usuario",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "No se pudo actualizar el usuario",
      error: error.message,
    };
  }
};

module.exports = deactivateUser;
