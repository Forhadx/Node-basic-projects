const express = require("express");
const redis = require("redis");
const client = redis.createClient();
// const client = redis.createClient("redis://127.0.0.1:6379");
client.connect();

const app = express();
app.use(express.json());

// POST METHOD
app.post("/post/:key/:value", async (req, res) => {
  try {
    const key = req.params.key;
    const value = req.params.value;
    await client.set(key, value);

    res.status(201).json({
      Message: "Add value to redis server successfully.",
      key: key,
      value: value,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could add key and values to redis server!" });
  }
});

// GET METHOD
app.get("/post/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const value = await client.get(key);

    if (!value) {
      return res
        .status(404)
        .json({ message: `Couldn't find key: '${key}' value!` });
    }

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

// START THE SERVER
app.listen(5000, () => {
  console.log("SERVER RUN AT 5000");
});
