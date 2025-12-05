const { testimony, user } = require("../../db");

const editTestimony = async (id, updates, userId) => {
  try {
    const foundTestimony = await testimony.findByPk(id);
    if (!foundTestimony) {
      return {
        success: false,
        message: "No se encontró el testimonio",
      };
    }

    const foundUser = await user.findByPk(userId);
    if (!foundUser) {
      return {
        success: false,
        message: "Usuario no encontrado",
      };
    }

    const protectedFields = ["id", "createdAt", "updatedAt", "userId"];
    protectedFields.forEach((field) => delete updates[field]);

    const isAdminOrEditor = ["admin", "editor"].includes(foundUser.role);

    if (foundUser.id === foundTestimony.userId || isAdminOrEditor) {
      Object.entries(updates).forEach(([key, value]) => {
        if (foundTestimony.dataValues.hasOwnProperty(key)) {
          foundTestimony[key] = value;
        }
      });

      await foundTestimony.save();

      return {
        success: true,
        message: "Testimonio actualizado con éxito",
        data: foundTestimony,
      };
    } else {
      return {
        success: false,
        message: "No puedes actualizar este testimonio",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al intentar actualizar el testimonio",
      messageError: error.message,
    };
  }
};

module.exports = editTestimony;
