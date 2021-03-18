const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');
const Room = require('../models/Room');
const router = express.Router();

/** Get all rooms */
router.get('/', passport.authenticate('jwt', { session: false }), async (request, response, next) => {
  await Room.find(function(error, rooms) {
    if (error) return response.status(404).json({ error: 'Rooms not found' });
    response.status(200).json(rooms);
  });
});

/** Get single room by name */
router.get('/:name', passport.authenticate('jwt', { session: false }), async (request, response, next) => {
  await Room.findById(request.params.id, function (error, room) {
    if (error) return response.status(404).json({ error: `${ request.body.name } not found` });
    response.status(200).json(room);
  });
});

/** Save room */
router.post('/', passport.authenticate('jwt', { session: false }), async (request, response, next) => {
  const room = await Room.findOne( { name :  { $regex : new RegExp(request.body.name, 'i') } } );

  if (room !== null) {
    return response.status(403).json({ error: `Name ${ request.body.name } is already taken` });
  } else {
    Room.create(request.body, (error, room) => {
      if (error) return response.status(403).json({ error: `Name ${ request.body.name } is already taken` });
      return response.status(201).send(room);
    });
  }
});

/** Password verification */
router.post('/verification',  passport.authenticate('jwt', { session: false }), async (request, response, next) => {
  const room = await Room.findOne({ name: request.body.name });

  if (!room) {
    return response.status(404).json({ error: `No room with name ${ request.body.name } found` });
  } else {
      if (await bcrypt.compare(request.body.password, room.password)) {
        await room.save();
        return response.status(200).send(room);
    } else return response.status(404).json({ error: 'Invalid password' });
  }
});

/** Delete room */
router.delete('/:id', passport.authenticate('jwt', { session: false }), (request, response, next) => {
  Room.findByIdAndRemove(request.body.id, request.body, (error, room) => {
    if (error) return response.status(404).json({ error: `${ request.body.name } not found` });
    response.status(200).json(room);
  });
});

module.exports = router;
