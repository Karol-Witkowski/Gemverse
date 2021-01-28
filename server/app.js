/** Express */
const express = require('express');
const port = process.env.PORT || "3000";
const app = express();
const cors = require('cors')
const helmet = require('helmet');
const server = require('http').createServer(app);

/** Socket IO */
const io = require('socket.io');
const http = require('http');

/** Addons */
const chalk = require('chalk');

/** app setup */
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Express test');
})

server.listen(port, () => {
  console.log(chalk.bgGreen.bold(`Gemverse backend listening at http://localhost:${port}`));
})
