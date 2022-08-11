const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  easySolved: { type: Number, required: true },
  mediumSolved: { type: Number, required: true },
  hardSolved: { type: Number, required: true },
  totalSolved: { type: Number, required: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;