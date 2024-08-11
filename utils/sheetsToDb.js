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

const addSheetDataToDB = async (sheetName, cellStart, cellEnd, dbModel) => {
  accessSpreadsheet(sheetName, cellStart, cellEnd)
  .then(result => result.data.values)
  .then(async (rows) => {
    const users = rows.map(row => formatRowToModelObj(dbModel, row));
    await User.insertMany(users).catch(err => console.log(err));
    return users;
  })
  .catch(err => console.log(err));
}

module.exports = addSheetDataToDB;