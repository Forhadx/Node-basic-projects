const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const pictureRoute = require("./routes/picture");

const app = express();

app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });


app.use("/", pictureRoute);

mongoose
  .connect(
    "mongodb+srv://forhad12:forhad123456@cluster0.sonyg.mongodb.net/file_upload_download?authSource=admin&replicaSet=atlas-12s196-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
