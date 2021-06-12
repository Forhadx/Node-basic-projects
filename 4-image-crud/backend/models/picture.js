const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, require: true },
  price: { type: String, require: true },
  image: { type: String, require: true },
});

module.exports = mongoose.model('Products', productSchema);