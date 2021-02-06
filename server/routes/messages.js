const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

/** Get single message by id */
router.get('/:id', function(req, res, next) {
  Message.findById(req.params.id, function (error, message) {
    if (error) return res.status(404).json({ error: 'Messages not found' });
    res.status(200).json(message);
  });
});

/** Save message */
router.post('/', function(req, res, next) {
  Message.create(req.body, function (error, message) {
    if (error) return res.status(404).json({ error: `Message can not be empty` });
    res.status(200).json(message);
  });
});

module.exports = router;
