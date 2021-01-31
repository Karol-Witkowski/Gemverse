const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

/** Get all rooms */
router.get('/', function(req, res, next) {
  Room.find(function(err, rooms) {
    if (rooms) return res.status(200).json(rooms);
    res.status(404).json(err);
  });
});

/** Get single room by id */
router.get('/:id', function(req, res, next) {
  Room.findById(req.params.id, function (err, room) {
    if (room) return res.status(200).json(room);
    res.status(404).json(err);
  });
});

/** Save room */
router.post('/', function(req, res, next) {
  Room.create(req.body, function (err, room) {
    if (room) return res.json(room);
    res.status(404).json(err);
  });
});

/** Update room */
router.put('/:id', function(req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, room) {
    if (room) return res.status(200).json(room);
    res.status(404).json(err);
  });
});

/** Delete room */
router.delete('/:id', function(req, res) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, room) {
    if (room) return res.status(200).json(room);
    res.status(404).json(err);
  });
});

module.exports = router;
