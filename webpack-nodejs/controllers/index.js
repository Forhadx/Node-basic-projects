const UserModel = require("../models/User");

exports.getUsers = async (req, res, next) => {
  try {
    const data = await UserModel.find();
    return res.json({
      msg: "all users",
      data,
    });
  } catch (err) {
    console.log("fetch error: ", err);
  }
};
