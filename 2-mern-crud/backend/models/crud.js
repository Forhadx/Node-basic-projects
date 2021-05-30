const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('student', studentSchema);