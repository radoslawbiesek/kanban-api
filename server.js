const express = require('express');
const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const bodyParser = require('body-parser');

const cardRoutes = require('./routes/card.routes');
const columnRoutes = require('./routes/column.routes');

const app = express();

// Use body-parser
app.use(bodyParser.json());

// Connect routes
app.use('/', cardRoutes);

app.use('/', columnRoutes);

// Import config
const { port, mongoUrl } = require('./config');

// Connect MongoDB
mongoose.connect(mongoUrl, {useNewUrlParser: true}, (err) => {
    if (err) throw err;
});

// Turn on server
app.listen(port, () => console.log(`App is listening on port ${port}.`));