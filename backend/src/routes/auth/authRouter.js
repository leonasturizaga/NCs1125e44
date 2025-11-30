const { Router } = require("express");
const router = Router();

const postUserHandler = require("../../handlers/auth/postUserHandler");
const loginHandler = require("../../handlers/auth/loginHandler");

router.post("/register", postUserHandler);
router.post("/login", loginHandler);

module.exports = router;
