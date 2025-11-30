const { Router } = require("express");
const router = Router();

const authRouter = require("../routes/auth/authRouter");
const testimonyRouter = require("../routes/testimonies/testimoniesRouter");
const usersRouter = require("../routes/users/usersRouter");

router.use("/auth", authRouter);
router.use("/testimonies", testimonyRouter);
router.use("/users", usersRouter);

module.exports = router;
