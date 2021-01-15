/** Express */
const express = require('express');
const port = 3000;
const app = express();

/** Socket IO */
const io = require('socket.io');
const http = require('http');

app.get('/', (req, res) => {
  res.send('Testing express test');
})

app.listen(port, () => {
  console.log(`Gemverse backend listening at http://localhost:${port}`);
})
