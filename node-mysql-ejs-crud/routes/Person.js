const express = require("express");

const personController = require("../controllers/Person");

const router = express.Router();

router.get("/person", personController.getPersons);

router.post("/person", personController.addPerson);

router.post("/delete-person", personController.deletePerson);

router.get("/person/edit/:pId", personController.getEditPerson);

router.post("/person/edit", personController.addEditPerson);

module.exports = router;
