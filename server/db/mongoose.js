const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

mongoose.Promise = require('bluebird');

const dbConnect = () => {
  mongoose.connect(
    process.env.DATABASE_URL,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>  console.log(chalk.bold.green('Connection with MongoDB Atlas established')))
  .catch((err) => console.error(err));
}

dbConnect();

module.exports = {mongoose, dbConnect};