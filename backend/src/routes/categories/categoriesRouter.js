const { Router } = require("express");
const router = Router();
const tokenValidate = require("../../middleware/tokenValidate");

const postCategoryHandler = require("../../handlers/categories/postCategoryHandler");
const getAllCategoriesHandler = require("../../handlers/categories/getAllCategoriesHandler");

router.post("/post", tokenValidate, postCategoryHandler);

router.get("/getAll", getAllCategoriesHandler);

module.exports = router;