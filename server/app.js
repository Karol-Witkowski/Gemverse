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
  .use('/api', cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(helmet())
  .use(morgan('dev'));

/** Routes */
app.use('/api', apiRouter);

module.exports = app;
