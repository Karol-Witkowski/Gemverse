const mongoose = require('mongoose'), Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  room: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Room'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Message', MessageSchema);
