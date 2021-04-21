const chalk = require('chalk');
const mongoose = require('mongoose');

const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>  console.log(chalk.bold.green('Connected to MongoDB cluster')))
    .catch((error) => console.error(error));
};

dbConnect();

module.exports = {
  mongoose,
  dbConnect
};
