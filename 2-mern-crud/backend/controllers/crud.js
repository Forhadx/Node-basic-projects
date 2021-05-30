const Crud = require("../models/crud");

exports.getStudents = async (req, res, next) => {
  try {
    const students = await Crud.find();
    res.status(200).json({
      message: "Fetch data successfully.",
      students: students,
    });
  } catch (err) {
    console.log("fetch error: ", err);
  }
};

exports.createstudent = async (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;

  const student = new Crud({
    name: name,
    age: age,
  });
  try {
    await student.save();
    res.status(201).json({
      message: "Student details created!",
      student: student,
    });
  } catch (err) {
    console.log("create error: ", err);
  }
};

exports.updateStudent = async (req, res, next) => {
  const studentId = req.params.sid;

  const name = req.body.name;
  const age = req.body.age;

  try {
    const student = await Crud.findById(studentId);
    student.name = name;
    student.age = age;
    const result = await student.save();
    res.status(200).json({
      message: "student updated!",
      students: result,
    });
  } catch (err) {
    console.log("update error: ", err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  const studentId = req.params.sid;

  try {
    //Crud.findByIdAndRemove(studentId)
    await Crud.findByIdAndDelete(studentId);
    res.status(200).json({ message: "delete student." });
  } catch (err) {
    console.log("delete error: ", err);
  }
};
