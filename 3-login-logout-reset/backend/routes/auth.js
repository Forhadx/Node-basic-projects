const express = require("express");
const { body } = require("express-validator");

const User = require("../models/auth");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email.")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            // throw new Error("E-mail already exist.");   // this send a msg
            return Promise.reject("E-mail already exist."); // no response
          }
        });
      }),
    body("password", "password length minimum six").trim().isLength({ min: 6 }),
    body("name", "Enter your name.").trim().notEmpty(),
  ],
  authController.signup
);

router.post(
  "/login",
  [body("email", "Enter a valid email").isEmail().normalizeEmail()],
  authController.login
);

router.post(
  "/reset",
  [body("email", "Enter a valid email").isEmail().normalizeEmail()],
  authController.reset
);

router.post("/reset/:token", authController.newPassword);

router.get("/user", isAuth, authController.userDetails);

module.exports = router;
