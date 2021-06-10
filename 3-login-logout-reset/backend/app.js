const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());


app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})


app.use("/", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log(message)
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://forhad12:forhad123456@cluster0.sonyg.mongodb.net/formdb?authSource=admin&replicaSet=atlas-12s196-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
