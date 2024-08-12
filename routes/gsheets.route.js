const path = require('path');

const gSheetsRouter = require('express').Router();

gSheetsRouter.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'gsheets.users.html'));
});

module.exports = gSheetsRouter;