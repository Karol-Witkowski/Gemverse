const express = require('express');

const authentication = require('./router/authentication');
const messages = require('./router/messages');
const room = require('./router/room');
const user = require('./router/user');

const apiRouter = express.Router();

apiRouter
  .use('/authentication', authentication)
  .use('/messages', messages)
  .use('/room', room)
  .use('/user', user);

module.exports = apiRouter;
