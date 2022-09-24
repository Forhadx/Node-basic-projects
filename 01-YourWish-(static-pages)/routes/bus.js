const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');

router.use('/bus', (req, res, next)=>{
    res.sendFile(path.join(rootDir, 'views', 'bus.html'));
});

module.exports = router;