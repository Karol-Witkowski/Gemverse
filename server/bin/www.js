const app = require('../app');
const debug = require('debug')('express-test:server');
const http = require('http');
const { logger } = require('../config/logger');

/** Set port and create server */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

/** Establish socket.io connection */
const socketApi = require('../socket/index');
const io = socketApi.io;

io.attach(server);

/** Listen to the port and handle errors */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

if (process.env.NODE_ENV === 'test') {
  server.listen(3000, () => {
    logger.info('[LOG=SERVER] Server started on port 3000');
  });
}

if (process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT || 3000, () => {
    logger.info(`[LOG=SERVER] Server started on port ${process.env.PORT || 3000}`);
  });
}

server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
