const { Router } = require("express");
const router = Router();

const authRouter = require("../routes/auth/authRouter");
const testimonyRouter = require("../routes/testimonies/testimoniesRouter");
const usersRouter = require("../routes/users/usersRouter");
const categoriesRouter = require("../routes/categories/categoriesRouter");

router.use("/auth", authRouter);
router.use("/testimonies", testimonyRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
