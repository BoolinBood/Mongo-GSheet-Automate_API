require('dotenv').config();
const mongoose = require('mongoose');

const testConnectionDB = async () => {

  console.log('TEST MONGODB CONNECTION...');
  console.log(`MongoDB URL: ${process.env.MONGODB_URL}`);
  
  try {
    await mongoose.connect(process.env.MONGODB_URL).then((conn) => {
      console.log(`MongoDB Connection: ✅`)
      return conn.connection;
    });
  } catch (err) {
    console.log(`MongoDB Connection: ❌`)
  }
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    .then((conn) => {
      console.log(`MongoDB Connection: ✅`)
      return conn.connection;
    })
    .catch((err) => {
      console.log(`MongoDB Connection: ${err}`);
    });
  } catch (err) {
    console.log(`MongoDB Connection: ❌`)
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log(`MongoDB Connection: Disconnected`);
  } catch (err) {
    console.log(`MongoDB Connection: Failed to disconnect`)
  }
}

module.exports = {
  testConnectionDB,
  connectDB,
  disconnectDB
};