const mongoose = require('mongoose'), Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: ['1', 'Message must be at least 1 characters long'],
    maxlength: ['4000', 'Message must be less or equal to 4000 characters']
  },
  room: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Room'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
