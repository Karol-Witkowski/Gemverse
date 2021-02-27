const chalk = require('chalk');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = require('bluebird');

const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>  console.log(chalk.bold.green('Connected to MongoDB cluster')))
    .catch((err) => console.error(err));
}

dbConnect();

module.exports = {mongoose, dbConnect};
