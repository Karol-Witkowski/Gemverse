const apiRouter = require('./routes/index');

if (process.env.HEROKU_DEPLOYMENT !== 'true') {
  require('dotenv').config();
}

/** Main */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

/** Logger */
const morgan = require('morgan');

/** Passport config */
require('./config/passport');

/** Connect to DB */
require('./db/mongoose');

/** Middleware's */

app
  .use(cors())
  .use(helmet())
  .use(morgan('dev'))
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

if (process.env.HEROKU_DEPLOYMENT === 'true') {
  app.enable('trust proxy');
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

/** Routes */
app.use('/api', apiRouter);

/** Errors handler */
app.use((next) => {
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
