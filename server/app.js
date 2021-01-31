/** Dotenv variables */
require('dotenv').config();

/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

/** Connect to MongoDB */
const mongoose = require('mongoose');
require('./db/mongoose');

/** Logging */
const logger = require('morgan');

const room = require('./routes/room');
const messages = require('./routes/messages');
const app = express();

/** Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'dist')));

/** Routes */
app.use('/rooms', express.static(path.join(__dirname, 'dist')));
app.use('/api/room', room);
app.use('/api/messages', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;
