const { testimony, user } = require("../../db");

const postTestimony = async (title, description, youtubeUrl, userId) => {
  try {
    const userFound = await user.findByPk(userId);

    if (!userFound) {
      return {
        success: false,
        message: "Usuario no encontrado",
      };
    }

    const newTestimony = await testimony.create({
      title: title,
      description: description,
      youtubeUrl: youtubeUrl,
      userId: userId,
    });

    const createdTestimony = await testimony.findByPk(newTestimony.id);

    return {
      success: true,
      message: "Testimonio creado con exito",
      data: createdTestimony,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el testimonio",
    };
  }
};

module.exports = postTestimony;
