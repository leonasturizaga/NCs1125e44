const { Router } = require("express");
const router = Router();

const authRouter = require("../routes/auth/authRouter");
const testimonyRouter = require("../routes/testimonies/testimoniesRouter");

router.use("/auth", authRouter);
router.use("/testimonies", testimonyRouter);

module.exports = router;
