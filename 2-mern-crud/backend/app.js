
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const crudRoutes = require('./routes/crud');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.use('/', crudRoutes)


mongoose
.connect(
    ""
  )
.then(result =>{
    app.listen(8080);
})
.catch(err =>{
    console.log('db error: ',err);
})
