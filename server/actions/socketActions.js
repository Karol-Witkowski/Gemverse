const mongoose = require('mongoose');
const {
  findRoomById,
  findRoomByName,
  saveRoom,
  setOnlineUsers
} = require('../repositories/roomRepository');

const filterActiveUsers = async (data) => {
  const room = await findRoomById(mongoose.Types.ObjectId(data.currentRoomId));

  await setOnlineUsers(room);
  if (room) {
    room.activeUsers = room.activeUsers.filter((user) => user.socketId !== data.socketId);
    room.permission.splice(room.permission.indexOf(data.currentUserId), 1);
    await saveRoom(room);

    return {
      updated: await setOnlineUsers(room)
    };
  }
};

const updateOnlineUsers = async (data) => {
  const room = await findRoomByName(data.room.name);

  setOnlineUsers(room);
  if (room) {
    if (room.activeUsers && !room.activeUsers.find((user) => user.lookup._id.toString() === data.user._id)) {
      room.activeUsers.push({
        lookup: mongoose.Types.ObjectId(data.user._id),
        socketId: data.socketId
      });

      return setOnlineUsers(await saveRoom(room));
    } else {
      const roomUser = room.activeUsers.find((user) => user.lookup._id.toString() === data.user._id);

      if (roomUser.socketId !== data.socketId) {
        roomUser.socketId = data.socketId;
        await saveRoom(room);
      }

      return setOnlineUsers(room);
    }
  } else {
    return;
  }
};

module.exports = {
  filterActiveUsers,
  updateOnlineUsers
};
