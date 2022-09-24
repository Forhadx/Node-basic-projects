const express = require("express");
const { celebrate } = require("celebrate");

const userController = require("./controller");

const userValidation = require("./validation");

const validate = require("./validate");

const router = express.Router();

// router
//   .route("/a")
//   .post([celebrate(userValidation.signValidation)], userController.signup);

router.post("/a", validate(userValidation.signValidation), userController.signup);

module.exports = router;
