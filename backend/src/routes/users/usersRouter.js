const { Router } = require("express");
const router = Router();
const tokenValidate = require("../../middleware/tokenValidate");

const getAllUsersHandler = require("../../handlers/users/getAllUsersHandler");
const getUserByIdHandler = require("../../handlers/users/getUserByIdHandler");
const deactivateUserHandler = require("../../handlers/users/deactivateUserHandler");
const editUserHandler = require("../../handlers/users/editUserHandler");

router.get("/getAll", tokenValidate, getAllUsersHandler);
router.get("/getById/:id", getUserByIdHandler);

router.put("/deactivate/:id", tokenValidate, deactivateUserHandler);
router.put("/edit/:id", tokenValidate, editUserHandler);

module.exports = router;