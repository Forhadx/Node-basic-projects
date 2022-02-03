const Person = require("../models/Person");

exports.getPersons = async (req, res, next) => {
  try {
    let persons = await Person.findAll();
    res.render("index", {
      pageTitle: "All Person",
      path: "/person",
      personList: persons,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addPerson = async (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;
  const work = req.body.work;
  try {
    await Person.create({
      name: name,
      age: age,
      work: work,
    });
    res.redirect("/person");
  } catch (err) {
    console.log(err);
  }
};

exports.deletePerson = async (req, res, next) => {
  let id = req.body.personId;
  try {
    let person = await Person.findByPk(id);
    await person.destroy();
    res.redirect("/person");
  } catch (err) {
    console.log(err);
  }
};

exports.getEditPerson = async (req, res, next) => {
  // console.log("up get", req.params.pId);
  // res.render('index',{
  // })
};

exports.addEditPerson = async (req, res, next) => {
  console.log("up");
};
