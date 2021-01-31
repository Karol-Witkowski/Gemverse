const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

/** Get all messages */
router.get('/', function(req, res, next) {
  Message.find(function(err, messages) {
    if (messages) return res.status(200).json(messages);
    res.status(404).json(err);
  });
});

/** Get single message by id */
router.get('/:id', function(req, res, next) {
  Message.findById(req.params.id, function (err, message) {
    if (message) return res.status(200).json(message);
    res.status(404).json(err);
  });
});

/** Save message */
router.post('/', function(req, res, next) {
  Message.create(req.body, function (err, message) {
    if (message) return res.status(200).json(message);
    res.status(404).json(err);
  });
});

/** Update message */
router.put('/:id', function(req, res, next) {
  Message.findByIdAndUpdate(req.params.id, req.body, function (err, message) {
    if (message) return res.status(200).json(message);
    res.status(404).json(err);
  });
});

/** Delete message */
router.delete('/:id', function(req, res) {
  Message.findByIdAndRemove(req.params.id, req.body, function (err, message) {
    if (message) return res.status(200).json(message);
    res.status(404).json(err);
  });
});

module.exports = router;
