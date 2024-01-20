const express = require('express');

const controller = require('../controllers');

const router = express.Router();

router.get('/users', controller.getUsers);

module.exports = router; 