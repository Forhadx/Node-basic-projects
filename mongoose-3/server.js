require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./User");
const Blog = require("./blog");
const { findOneAndDelete } = require("./User");

mongoose.connect(process.env.URI);

//###
async function addUser() {
  const user = await User.create({ name: "a" });
  console.log(user);
}
// addUser();

//###
async function addBlog() {
  const blog = await Blog.create({ user: "634d9a95244654b568e95ba1", title: "aaaa" });
  console.log(blog);
}
// addBlog();

//###
async function deleteUserWithBlog() {
  const session = await User.startSession(); // or use any model name
  session.startTransaction();

  try {
    let userData = await User.create([{ name: "forhad" }], { session });

    let blogData = await Blog.deleteOne(
      { _id: "a" },
      {
        session,
      }
    );
    // if Blog crush to delete then userData not created.
    // But if Blog id is wrong but not crush then userData created successfully.
    // if blog data return null or undefined data then userData also created.

    await session.commitTransaction();
    session.endSession();

    // make response here
    console.log("user: ", userData);
    console.log("blog: ", blogData);
  } catch (err) {
    // If an error occurred, abort the whole transaction and
    // undo any changes that might have happened
    await session.abortTransaction();
    session.endSession();
    console.log("error: ", err);
  }
}
deleteUserWithBlog();
