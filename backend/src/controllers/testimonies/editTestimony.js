const { testimony } = require("../../db");

const editTestimony = async (id, updates) => {
  try {
    const foundTestimony = await testimony.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!foundTestimony) {
      return {
        success: true,
        message: "Testimonio no encontrado",
      };
    }

    return {
      success: true,
      message: "Testimonio actualizado con exito",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al intentar actualizar el testimonio",
    };
  }
};

module.exports = editTestimony;