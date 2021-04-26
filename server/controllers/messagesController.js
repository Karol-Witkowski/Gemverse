const { validatorResult } = require("../validators/validationResult");
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
  const newMessage = createMessage({
    message: req.body.message,
    room: req.body.room,
    user: req.body.user,
  })
    .then((res) => {
      return res.status(201)
        .json({
          message: newMessage,
          success: true
        });
    })
    .catch((error) => {
      validatorResult(req, res, error);
    });
};

module.exports = {
  getMessagesByRoom,
  postMessage,
};
