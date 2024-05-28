const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`;

console.log(MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
      console.log('MongoDB conectado');
  } catch (err) {
      console.error(err.message);
      process.exit(1);
  }
};

module.exports = connectDB;
