const express = require("express");

const personController = require("../controllers/Person");

const router = express.Router();

router.get("/person", personController.getPersons);

router.post("/person", personController.addPerson);

router.post("/delete-person", personController.deletePerson);

router.get("/edit-person/:pId", personController.getEditPerson);

router.post("/edit-person/", personController.addEditPerson);

module.exports = router;
