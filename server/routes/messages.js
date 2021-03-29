const express = require('express');
const Message = require('../models/Message');
const passport = require('passport');
const router = express.Router();

/** Get single message by id */
router.get('/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  Message.find({ room: request.params.id }, (error, message) => {
    if (error) return response.status(404).json({ error: 'Messages not found' });
    response.status(200).json(message);
  });
});

/** Save message */
router.post('/', passport.authenticate('jwt', { session: false }), (request, response) => {
  if (!request.body.message) {
    return response.status(404).json({ error: 'Message must be at least 1 characters long' });
  }
  if (error) return response.status(403).json({ error: 'Validation failed, please login again' });

  const message = new Message({
    message: request.body.message,
    user: request.body.user,
    room: request.body.room,
  }).save();

  return response.status(201).json(message);
});

module.exports = router;
