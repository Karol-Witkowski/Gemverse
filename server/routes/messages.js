const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

/** Get single message by id */
router.get('/:id', (req, res, next) => {
  Message.findById(req.params.id, (error, message) => {
    if (error) return res.status(404).json({ error: 'Messages not found' });
    res.status(200).json(message);
  });
});

/** Save message */
router.post('/', (req, res, next) => {
  Message.create(req.body, (error, message) => {
    if (error) return res.status(404).json({ error: `Message can not be empty` });
    res.status(200).json(message);
  });
});

module.exports = router;
