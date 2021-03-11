const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

/** Get single message by id */
router.get('/:id', (request, response, next) => {
  Message.findById(request.params.id, (error, message) => {
    if (error) return response.status(404).json({ error: 'Messages not found' });
    response.status(200).json(message);
  });
});

/** Save message */
router.post('/', (request, response, next) => {
  Message.create(request.body, (error, message) => {
    if (error) return response.status(404).json({ error: `Message can not be empty` });
    response.status(201).json(message);
  });
});

module.exports = router;
