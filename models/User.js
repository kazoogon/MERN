const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avator: {
    type: String,
    required: true
  },
  name: {
    date: Date,
    default: Date.now
  },
});

module.exports = User = mongoose.model('users', Userschema);
