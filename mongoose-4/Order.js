const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    totalBill: {
      type: Number,
      default: 0,
    },
    revenue: {
      adminRev: {
        type: Number,
        default: 0,
      },
      vendorRev: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("save", async function (done) {
  //   if (this.isModified("totalPrice") || this.isModified("commission")) {
  this.set("revenue.vendorRev", this.totalBill - this.revenue.adminRev);
  this.set("revenue.adminRev", (this.totalBill * this.commission) / 100);
  this.set("totalBill", this.totalPrice + this.deliveryCharge);
  //   }
  done();
});

module.exports = mongoose.model("order", OrderSchema);
