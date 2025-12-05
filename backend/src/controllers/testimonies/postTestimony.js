const { testimony, user, image, category } = require("../../db");

const postTestimony = async (
  title,
  description,
  youtubeUrl,
  userId,
  uploadedImages,
  categories
) => {
  try {
    const userFound = await user.findByPk(userId);

    if (!userFound) {
      return {
        success: false,
        message: "Usuario no encontrado",
      };
    }

    const newTestimony = await testimony.create({
      title,
      description,
      youtubeUrl,
      userId,
    });

    const categoryRecords = await category.findAll({
      where: { name: categories },
    });
    await newTestimony.addCategories(categoryRecords);

    if (uploadedImages.length > 0) {
      await image.bulkCreate(
        uploadedImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
          testimonyId: newTestimony.id,
        }))
      );
    }

    const createdTestimony = await testimony.findByPk(newTestimony.id, {
      include: [category, { model: image, as: "images" }],
    });

    return {
      success: true,
      message: "Testimonio creado con exito",
      data: createdTestimony,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al crear el testimonio",
      error: error.message,
    };
  }
};

module.exports = postTestimony;
