const { Router } = require("express");
const router = Router();

const authRouter = require("../routes/auth/authRouter");

router.use("/auth", authRouter);

module.exports = router;
