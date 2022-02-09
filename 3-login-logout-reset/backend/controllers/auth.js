const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const User = require("../models/auth");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

// MAILTRAP
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f8869e57fbc062",
    pass: "57ad9695a951b7",
  },
});

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, Entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  console.log("email: ", email);

  bcrypt
    .hash(password, 12)
    .then((hashPw) => {
      const user = new User({
        email: email,
        password: hashPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validator Error during login");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("Email could not be found!");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "password",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Login success!",
        token: token,
        userId: loadedUser._id.toString(),
        expiresIn: "3600",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.reset = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validator Error during login");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log("reset error: ", err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          const error = new Error("Email could not be found!");
          error.statusCode = 401;
          throw error;
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        console.log("reset token: ", token);

        // MAILTRAP
        // transport.sendMail({
        //   to: req.body.email,
        //   from: "forhadsh1@gmail.com",
        //   subject: "Password Reset",
        //   html: `
        //       <p>You requested a password reset</p>
        //       <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
        //     `,
        //   text: "hey bro, ???",
        // });

        // SENDGRID
        sgMail
          .send({
            to: req.body.email,
            from: "shakinata7@gmail.com", // Use the email address or domain you verified above
            subject: "Sending with Twilio SendGrid is Fun",
            text: "and easy to do anywhere, even with Node.js",
            html: `
                 <p>You requested a password reset</p>
                 <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
               `,
          })
          .then(
            () => {
              console.log("success?? ");
              res.status(200).json({ message: "send token to your email" });
            },
            (error) => {
              console.log(error);
            }
          );
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.newPassword = (req, res, next) => {
  const token = req.params.token;
  const newPassword = req.body.password;
  let resetUser;

  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashPw) => {
      resetUser.password = hashPw;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.status(200).json({ message: "reset done." });
    })
    .catch((err) => console.log(err));
};

exports.userDetails = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      console.log("u: ", user);
      res.status(200).json({ message: "user details", user: user });
    })
    .catch((err) => {
      console.log(err);
    });
};
