const helloWorldRouter = require('express').Router();

helloWorldRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
})

module.exports = helloWorldRouter;