const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const wishRoute = require('./routes/wish');
const carRoute = require('./routes/car');
const busRoute = require('./routes/bus');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

app.use(wishRoute);
app.use(carRoute);
app.use(busRoute);

app.listen(3000);