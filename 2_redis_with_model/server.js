require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./User");
const express = require("express");
const { redisClient } = require("./service/redis");
const { homeCache, removeHomeCache } = require("./service/redisMiddleware");
// const redis = require("redis");
// const redisClient = redis.createClient("redis://127.0.0.1:6379");
// redisClient.connect();

const app = express();
app.use(express.json());

// GET METHOD
app.get("/", (req, res) => {
  res.status(200).json({
    Message: "Welcome",
  });
});

// POST METHOD
app.post("/user", removeHomeCache, async (req, res) => {
  try {
    console.log("enter..");

    let userData = await User.create({
      name: "rakib",
      age: 22,
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
app.get("/users", homeCache, async (req, res) => {
  try {
    let userData = await User.find().limit(20);

    await redisClient.set("all", JSON.stringify(userData), {
      EX: 10, // 10, 200 seconds
      NX: true, //  when set to true, it ensures that the set() method should only set a key that doesn’t already exist in Redis.
    });

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
app.get("/remove", async (req, res) => {
  try {
    await redisClient.del("all");

    res.status(200).json({
      Message: "remove data..",
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
  app.listen(6000, () => {
    console.log("SERVER RUN AT 6000");
  });
});
