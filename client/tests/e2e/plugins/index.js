module.exports = (on, config) => ({
  ...config,
  fixturesFolder: 'tests/e2e/fixtures',
  integrationFolder: 'tests/e2e/specs',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
});
