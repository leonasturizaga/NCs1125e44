const getAllTestimoniesController = require("../../controllers/testimonies/getAllTestimonies");

module.exports = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await getAllTestimoniesController(page, size);
        res.status(200).json(data);
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Error al recibir los datos para buscar los testimonios"
        })
    }
}