const { testimony } = require("../../db");

const editTestimony = async (id, updates) => {
  try {
    const foundTestimony = await testimony.findByPk(id);
    if (!foundTestimony) {
      return {
        success: false,
        message: "No se encontró el testimonio",
      };
    }

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
  } catch (error) {
    return {
      success: false,
      message: "Error al intentar actualizar el testimonio",
      messageError: error.message,
    };
  }
};

module.exports = editTestimony;
