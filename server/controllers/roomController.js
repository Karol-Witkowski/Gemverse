const { deleteRoomMessages } = require('../repositories/messageRepository');
const { validatorResult } = require('../validators/validationResult');
const {
  createRoom,
  findAllRooms,
  findRoomById,
  findRoomByName,
  findRoomBySlug,
  removeRoom,
  saveRoom,
  setOnlineUsers,
} = require('../repositories/roomRepository');

const getAllRooms = async (req, res) => {
  const rooms = await findAllRooms();

  if (rooms.length < 1) {
    return res.status(404).json({
      message: 'Rooms not found',
      success: false,
    });
  } else {
    return res.status(200).json({
      data: rooms,
      success: true,
    });
  }
};

const getRoom = async (req, res) => {
  const room = await findRoomBySlug(req.params.slug);

  if (!room) {
    return res.status(404).json({
      message: 'Room not found',
      success: false,
    });
  } else {
    if (room.access === 'private' && !room.permission.includes(req.user.id)) {
      return res.status(403).json({
        message: 'Access denied',
        success: false,
      });
    } else {
      return res.status(200).json({
        data: room,
        success: true,
      });
    }
  }
};

const postRoom = async (req, res) => {
  req.body.access = req.body.password ? 'private' : 'public';

  createRoom(req)
    .then((room) => {
      return res.status(201).json({
        data: room,
        success: true,
      });
    })
    .catch((error) => {
      validatorResult(req, res, error);
    });
};

const verify = async (req, res) => {
  const room = await findRoomByName(req.body.name);

  if (!room) {
    return res.status(404).json({
      message: `No room with name ${req.body.name} found`,
      success: false,
    });
  } else {
    if ((await room.isValidPassword(req.body.password)) === false) {
      return res.status(404).json({
        message: 'Invalid password',
        success: false,
      });
    } else {
      if (!room.permission.includes(req.user.id)) {
        room.permission.push(req.user.id);
      }
      await saveRoom(room);
      return res.status(200).json({
        data: room,
        success: true,
      });
    }
  }
};

const deleteRoom = async (req, res) => {
  const room = await findRoomById(req.params.id);

  if (!room) {
    return res.status(404).json({
      message: 'Room not found',
      success: false,
    });
  } else {
    if (req.body._id !== room.user.toString()) {
      return res.status(403).json({
        message: 'Users are allowed to delete only their rooms',
        success: false,
      });
    } else {
      const roomSlug = room.slug;

      await deleteRoomMessages(req.params.id);
      await removeRoom(room);
      return res.status(200).json({
        message: 'Room deleted',
        path: roomSlug,
        success: true,
      });
    }
  }
};

const setUserOffline = async (req, res) => {
  const room = await findRoomBySlug(req.body.slug);

  if (!room) {
    return res.status(404).json({
      message: 'Room not found',
      success: false,
    });
  } else {
    if (room.activeUsers.find((user) => user.lookup.toString() === req.user.id)) {
      room.activeUsers = room.activeUsers.filter((user) => user.lookup.toString() !== req.user.id);

      if (room.permission.find((user) => user.toString() === req.user.id)) {
        room.permission = room.permission.filter((user) => user.toString() !== req.user.id);
      }
      await saveRoom(room);
    }

    const filteredRoom = await setOnlineUsers(room);

    return res.status(200).json({
      data: filteredRoom,
      success: true,
    });
  }
};

module.exports = {
  deleteRoom,
  getAllRooms,
  getRoom,
  postRoom,
  setUserOffline,
  verify,
};
