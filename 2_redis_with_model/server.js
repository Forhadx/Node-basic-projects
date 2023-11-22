require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./User");
const express = require("express");
const redis = require("redis");
const client = redis.createClient();
// const client = redis.createClient("redis://127.0.0.1:6379");
client.connect();

const app = express();
app.use(express.json());

// POST METHOD
app.post("/user", async (req, res) => {
  try {
    // const key = req.params.key;
    // const value = req.params.value;
    // await client.set(key, value);
    let userData = await User.create({
      name: "forhad",
      age: 23,
      age: 23,
    });

    res.status(201).json({
      data: userData,
      Message: "Add value to redis server successfully.",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: "Could add key and values to redis server!",
    });
  }
});

// GET METHOD
app.get("/users", async (req, res) => {
  try {
    // const key = req.params.key;

    const value = await client.get("all");

    if (value) {
      return res
        .status(404)
        .json({ data: JSON.parse(value), message: "got it" });
    }

    let userData = await User.find();

    await client.set("all", JSON.stringify(userData));

    res.status(200).json({
      data: userData,
      Message: "Fetch key value form redis server successfully.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Couldn't fetch key values to redis server!" });
  }
});

// GET METHOD
app.get("/user/:id", async (req, res) => {
  try {
    // const key = req.params.key;
    // const value = await client.get(key);

    // if (!value) {
    //   return res
    //     .status(404)
    //     .json({ message: `Couldn't find key: '${key}' value!` });
    // }

    res.status(200).json({
      Message: "Fetch key value form redis server successfully.",
      key: key,
      value: value,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Couldn't fetch key values to redis server!" });
  }
});

mongoose.connect(process.env.URI, () => {
  console.log("database connection established");
  // START THE SERVER
  app.listen(5000, () => {
    console.log("SERVER RUN AT 5000");
  });
});
