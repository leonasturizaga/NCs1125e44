const { user } = require("../../db");

const deactivateUser = async (id) => {
    try {
        const foundUser = await user.findByPk(id);

        if (!foundUser) {
            return {
                success: false,
                message: "No se encontró el usuario",
            };
        }

        foundUser.isActive = !foundUser.isActive;
        await foundUser.save();

        return {
            success: true,
            message: "Usuario actualizado con éxito",
            data: {
                id: foundUser.id,
                username: foundUser.username,
                isActive: foundUser.isActive,
            },
        };
    } catch (error) {
        return {
            success: false,
            message: "No se pudo actualizar el usuario",
            error: error.message,
        };
    }
};

module.exports = deactivateUser;