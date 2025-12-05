const { testimony, user, image, category } = require("../../db");

const getAllTestimonies = async (page, size) => {
  try {
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limit = Math.max(1, parseInt(size) || 10);
    const offset = (pageNum - 1) * limit;

    const { count, rows } = await testimony.findAndCountAll({
      limit,
      offset,
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
      order: [["createdAt", "DESC"]],
    });

    if (!rows || rows.length == 0) {
      return {
        success: false,
        message: "No se encontraron testimonios",
      };
    } else {
      return {
        success: true,
        totalTestimonies: count,
        currentPage: pageNum,
        totalPages: Math.ceil(count / limit),
        data: rows,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al recopilar testimonios",
    };
  }
};

module.exports = getAllTestimonies;
