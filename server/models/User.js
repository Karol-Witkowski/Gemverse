const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'E-mail address field is required'],
    unique: true,
    minlength: ['5', 'E-mail address must be at least 5 characters long'],
    maxlength: ['128', 'E-mail address must be less or equal to 128 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: ['6', 'Password address must be at least 5 characters long'],
    maxlength: ['128', 'Password must be less or equal to 128 characters'],
  },
  username: {
    type: String,
    required: [true, 'Username field is required'],
    unique: true,
    minlength: ['3', 'Username must be at least 3 characters long'],
    maxlength: ['15', 'Username must be less or equal to 15 characters'],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', function (next) {
  if (this.password !== '' && this.isModified('password')) {
    bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR), (error, salt) => {
      bcrypt.hash(this.password, salt, (error, res) => {
        this.password = res;

        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
