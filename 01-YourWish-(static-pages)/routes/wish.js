const express = require('express');
const router = express.Router();

const path = require('path');

const rootDir = require('../util/path');

router.get('/', (req, res, next)=>{
    //res.send('<h1>home</h1>');
    res.sendFile(path.join(rootDir, 'views', 'wish.html'));
})

router.post('/', (req, res, next)=>{
    if(req.body.title === 'Car'){
        res.redirect('/car');
    }else if(req.body.title === "Bus"){
        res.redirect('/bus');
    }else{
        res.redirect('/');
    }
    //console.log(req.body.title);
})

module.exports = router;

