const getAllCategoriesController = require("../../controllers/categories/getAllCategories");

module.exports = async (req, res) => {
  try {
    const data = await getAllCategoriesController();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al intentar recibir las categorías",
    });
  }
};
