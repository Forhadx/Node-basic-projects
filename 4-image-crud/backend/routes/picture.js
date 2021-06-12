const express = require("express");

const pictureController = require("../controllers/picture");
const fileUpload = require("../middleware/imageUrl");

const router = express.Router();

router.post("/add", fileUpload.single('image'), pictureController.createProduct);

module.exports = router;
