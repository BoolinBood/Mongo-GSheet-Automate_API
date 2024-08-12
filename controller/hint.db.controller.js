const Hint = require('../models/hint.model');

const getAllHints = async (req, res) => {
  try {
    await Hint.find().then(result => {
      res.json(result);
    })
  } catch (err) {
    res.json({});
  }
}

const getHintsByCode = async (req, res) => {
  // code example: B01
  try {
    const code = req.body.code;
    await Hint.findOne({ Code: code })
    .then(result => res.json(result))
  } catch (err) {
    console.log(err);
    res.json({});
  }
}

module.exports = {
  getAllHints,
  getHintsByCode,
}