require('dotenv').config();

const { logger } = require('../config/logger');
const { Message } = require('../../models/Message');
const { messagesSeedData, roomsSeedData, usersSeedData } = require('./seedData');
const { mongoose, connect } = require('../../db/mongoose');
const { Room } = require('../../models/Room');
const URLSlugs = require('mongoose-url-slugs');
const { User } = require('../../models/User');

const populateData = async () => {
  if (mongoose.connection.readyState === 0) {
    connect();
  }

  let userId;
  let roomId;

  logger.info('\n[PROCESS:SEED] Seeding Users...');

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

  logger.info('[PROCESS:SEED] Seeding Rooms...');

  await Room.deleteMany({}).exec();

  for (let room of roomsSeedData) {
    const roomData = await new Room({
      name: room.name,
      user: userId,
      access: room.password ? false : true,
      password: room.password,
    }).save();
    roomId = roomData._id;
  }

  logger.info('[PROCESS:FIN] Rooms seed ready');

  logger.info('[PROCESS:SEED] Seeding Messages...');

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
