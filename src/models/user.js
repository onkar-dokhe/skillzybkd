const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  college: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  role: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: 'Level1',
    index: true,
  },
  skill: [{
    subject: String,
    point: Number,
    percentage: Number,
  }],
  score: {
    type: Number,
    default: 100,
  },
  lastPlayed: {
    type: Date,
    index: true,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpireTime: Number,
  fcmToken: String,
}, {
  timestamps: true,
  versionKey: false,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
