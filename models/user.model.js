const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  student_id: {
    type: String,
    require: true,
    unique: true
  },
  name: {
    type: String,
    require: true,
  },
  house_name: {
    type: String,
    require: true
  },
  hint_1: {
    type: String
  },
  hint_2: {
    type: String
  },
  hint_3: {
    type: String
  },
  hint_4: {
    type: String
  },
}, {versionKey: false});

const User = mongoose.model('User', userSchema);

module.exports = User;