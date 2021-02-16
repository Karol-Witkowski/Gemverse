/** Dotenv variables */
require('dotenv').config();

/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

/** Connect to MongoDB */
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
app.use('/api/room', room);
app.use('/api/messages', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('404 Not Found');
  error.status = 404;
  next(error);
});

app.use(function(error, req, res, next) {
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(error.status || 500);
  res.sendStatus(error.status);
});

module.exports = app;
