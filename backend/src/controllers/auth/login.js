const { user } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  try {
    const foundUser = await user.findOne({
      where: {
        email: email,
      },
    });

    if (!foundUser) {
      return {
        success: false,
        message:
          "Usuario no encontrado. Por favor, regístrese, y vuelva a intentarlo",
      };
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      return {
        success: false,
        message: "Email o contraseña incorrectos",
      };
    }

    if (foundUser && match) {
      if (foundUser.isActive === false) {
        return {
          success: false,
          message: "Tu cuenta ha sido desactivada por un administrador",
        };
      }
    }

    //TODO: hacer validación para "verified" (verificación por correo electrónico)

    const token = jwt.sign(
      {
        id: foundUser.id,
        role: foundUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      success: true,
      token: token,
    };
  } catch (error) {
    console.error("ERROR LOGIN:", error);
    return {
      success: false,
      message: "Error al intentar el inicio de sesión",
      errorMessage: error.message
    };
  }
};

module.exports = login;
