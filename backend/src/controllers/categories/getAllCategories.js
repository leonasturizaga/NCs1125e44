const { category } = require("../../db");

const getAllCategories = async () => {
  try {
    const categories = await category.findAll();

    if (!categories || categories.length === 0) {
      return {
        success: false,
        message: "No se encontraron categorías",
      };
    }

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al recopilar las categorías",
    };
  }
};

module.exports = getAllCategories;
