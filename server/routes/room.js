const bcrypt = require('bcrypt');
const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

/** Get all rooms */
router.get('/', (request, response, next) => {
  Room.find(function(error, rooms) {
    if (error) return response.status(404).json({ error: 'Rooms not found' });
    response.status(200).json(rooms);
  });
});

/** Get single room by name */
router.get('/:name', (request, response, next) => {
  Room.findById(request.params.id, function (error, room) {
    if (error) return response.status(404).json({ error: `${ request.body.name } not found` });
    response.status(200).json(room);
  });
});

/** Save room */
router.post('/', async (request, response, next) => {
  await Room.create(request.body, (error, room) => {
    if (error) return response.status(403).json({ error: `Name ${ request.body.name } is already taken` });
    return response.status(201).send(room);
  })
});

/** Password verification */
router.post('/verification', async (request, response, next) => {
  const room = await Room.findOne({ name: request.body.name })

  if (room) {
    if (await bcrypt.compare(request.body.password, room.password)) {
      await room.save();
      return response.status(200).send(room);
    } else return response.status(404).json({ error: "Invalid password" });
  } else {
    return response.status(404).json({ error: `No room with name ${request.body.name} found` });
  }
});

/** Delete room */
router.delete('/:id', (request, response, next) => {
  Room.findByIdAndRemove(request.params.id, request.body, (error, room) => {
    if (error) return response.status(404).json({ error: `${request.params.name} not found` });
    response.status(200).json(room);
  });
});

module.exports = router;
