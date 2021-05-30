const express = require('express');

const crudController = require('../controllers/crud');

const router = express.Router();

router.get('/students', crudController.getStudents);

router.post('/student', crudController.createstudent);

router.put('/student/:sid', crudController.updateStudent);

router.delete('/student/:sid', crudController.deleteStudent);

module.exports = router; 