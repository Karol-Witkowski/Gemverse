const bcrypt = require('bcrypt');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: ['3', 'Username must be at least 3 characters long'],
    maxlength: ['15', 'Username must be less or equal to 15 characters']
  },
  email: {
    type: String,
    unique: true,
    minlength: ['5', ' E-mail address must be at least 5 characters long'],
    maxlength: ['128', 'E-mail address must be less or equal to 128 characters']
  },
  password: {
    type: String,
    required: true,
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

/* UserSchema.pre('save', function(next) {
  if (this.password !== '' && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (response) => {
      this.password = response;
      next();
      });
  } else {
    next();
  }
}); */

module.exports = mongoose.model('User', UserSchema);
