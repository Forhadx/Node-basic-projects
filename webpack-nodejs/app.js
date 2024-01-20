require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./User");

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  const data = await User.find();
  return res.json({
    msg: "all users",
    data,
  });
});

app.listen(5000, () => {
  console.log("server listening on port 5000");

  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sonyg.mongodb.net/mongo_practice`,
    () => {
      console.log("db connection established");
    }
  );
});
