const mongoose = require('mongoose'), Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Message can not be empty'],
    minlength: ['1', 'Message must be at least 1 characters long'],
    maxlength: ['4000', 'Message must be less or equal to 4000 characters']
  },
  room: {
    type: Schema.Types.ObjectId,
    required: [true, 'Room must be specified'],
    ref: 'Room'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
