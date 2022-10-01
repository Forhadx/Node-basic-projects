const express = require("express");
const cors = require("cors");
const { isCelebrateError } = require("celebrate");

const app = express();
app.use(express.json());
app.use(cors());

const myRoute = require("./route");

app.use("/", myRoute);

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    let errorMsg = "Validation Error!";

    const errorBody = err.details.get("body");
    if(errorBody){
      errorMsg = errorBody.details[0].message;
    }

    const errorParam = err.details.get("params");
    if (errorParam) {
      errorMsg = errorParam.details[0].message
    }

    const errorQuery = err.details.get("query");
    if (errorQuery) {
      errorMsg = errorQuery.details[0].message
    }

    // console.log(errorMsg);

    return res.send({
      statusCode: 400,
      message: errorMsg
    });
  }
});

app.listen(5000, () => console.log("listening on port 5000"));
