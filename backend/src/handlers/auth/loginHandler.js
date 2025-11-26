const loginController = require("../../controllers/auth/login");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginController(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recibir los datos para el inicio de sesión",
    });
  }
};
