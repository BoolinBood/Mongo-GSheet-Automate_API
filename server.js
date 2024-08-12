require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helloWorldRouter = require('./routes/helloworld.route');
const userRouter = require('./routes/users.route');
const gSheetsRouter = require('./routes/gsheets.route')
const logEvents = require('./middlewares/logEvents');
const { connectDB } = require('./utils/mongodbConn');
const hintRouter = require('./routes/hint.route');

const app = express();
const PORT = process.env.PORT;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logEvents);

app.use('/hello-world', helloWorldRouter);
app.use('/users', userRouter);
app.use('/hints', hintRouter);
app.use('/gsheets', gSheetsRouter);

app.listen(PORT, async () => {
  await connectDB().then(() => {
    console.log(`Server is running on PORT:${PORT}`);
  })
});