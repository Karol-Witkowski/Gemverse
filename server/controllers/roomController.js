const Message = require('../models/Message');
const Room = require('../models/Room');

const getAllRooms = async (req, res) => {
  const rooms = await Room.find().select('-password');

  if (rooms.length < 1) {
    return res.status(404).json({ error: 'Rooms not found' });
  } else {
    return res.status(200).json(rooms);
  };
};

const getRoomBySlug = async (req, res) => {
  const room = await Room.findOne({ slug: req.params.slug }).select('-password');
  console.log(req.user.id);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  } else {
    if (room.access === 'private' && !room.permission.includes(req.body._id)) {
      return res.status(403).json({ error: 'Access denied' });
    } else {
      return res.status(200).json(room);
    }
  };
};

const postRoom = async (req, res) => {
  const room = await Room.findOne({ name: { $regex : new RegExp(req.body.name, 'i') } })
    .select('-password');

  if (room !== null) {
    return res.status(403).json({ error: `Name ${ req.body.name } is already taken` });
  } else {
    req.body.access = req.body.password ? 'private' : 'public',
    Room.create(req.body, (error, room) => {
      if (error) {
        return res.status(403).json({ error: `Name ${ req.body.name } is already taken` });
      } else {
        res.status(201).send(room);
      }
    });
  }
};

const verify = async (req, res) => {
  const room = await Room.findOne({ name: req.body.name });

  if (!room) {
    return res.status(404).json({ error: `No room with name ${ req.body.name } found` });
  } else {
    if (await room.isValidPassword(req.body.password)) {
      if (!room.permission.includes(req.user.id)) {
        room.permission.push(req.user.id);
      }
      await room.save();
      return res.status(200).send(room);
    } else {
      return res.status(404).json({ error: 'Invalid password' });
    }
  }
};

const deleteRoomById = async (req, res) => {
  const room = await Room.findById({ _id: req.params.id });
    if (!room) {
      return res.status(404).json({ error: `Room not found` });
    } else {
      if (req.body._id === room.user.toString()) { // move it to validation?
        await Message.deleteMany({ room: req.params.id });
        await room.delete();
        return res.status(200).json({ message: 'Room deleted'});
      } else {
        return res.status(404).json({ error: 'Users are allowed to delete only own rooms' });
      }
    }
};

const setUserOffline = async (req, res) => {
  const room = await Room.findOne({ _id: req.body.id });

  if (!room) {
    return res.status(404).json({ error: `No room with id ${ req.body.id } found` });
  } else {
    if (room.activeUsers.find((user) => user.lookup.toString() === req.user.id)) {
      room.activeUsers = room.activeUsers.filter((user) => user.lookup.toString() !== req.user.id);
      if (room.permission.indexOf(req.user.id) >= 0) {
        return room.permission.splice(room.permission.indexOf(req.user.id), 1);
      }
      await room.save();
    }

    res.status(200).json(await Room.populate(room, {
      path: 'user activeUsers.lookup',
      select: 'username'
    }));
  }
};

module.exports = {
  getAllRooms,
  getRoomBySlug,
  postRoom,
  verify,
  deleteRoomById,
  setUserOffline
};