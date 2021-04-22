const { deleteRoomMessages } = require('../repositories/messageRepository');
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
    return res.status(404).json({ error: 'Rooms not found' });
  } else {
    return res.status(200).json(rooms);
  };
};

const getRoom = async (req, res) => {
  const room = await findRoomBySlug(req.params.slug);

  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  } else {
    if (room.access === 'private' && !room.permission.includes(req.user.id)) {
      return res.status(403).json({ error: 'Access denied' });
    } else {
      return res.status(200).json(room);
    }
  };
};

const postRoom = async (req, res) => {
  const room = await findRoomByName(req.body.name);

  if (room !== null) {
    return res.status(403).json({ error: `Name ${ req.body.name } is already taken` });
  } else {
    req.body.access = req.body.password ? 'private' : 'public',

    newRoom = await createRoom(req.body);
    if (!newRoom) {
      return res.status(403).json({ error: `Something goes wrong - try again` });
    } else {
      res.status(201).send(newRoom);
    }
  }
};

const verify = async (req, res) => {
  const room = await findRoomByName(req.body.name);

  if (!room) {
    return res.status(404).json({ error: `No room with name ${ req.body.name } found` });
  } else {
    if (await room.isValidPassword(req.body.password)) {
      if (!room.permission.includes(req.user.id)) {
        room.permission.push(req.user.id);
      }
      await saveRoom(room);
      return res.status(200).send(room);
    } else {
      return res.status(404).json({ error: 'Invalid password' });
    }
  }
};

const deleteRoom = async (req, res) => {
  const room = await findRoomById(req.params.id);

    if (!room) {
      return res.status(404).json({ error: `Room not found` });
    } else {
      if (req.body._id === room.user.toString()) { // move it to validation?
        const roomSlug = room.slug;

        await deleteRoomMessages(req.params.id);
        await removeRoom(room);
        return res.status(200).json({ slug: roomSlug, message: 'Room deleted' });
      } else {
        return res.status(404).json({ error: 'Users are allowed to delete only own rooms' });
      }
    }
};

const setUserOffline = async (req, res) => {
  const room = await findRoomBySlug(req.body.slug);

  if (!room) {
    return res.status(404).json({ error: `Room not found` });
  } else {
    if (room.activeUsers.find((user) => user.lookup.toString() === req.user.id)) {
      room.activeUsers = room.activeUsers.filter((user) => user.lookup.toString() !== req.user.id);

      if (room.permission.indexOf(req.user.id) >= 0) {
        return room.permission.splice(room.permission.indexOf(req.user.id), 1);
      }
      await saveRoom(room);
    }

    res.status(200).json(await setOnlineUsers(room));
  }
};

module.exports = {
  getAllRooms,
  getRoom,
  postRoom,
  verify,
  deleteRoom,
  setUserOffline
};
