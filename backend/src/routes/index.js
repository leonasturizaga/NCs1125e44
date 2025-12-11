const { Router } = require("express");
const router = Router();

const authRouter = require("./auth/authRouter");
const testimonyRouter = require("./testimonies/testimoniesRouter");
const usersRouter = require("./users/usersRouter");
const categoriesRouter = require("./categories/categoriesRouter");
const videoTestimonialsRoutes = require("./videoTestimonials.routes");

router.use("/auth", authRouter);
router.use("/testimonies", testimonyRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/video-testimonials", videoTestimonialsRoutes);

module.exports = router;
