const mongoose = require('mongoose'), Schema = mongoose.Schema;

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: ['3', 'Room name must be greater than 3 characters'],
    maxlength: ['10', 'Room name must be less than 10 characters']
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', RoomSchema);
