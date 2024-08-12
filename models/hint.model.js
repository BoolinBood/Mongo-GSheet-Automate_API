const mongoose = require('mongoose');

const hintSchema = new mongoose.Schema({
  code: {
    type: String,
    require: true,
    unique: true
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

const Hint = mongoose.model('Hint', hintSchema);

module.exports = Hint;