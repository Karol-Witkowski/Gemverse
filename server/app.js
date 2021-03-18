/** Enable .global variables */
require('dotenv').config();

/** express */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');

/** Passport config */
const passport = require('passport');
require('./config/passport')(passport);

const app = express();

/* Connect to MongoDB cluster */
require('./db/mongoose');

/** Middleware */
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

/** Routes */
const authentication = require('./routes/authentication');
const messages = require('./routes/messages');
const room = require('./routes/room');

app.use('/api/authentication', authentication);
app.use('/api/messages', messages);
app.use('/api/room', room);
//app.use('/api/user', user);

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
