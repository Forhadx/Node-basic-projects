const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelizeDb = require("./util/database");
const personRoutes = require("./routes/Person");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", personRoutes);

sequelizeDb
  //   .sync({ force: true })
  .sync()
  .then(() => {
    console.log("Server start at: 3000");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
