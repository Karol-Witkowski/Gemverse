const { createMessage } = require('../repositories/messageRepository');
const { validatorResult } = require('../validators/validationResult');

const postMessage = async (req, res) => {
  createMessage({
    message: req.body.message,
    room: req.body.room,
    user: req.body.user,
  })
    .then((message) => {
      return res.status(201).json({
        data: message,
        success: true,
      });
    })
    .catch((error) => {
      validatorResult(req, res, error);
    });
};

module.exports = { postMessage };
