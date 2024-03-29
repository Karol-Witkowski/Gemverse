const bcrypt = require('bcrypt');
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const RoomSchema = new mongoose.Schema({
  access: {
    type: String,
    default: 'public',
  },
  activeUsers: [
    {
      _id: false,
      lookup: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      socketId: {
        type: String,
        required: true,
      },
    },
  ],
  name: {
    type: String,
    required: [true, 'Name field is required'],
    unique: true,
    minlength: ['3', 'Room name must be at least 3 characters long'],
    maxlength: ['15', 'Room name must be less or equal to 15 characters'],
  },
  password: {
    type: String,
    default: '',
    minlengthValidator: {
      validator: (value) => {
        value.length >= 6 || value.length === 0;
      },
      message: () => 'Password must be at least 6 characters long',
    },
    maxlength: ['128', 'Password must be less or equal to 128 characters'],
  },
  permission: {
    type: Array,
    default: [],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

RoomSchema.plugin(URLSlugs('name', { field: 'slug' }));
RoomSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

RoomSchema.pre('save', function (next) {
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

module.exports = mongoose.model('Room', RoomSchema);
