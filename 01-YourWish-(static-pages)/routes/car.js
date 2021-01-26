const path = require('path');

const express = require("express");
const router = express.Router();

const rootDir = require('../util/path');

router.use("/car", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'car.html'));
});

module.exports = router;
