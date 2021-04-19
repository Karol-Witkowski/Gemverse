/** Enable .global variables */
require('dotenv').config();

/** express */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');

/** Passport config */
const passport = require('passport');
require('./config/passport');

const app = express();

/* Connect to MongoDB cluster */
require('./db/mongoose');

/** Middleware */
app
  .use(logger('dev'))
  .use(helmet())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(express.static(path.join(__dirname, 'dist')));

/** Routes */
const apiRouter = require('./routes/index');

app.use('/api', apiRouter);

/** Errors handler */
app.use((request, response, next) => {
  const error = new Error('404 Not Found');
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};
  response.status(error.status || 500);
  response.sendStatus(error.status);
  next(error);
});

module.exports = app;
