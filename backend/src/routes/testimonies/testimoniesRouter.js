const { Router } = require("express");
const router = Router();

const postTestimonyHandler = require("../../handlers/testimonies/postTestimonyHandler");
const getTestimonyByIdHandler = require("../../handlers/testimonies/getTestimonyByIdHandler");
const getAllTestimoniesHandler = require("../../handlers/testimonies/getAllTestimoniesHandler");
const editTestimonyHandler = require("../../handlers/testimonies/editTestimonyHandler");
const deleteTestimonyHandler = require("../../handlers/testimonies/deleteTestimonyHandler");

router.post("/post", postTestimonyHandler);
router.get("/getById/:id", getTestimonyByIdHandler);
router.get("/getAll", getAllTestimoniesHandler);
router.put("/edit/:id", editTestimonyHandler);
router.delete("/delete", deleteTestimonyHandler);

module.exports = router;