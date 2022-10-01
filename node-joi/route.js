const express = require("express");
const { celebrate } = require("celebrate");

const userController = require("./controller");

const userValidation = require("./validation");

const validate = require("./validate");

const router = express.Router();

router.route("/a/:id").post([celebrate(userValidation.advance)], userController.signup);

router.post("/b", validate(userValidation.signValidation), userController.signup);

module.exports = router;


/*
    http://localhost:5000/a/3?page=3

*/