const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("User", User);
