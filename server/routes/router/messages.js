const express = require('express');
const Message = require('../../models/Message');
const passport = require('passport');
const messages = express.Router();

/** Get all room messages by id */
messages.get('/:id', passport.authenticate('jwt', { session: false }), async (request, response) => {
  const messages = await Message.find({ room: request.params.id });
    if (!messages) {
      return response.status(404).json({ error: 'Messages not found' });
    } else {
      return response.status(200).json(messages);
    }
});

/** Save message */
messages.post('/', passport.authenticate('jwt', { session: false }), (request, response) => {
  if (!request.body.message) {
    return response.status(404).json({ error: 'Message must be at least 1 characters long' });
  }
  if (error) {
    return response.status(403).json({ error: 'Validation failed, please login again' });
  }

  const createdMessage = new Message({
    message: request.body.message,
    user: request.body.user,
    room: request.body.room,
  }).save();

  return response.status(201).json(createdMessage);
});

module.exports = messages;
