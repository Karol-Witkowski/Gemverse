require('dotenv').config();

const { logger } = require('../../config/logger.js');
const Message = require('../../models/Message');
const { messagesSeedData, roomsSeedData, usersSeedData } = require('./seedData');
const { mongoose, dbConnect } = require('../../db/mongoose');
const Room = require('../../models/Room');
const User = require('../../models/User');

const populateData = async () => {
  if (mongoose.connection.readyState === 0) {
    dbConnect();
  }

  let userId;
  let roomId;

  await User.deleteMany({}).exec();

  for (let user of usersSeedData) {
    const userData = await new User({
      username: user.username,
      email: user.email,
      password: user.password,
    }).save();

    userId = userData._id;
  }

  logger.info('[PROCESS:FIN] Users seed ready');

  await Room.deleteMany({}).exec();

  for (let room of roomsSeedData) {
    const roomData = await new Room({
      name: room.name,
      user: userId,
      access: room.password ? 'private' : 'public',
      password: room.password,
    }).save();

    roomId = roomData._id;
  }

  logger.info('[PROCESS:FIN] Rooms seed ready');

  await Message.deleteMany({}).exec();

  for (let message of messagesSeedData) {
    await new Message({
      message: message.message,
      user: userId,
      room: roomId,
    }).save();
  }

  logger.info('[PROCESS:FIN] Messages seed ready');

  await mongoose.connection.close();
};

module.exports = { populateData };
