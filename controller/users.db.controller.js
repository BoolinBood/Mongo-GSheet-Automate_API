const { connectDB, disconnectDB } = require('../utils/mongodbConn');
const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
  try {
    await User.find().then(result => {
      res.json(result);
    });
  } catch (err) {
    res.json({});
  }
}

const getUserById = async (req, res) => {
  try {
    const id = '67130500'.concat(req.body.student_id);
    await User.findOne({ Student_id: id }).then((result) => {
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.json({});
  }
}

const addUser = async (req, res) => {
  try {

    const data = {
      student_id: req.body.student_id,
      name: req.body.name,
      house_name: req.body.house_name,
      hint_1: req.body.hint_1,
      hint_2: req.body.hint_2,
      hint_3: req.body.hint_3,
      hint_4: req.body.hint_4,
    };

    const user = new User(data);
    await user.save().then(() => res.json(data));
  } catch (err) {
    console.log(err.message);
    res.json({});
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser
}