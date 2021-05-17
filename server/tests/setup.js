const { populateData } = require('./seed/seedFn');

module.exports = async () => {
  await populateData();
};
