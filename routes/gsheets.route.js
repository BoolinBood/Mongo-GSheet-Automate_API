const User = require('../models/user.model');
const addSheetDataToDB = require('../utils/sheetsToDb');

const gSheetsRouter = require('express').Router();

gSheetsRouter.post('/users', (req, res) => {
  const sheetName = req.query.sheet;
  const startCell = req.query.startCell;
  const endCell = req.query.endCell;
  const dbModel = User;

  addSheetDataToDB(sheetName, startCell, endCell, dbModel)
  .then((result) => {
    res.json(result.users);
  })
  .catch(err => console.log(err));
});

module.exports = gSheetsRouter;