const express = require("express");
const cors = require("cors");
const { errors, isCelebrateError } = require("celebrate");

const app = express();
app.use(express.json());
app.use(cors());

const myRoute = require("./route");

app.use("/", myRoute);

// app.use(errors());
// console.log(errors);

app.use((err, req, res, next) => {
  console.log("error here..", isCelebrateError(err));
  res.json({ msg: errors });
});

app.listen(5000, () => console.log("listening on port 5000"));
