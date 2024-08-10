require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const SPREADSHEETID = process.env.SPREADSHEET_ID || '1vW403i2EmrdcjEduzcyuDvayu9TIEIyas6jiL6HQtgU';
const KEYFILENAME = `${process.env.KEYFILE_NAME || 'sit-sairahut-uwt-key'}.json`
const KEYFILEPATH = path.join(__dirname, '..', KEYFILENAME);
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const parseKeyFileToJson = async () => {
  let jsonData = null;
  const keyFileExists = fs.existsSync(KEYFILEPATH);
  if (keyFileExists) {
    await fsPromises.readFile(KEYFILEPATH, 'utf8')
      .then(data => {
        jsonData = JSON.parse(data);
      })
      .catch(err => console.log(err));
  } else {
    console.log(`${KEYFILEPATH} is not exists`);
  }
  return jsonData;
}

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES
});

const sheets = google.sheets({ version: 'v4', auth });

const accessSpreadsheet = async (sheetName, start, end) => {
  const range = `${sheetName}!${start}:${end}`;

  return sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEETID,
    range: range
  })
}

module.exports = accessSpreadsheet;