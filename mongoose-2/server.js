require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect(process.env.URI);

async function addFriends() {
  const user = await User.findById("62c161794a7e668f12084528");

  user.friends.push("62c161beb1af2afef7f41ea2"); // add friends by user id in user friends[] array

  await user.save();

  console.log(user);
}

// addFriends();

async function fetch() {
  // const users = await User.find().select("+age"); // age must be select otherwise not fetch

  const users = await User.findById("62c161794a7e668f12084528")
    .select("+age") // age must be select otherwise not fetch
    .populate("friends _id name"); // populate Friends data , age not populate here

  console.log("users: ", users);
}
// fetch();

async function removeFriends() {
  const user = await User.findById("62c161794a7e668f12084528");
  user.friends.pull("62c161beb1af2afef7f41ea2"); // remove id of friends array
  await user.save();

  console.log("user: ", user);
}
// removeFriends();

async function fetchByName() {
  let n = "f";
  const users = await User.find({ name: new RegExp(n, "i") });

  console.log("Users: ", users);
}

fetchByName();
