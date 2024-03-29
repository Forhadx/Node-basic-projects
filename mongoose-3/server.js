require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./User");
const Blog = require("./blog");

mongoose.connect(
  process.env.URI,
  {
    poolSize: 2,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 60000,
    tlsInsecure: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("mongdb is connected");
  }
);
// mongoose.set("strictQuery", false);

//###
async function addUser() {
  console.log("user...");
  // const user = await User.create([
  //   { name: "a" },
  //   { name: "b" },
  //   { name: "c" },
  //   { name: "d" },
  //   { name: "e" },
  // ]);
  const user = await User.create({ name: "a" });
  // const user = await User.find()
  console.log('user: ',user);
}
addUser();

//###
async function addBlog() {
  const blog = await Blog.create({
    user: "634d9a95244654b568e95ba1",
    title: "aaaa",
  });
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
// deleteUserWithBlog();
