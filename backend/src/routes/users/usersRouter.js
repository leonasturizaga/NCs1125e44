const { Router } = require("express");
const router = Router();

const getAllUsersHandler = require("../../handlers/users/getAllUsersHandler");

router.get("/getAll", getAllUsersHandler);

module.exports = router;