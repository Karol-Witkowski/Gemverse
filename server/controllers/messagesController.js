const Message = require('../models/Message');

const getMessagesByRoom = async (req, res) => {
  const messages = await Message.find({ room: req.params.id });
    if (!messages) {
      return res.status(404).json({ error: 'Messages not found' });
    } else {
      return res.status(200).json(messages);
    }
};

const postMessage = async (req, res) => {
  if (!req.body.message) {
    return res.status(404).json({ error: 'Message must be at least 1 characters long' });
  }
  if (error) {
    return res.status(403).json({ error: 'Validation failed, please login again' });
  }

  const createdMessage = new Message({
    message: req.body.message,
    user: req.body.user,
    room: req.body.room,
  }).save();

  return res.status(201).json(createdMessage);
};

module.exports = {
  getMessagesByRoom,
  postMessage,
};
