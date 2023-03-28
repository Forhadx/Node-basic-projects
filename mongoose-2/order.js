// Auto calculation

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("order_model", OrderSchema);
