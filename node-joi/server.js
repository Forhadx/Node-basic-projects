const express = require("express");
const cors = require("cors");
const {  isCelebrateError } = require("celebrate");

const app = express();
app.use(express.json());
app.use(cors());

const myRoute = require("./route");

app.use("/", myRoute);

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get("body"); 
    console.log(errorBody.details[0].message);

    return res.send({
      statusCode: 400,
      message: errorBody.details[0].message
    });
  }
});

app.listen(5000, () => console.log("listening on port 5000"));
