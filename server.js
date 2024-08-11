require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helloWorldRouter = require('./routes/helloworld.route');
const userRouter = require('./routes/users.route');
const gSheetsRouter = require('./routes/gsheets.route')
const logEvents = require('./middlewares/logEvents');
const { connectDB } = require('./utils/mongodbConn');

const app = express();
const PORT = process.env.PORT;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(logEvents);

app.use('/hello-world', helloWorldRouter);
app.use('/users', userRouter);
app.use('/gsheets', gSheetsRouter);

app.listen(PORT, async () => {
  await connectDB().then(() => {
    console.log(`Server is running on PORT:${PORT}`);
  })
});