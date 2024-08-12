const hintRouter = require('express').Router();
const {getAllHints, getHintsByCode} = require('../controller/hint.db.controller');

hintRouter.get('/', getAllHints);

hintRouter.get('/id', getHintsByCode);

module.exports = hintRouter;