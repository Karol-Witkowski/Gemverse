/** Enable env variables */
require('dotenv').config();

/** Node dependencies */
const path = require('path');

/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const app = express();

/** Connect to MongoDB cluster */
require('./db/mongoose');

/** Middleware */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'dist')));

/** Routes */
const room = require('./routes/room');
const messages = require('./routes/messages');

app.use('/api/room', room);
app.use('/api/messages', messages);

/** Errors handler */
app.use((req, res, next) => {
  const error = new Error('404 Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(error.status || 500);
  res.sendStatus(error.status);
});

module.exports = app;
