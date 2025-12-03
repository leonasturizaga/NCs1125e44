const { Router } = require("express");
const router = Router();
const multerPfp = require("../../middleware/multerPfp");
const Multer = require("multer");

const postUserHandler = require("../../handlers/auth/postUserHandler");
const loginHandler = require("../../handlers/auth/loginHandler");

const uploadWithErrors = (req, res, next) => {
  multerPfp.array("image", 1)(req, res, (err) => {
    if (err instanceof Multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          message: "Solo se permite 1 imagen.",
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

router.post("/register", uploadWithErrors, postUserHandler);
router.post("/login", loginHandler);

module.exports = router;
