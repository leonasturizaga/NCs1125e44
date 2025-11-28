const { user } = require("../../db");

const getUserById = async (id) => {
  try {
    const foundUser = await user.findByPk(id);

    if (!foundUser) {
      return {
        succes: false,
        message: "No se encontro el usuario",
      };
    } else {
      return {
        success: true,
        data: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
          profilePicture: foundUser.profilePicture,
          createdAt: foundUser.createdAt,
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error al buscar el usuario",
    };
  }
};

module.exports = getUserById;