const User = require("../models/user.model");
const accessSpreadsheet = require("./sheets");

const formatRowToModelObj = (model, row) => {
  const schemaKeys = Object.keys(model.schema.obj);
  const resultObj = {}
  for (let key=0; key<schemaKeys.length; key++) {
    resultObj[schemaKeys[key]] = row[key];
  }
  return resultObj
}

const addSheetDataToDB = (sheetName, cellStart, cellEnd, dbModel) => {
  let users = null;
  accessSpreadsheet(sheetName, cellStart, cellEnd)
  .then(result => result.data.values)
  .then(async (rows) => {
    users = rows.map(row => formatRowToModelObj(dbModel, row));
    await User.insertMany(users).catch(err => console.log(err));
  })
  .catch(err => console.log(err));
  return users;
}

module.exports = addSheetDataToDB;