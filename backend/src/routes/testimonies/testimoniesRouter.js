const { Router } = require("express");
const router = Router();
const multer = require("../../middleware/multer");
const Multer = require("multer");

const postTestimonyHandler = require("../../handlers/testimonies/postTestimonyHandler");
const getTestimonyByIdHandler = require("../../handlers/testimonies/getTestimonyByIdHandler");
const getAllTestimoniesHandler = require("../../handlers/testimonies/getAllTestimoniesHandler");
const editTestimonyHandler = require("../../handlers/testimonies/editTestimonyHandler");
const deleteTestimonyHandler = require("../../handlers/testimonies/deleteTestimonyHandler");

const uploadWithErrors = (req, res, next) => {
  multer.array("images", 3)(req, res, (err) => {
    if (err instanceof Multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          message: "Solo se permiten hasta 3 imágenes.",
        });
      }

      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "El tamaño máximo por imagen es 5MB.",
        });
      }

      return res.status(400).json({
        success: false,
        message: `${err.message}`,
      });
    }

    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next();
  });
};

router.post("/post", uploadWithErrors, postTestimonyHandler);
router.get("/getById/:id", getTestimonyByIdHandler);
router.get("/getAll", getAllTestimoniesHandler);
router.put("/edit/:id", editTestimonyHandler);
router.delete("/delete", deleteTestimonyHandler);

module.exports = router;
