const { user } = require("../../db");

const editUser = async (id, updates, userId) => {
  try {
    const foundUser = await user.findByPk(id);
    if (!foundUser) {
      return {
        success: false,
        message: "No se encontró el usuario",
      };
    }

    const requestUser = await user.findByPk(userId);
    if (!requestUser) {
      return {
        success: false,
        message: "Usuario no encontrado",
      };
    }

    const protectedFields = ["id", "email", "password", "createdAt"];
    protectedFields.forEach((field) => delete updates[field]);

    if (updates.role && requestUser.role !== "admin") {
      delete updates.role;
    }

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
        role: foundUser.role,
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
