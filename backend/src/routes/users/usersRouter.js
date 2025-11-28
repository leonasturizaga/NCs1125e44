const { Router } = require("express");
const router = Router();

const getAllUsersHandler = require("../../handlers/users/getAllUsersHandler");
const getUserByIdHandler = require("../../handlers/users/getUserByIdHandler");
const deactivateUserHandler = require("../../handlers/users/deactivateUserHandler");
const editUserHandler = require("../../handlers/users/editUserHandler");

router.get("/getAll", getAllUsersHandler);
router.get("/getById/:id", getUserByIdHandler);

router.put("/deactivate/:id", deactivateUserHandler);
router.put("/edit/:id", editUserHandler);

module.exports = router;