const {
  createMessage,
	getMessages
} = require('../repositories/messageRepository');

const getMessagesByRoom = async (req, res) => {
  const messages = getMessages(req.room.id);

    if (!messages) {
      return res.status(404)
        .json({
          message: 'Messages not found',
          success: false
        });
    } else {
      return res.status(200)
        .json({
          data: messages,
          success: true
        });
    }
};

const postMessage = async (req, res) => {
  if (!req.body.message) {
    return res.status(404)
      .json({
        message: 'Message must be at least 1 characters long',
        success: false
      });
  }
  if (error) {
    return res.status(403)
      .json({
        message: 'Validation failed, please login again',
        success: false
      });
  }

  const newMessage = createMessage({
    message: req.body.message,
    room: req.body.room,
    user: req.body.user,
  });

  return res.status(201)
    .json({
      message: newMessage,
      success: true
    });
};

module.exports = {
  getMessagesByRoom,
  postMessage,
};
