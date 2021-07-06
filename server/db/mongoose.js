const { logger } = require('../config/logger');
const mongoose = require('mongoose');

const dbConnect = () => {
  mongoose
    .connect(process.env.NODE_ENV !== 'test' ? process.env.DATABASE_URL : process.env.TESTDB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      if (process.env.NODE_ENV !== 'test') {
        logger.info('[LOG=DB] Connected to MongoDB cluster');
      }
    })
    .catch((error) => {
      logger.error(`[LOG=DB] ${error}`);
    });
};

dbConnect();

module.exports = {
  mongoose,
  dbConnect,
};
