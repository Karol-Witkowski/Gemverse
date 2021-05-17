const mongoose = require('mongoose');
const { logger } = require('../config/logger');

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info('[LOG=DB] Connected to MongoDB cluster');
    })
    .catch((error) => {
      logger.error(`LOG=DB] ${error}`);
    });
};

dbConnect();

module.exports = {
  mongoose,
  dbConnect,
};
