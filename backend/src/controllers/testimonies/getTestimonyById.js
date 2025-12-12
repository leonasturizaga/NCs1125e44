const { testimony, category, user, image } = require("../../db");

const getTestimonyById = async (id) => {
  try {
    const foundTestimony = await testimony.findByPk(id, {
      include: [
        {
          model: user,
          attributes: ["id", "username", "profilePicture"],
        },
        {
          model: category,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: image,
          as: "images",
          attributes: ["id", "url", "publicId"],
        },
      ],
    });

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
      error: error.message
    };
  }
};

module.exports = getTestimonyById;