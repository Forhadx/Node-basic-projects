require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const UserModel = require("./user");
const BlogModel = require("./blog");

const app = express();

const updateFunction = async (blogData, session) => {
  const data = await BlogModel.findOneAndUpdate(
    // { _id: blogData[0]?._id },
    { _id: "64232819f17a9b64003920f6_asdf" }, // create error
    { $set: { title: "abc" } },
    { new: true, session }
  );
  return data;
};

app.use("/do", async (req, res) => {
  const session = await mongoose.startSession();
  // Start a transaction within the session
  session.startTransaction();

  try {
    const userData = await UserModel.create([{ name: "xyz" }], { session });
    const blogData = await BlogModel.create(
      [
        {
          // user: "64232819f17a9b64003920f6_asdf",
          user: userData[0]?._id,
          title: "abc",
        },
      ],
      { session }
    );

    const data = await updateFunction(blogData, session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({ msg: "yes", data, data2: blogData });
  } catch (err) {
    // End the session
    session.endSession();
    res.json({ msg: "no" });
  }
  await mongoose.connection.close();
});

app.use("/", async (req, res) => {
  const user = await UserModel.find({});
  res.json({ data: user, msg: "yes" });
});

const PORT = 5000;

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log("server run at: ", PORT);
    });
  })
  .catch((err) => console.log(err));
