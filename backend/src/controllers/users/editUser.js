const { user } = require("../../db");

const editUser = async (id, updates) => {
  try {
    const foundUser = await user.findByPk(id);
    if (!foundUser) {
      return {
        success: false,
        message: "No se encontró el usuario",
      };
    }

    const protectedFields = ["id", "role", "email", "password"];
    protectedFields.forEach((field) => delete updates[field]);

    Object.entries(updates).forEach(([key, value]) => {
      if (foundUser.dataValues.hasOwnProperty(key)) {
        foundUser[key] = value;
      }
    });

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
  } catch (error) {
    return {
      success: false,
      message: "Error al modificar el usuario",
    };
  }
};

module.exports = editUser;
