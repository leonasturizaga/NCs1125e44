const { testimony } = require("../../db");

const getTestimonyById = async (id) => {
  try {
    const foundTestimony = await testimony.findByPk(id);

    if (!foundTestimony) {
      return {
        success: false,
        message: "No se encontro el testimonio",
      };
    }

    return {
      success: true,
      data: foundTestimony,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al intentar buscar el testimonio",
    };
  }
};

module.exports = getTestimonyById;