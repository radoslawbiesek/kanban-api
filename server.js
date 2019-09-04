const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Use ES6 Promise
mongoose.promise = global.Promise;

const app = express();

// Use body-parser
app.use(bodyParser.json());

// Connect routes
const cardRoutes = require('./routes/card.routes');
app.use('/', cardRoutes);

const columnRoutes = require('./routes/column.routes');
app.use('/', columnRoutes);

// Import config
const { port, mongoUrl } = require('./config');

// Connect MongoDB
mongoose.connect(mongoUrl, {useNewUrlParser: true}, (err) => {
    if (err) throw err;
});

// Turn on server
app.listen(port, () => console.log(`App is listening on port ${port}.`));