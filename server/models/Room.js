const mongoose = require('mongoose'), Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: ['3', 'Room name must be at least 3 characters long'],
    maxlength: ['15', 'Room name must be less or equal to 15 characters']
  },
  password: {
    type: String,
    default: '',
    minlengthValidator: {
      validator: (value) => {
          return value.length >= 6 || value.length === 0
      },
      message: () => `Password must be at least 6 characters long`
    },
    maxlength: ['128', 'Password must be less or equal to 128 characters']
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

RoomSchema.pre('save', function(next) {
  if (this.password !== '') {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(this.password, salt, (error, response) => {
        this.password = response;
        next();
      });
    });
  } else {
    next();
  }
});

RoomSchema.methods.isValidPassword = (password) => {
  bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Room', RoomSchema);
