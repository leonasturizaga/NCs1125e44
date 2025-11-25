const { user } = require("../../db");

const getAllUsers = async (page, size, filters = {}) => {
  try {
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limit = Math.max(1, parseInt(size) || 10);
    const offset = (pageNum - 1) * limit;

    const { count, rows } = await user.findAndCountAll({
      where: filters,
      limit,
      offset,
      attributes: ["id", "username", "email", "isActive", "profilePicture", "role"],
      order: [["createdAt", "DESC"]],
    });

    if (rows.length === 0) {
      return {
        success: false,
        message: "No se encontraron usuarios",
      };
    }

    return {
      success: true,
      totalUsers: count,
      currentPage: pageNum,
      totalPages: Math.ceil(count / limit),
      data: rows,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al recopilar todos los usuarios",
    };
  }
};

module.exports = getAllUsers;
