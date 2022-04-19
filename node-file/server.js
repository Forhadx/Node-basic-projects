/*
    ayschronous :
         readFile, writeFile

    Synchronous:
        readFileSync, writeFileSync

*/

const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.use(express.json());

app.use("/add-person", (req, res) => {
  const { name, age, gender } = req.body;
  let personObj = {
    name,
    age,
    gender,
  };

  const filePath = path.join(process.cwd(), "files", "persons.json");

  let persons = [];

  //  const fileData = fs.readFileSync(filePath); // another read system
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).json({ message: "something went Wrong!" });
    }

    persons = JSON.parse(data);
    let updatePersons = [...persons, personObj];

    // fs.writeFileSync(filePath, JSON.stringify(data)); // another write system
    fs.writeFile(filePath, JSON.stringify(updatePersons), (err) => {
      if (err) {
        return res.status(404).json({ message: "something went Wrong!" });
      }
      res.json({ message: "Added a person", persons: updatePersons });
    });
  });
});

app.use("/get-persons", (req, res) => {
  const filePath = path.join(process.cwd(), "files", "persons.json");

  //  const fileData = fs.readFileSync(filePath); // another read system
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).json({ message: "something went Wrong!" });
    }

    res.json({ message: "fetch all persons", persons: JSON.parse(data) });
  });
});

app.listen(5000, () => {
  console.log("Server run at 5000.");
});
