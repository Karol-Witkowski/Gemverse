const {
	getMessages,
	createMessage
} = require('../repositories/messageRepository');

const getMessagesByRoom = async (req, res) => {
  const messages = getMessages(req.room.id);

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

  const newMessage = createMessage(req);

  return res.status(201).json(newMessage);
};

module.exports = {
  getMessagesByRoom,
  postMessage,
};
