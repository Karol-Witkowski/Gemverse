const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: ['3', 'Room name must be greater than 3 characters'],
    maxlength: ['20', 'Room name must be less than 10 characters']
  },
  password: {
    type: String,
    default: ''
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

RoomSchema.methods.isValidPassword = (password) => {
  return bcrypt.compare(password, this.room.password);
};

RoomSchema.pre('save', (next) => {
  if (this.password !== '') {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(this.password, salt, (error, response) => {
        this.password = response;
        next();
      });
      this.protected = true;
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('Room', RoomSchema);
