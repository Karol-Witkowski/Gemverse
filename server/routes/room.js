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
    res.status(200).json(room);
  });
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
