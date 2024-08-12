const hintRouter = require('express').Router();
const {getAllHints, getHintsByCode} = require('../controller/hint.db.controller');
const { addAllHintToDB } = require('../controller/hint.gsheets.controller');

hintRouter.get('/', getAllHints);

hintRouter.get('/id', getHintsByCode);

hintRouter.post('/add-hints', addAllHintToDB);

module.exports = hintRouter;