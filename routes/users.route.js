const { getAllUsers, addUser, getUserById } = require('../controller/users.db.controller');

const userRouter = require('express').Router();

userRouter.get('/', getAllUsers);
userRouter.get('/id', getUserById);
userRouter.post('/', addUser);

module.exports = userRouter;