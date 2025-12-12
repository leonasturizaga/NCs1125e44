const { category } = require("../../db");

module.exports = async (req, res) => {
  try {
    const { names } = req.body;

    if (!Array.isArray(names) || names.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Debe enviar un array de nombres de categorías",
      });
    }

    const createdCategories = await Promise.all(
      names.map(async (name) => {
        const [newCategory, created] = await category.findOrCreate({
          where: { name },
        });
        return newCategory;
      })
    );

    res.status(201).json({
      success: true,
      message: "Categorías creadas o existentes recuperadas correctamente",
      data: createdCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al crear las categorías",
    });
  }
};