const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');
const Room = require('../models/Room');
const router = express.Router();

/** Get all rooms */
router.get('/', passport.authenticate('jwt', { session: false }), async (request, response) => {
  await Room.find(function(error, rooms) {
    if (error) return response.status(404).json({ error: 'Rooms not found' });
    response.status(200).json(rooms);
  });
});

/** Get single room by slug */
router.get('/:slug', passport.authenticate('jwt', { session: false }), async (request, response) => {
  await Room.findOne({ slug: request.params.slug }, function (error, room) {
    if (error) return response.status(404).json({ error: `${ request.params.slug } not found` });
    response.status(200).json(room);
  });
});

/** Save room */
router.post('/', passport.authenticate('jwt', { session: false }), async (request, response) => {
  const room = await Room.findOne({ name:  { $regex : new RegExp(request.body.name, 'i') } });

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
router.post('/verification',  passport.authenticate('jwt', { session: false }), async (request, response) => {
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
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (request, response) => {
  const room = await Room.findById({ _id: request.params.id });
    if (!room) {
      return response.status(404).json({ error: `Room not found` });
    } else {
      if (request.body._id === room.user.toString()) {
        room.delete();
        response.status(200).json({ message: 'Room deleted'});
      } else return response.status(404).json({ error: 'Users are allowed to delete only own rooms' });
    }
});

/** Remove user on room leave event */
router.post('/remove/online/user', passport.authenticate('jwt', { session: false }), async (request, response) => {
  const room = await Room.findById({ _id: request.body.id });

  if (!room) {
    return response.status(404).json({ error: `No room with id ${ request.body.id } found` });
  } else {
    if (room.activeUsers.find((user) => user.lookup.toString() === request.user.id)) {
      room.activeUsers = room.activeUsers.filter((user) => user.lookup.toString() !== request.user.id);
      await room.save();
    }
    return response.status(200).json(await Room.populate(room, {
      path: 'user activeUsers.lookup',
      select: 'username'
    }));
  }
});


module.exports = router;
