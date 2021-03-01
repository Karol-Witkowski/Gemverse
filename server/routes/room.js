const express = require('express');
const router = express.Router();

const Room = require('../models/Room');

/** Get all rooms */
router.get('/', (req, res, next) => {
  Room.find(function(error, rooms) {
    if (error) return res.status(404).json({ error: 'Rooms not found' });
    res.status(200).json(rooms);
  });
});

/** Get single room by id */
router.get('/:id', (req, res, next) => {
  Room.findById(req.params.id, function (error, room) {
    if (error) return res.status(404).json({ error: `${req.params.name} not found` });
    res.status(200).json(room);
  });
});

/** Save room */
router.post('/', (req, res, next) => {
  Room.create(req.body, (error, room) => {
    if (error) return res.status(404).json({ error: `Desired name already taken` });
    res.status(200).json({ success: true });
  });
});

/** Password verification */
router.post('/verify', async (req, res, next) => {
  if (!req.body.password === true) {
    return res.json({
      errors: createErrorObject([
        {
          param: 'password_required',
          msg: 'Password is required'
        }
      ])
    });
  }

  const room = await Room.findOne({ name: req.body.name }).exec();

  if (room) {
    const verified = await room.isValidPassword(req.body.password);

      if (verified === true) {
        await room.save();
        return res.status(200).json();
      } else {
          return res.json({
            errors: createErrorObject([
              {
                param: 'invalid_password',
                msg: 'Invalid Password'
                }
            ])
        });
      }
  } else {
      return res.status(404).json({ errors: `No room with name ${req.params.name} found` });
  }
});

/** Update room */
router.put('/:id', (req, res, next) => {
  Room.findByIdAndUpdate(req.params.id, req.body, (error, room) => {
    if (error) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json(room);
  });
});

/** Delete room */
router.delete('/:id', (req, res, next) => {
  Room.findByIdAndRemove(req.params.id, req.body, (error, room) => {
    if (error) return res.status(404).json({ error: `${req.params.name} not found` });
    res.status(200).json(room);
  });
});

module.exports = router;
