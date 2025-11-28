const { testimony, user } = require("../../db");

const updateTestimonyStatus = async (testimonyId, userId, status) => {
  try {
    const foundTestimony = await testimony.findByPk(testimonyId);
    const foundUser = await user.findByPk(userId);

    if (!foundTestimony) {
      return {
        success: false,
        message: "No se encontró el testimonio",
      };
    }

    if (!foundUser) {
      return {
        success: false,
        message: "No se encontró el usuario",
      };
    }

    // if (
    //   !foundUser.role ||
    //   foundUser.role !== "admin" ||
    //   foundUser.role !== "editor"
    // ) {
    //   return {
    //     success: false,
    //     message: "Permisos insuficientes para actualizar el testimonio",
    //   };
    // }

    foundTestimony.status = status;
    await foundTestimony.save();

    return {
      success: true,
      message: "Testimonio actualizado con éxito",
      data: {
        id: foundTestimony.id,
        status: foundTestimony.status,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "No se pudo actualizar el testimonio",
      error: error.message,
    };
  }
};

module.exports = updateTestimonyStatus;
