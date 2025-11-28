const getUserByIdController = require("../../controllers/users/getUserById");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getUserByIdController(id);
        res.status(200).json(data);
    } catch(error){
        res.status(500).json({ success: false, message: "Error al recibir el ID del usuario"})
    }
}