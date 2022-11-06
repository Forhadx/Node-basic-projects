require("dotenv").config();
const mongoose = require("mongoose");
const OrderModel = require("./Order");

mongoose.connect(process.env.URI);

//###
async function addOrder() {
  let obj = {
    totalPrice: 1200,
    commission: 10,
    deliveryCharge: 100,
  };
  const orderData = await OrderModel.create(obj);

  // const orderData = await OrderModel.findOneAndUpdate(
  //   { _id: "6367a3313c7467a335a4d6b7" },
  //   { $set: { deliveryCharge: 010 } },
  //   { new: true }
  // );

  // const orderData = await OrderModel.findOne({ _id: "636756654677d6ac12f95d53" });
  // orderData.commission = 8;

  await orderData.save();

  console.log(orderData);
}
addOrder();
