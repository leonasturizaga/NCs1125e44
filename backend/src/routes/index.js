const { Router } = require("express");
const router = Router();

const authRouter = require("./auth/authRouter");
const testimonyRouter = require("./testimonies/testimoniesRouter");
const usersRouter = require("./users/usersRouter");
const categoriesRouter = require("./categories/categoriesRouter");
const videoTestimonialsRoutes = require("./videoTestimonials.routes");
const authRouter = require("../routes/auth/authRouter");
const testimonyRouter = require("../routes/testimonies/testimoniesRouter");
const usersRouter = require("../routes/users/usersRouter");
const categoriesRouter = require("../routes/categories/categoriesRouter");
//embeds routes
const embedRoutes = require("../routes/embedRoutes");

router.use("/auth", authRouter);
router.use("/testimonies", testimonyRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/video-testimonials", videoTestimonialsRoutes);
//embeds
router.use("/", embedRoutes);

module.exports = router;
