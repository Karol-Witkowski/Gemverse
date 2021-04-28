const execa = require('execa');
const fs = require('fs');
const chalk = require('chalk');

(async () => {
  try {
    await execa('git', ['checkout', '--orphan', 'gh-pages']);
    console.log(chalk.yellow('Building in progress...'));
    await execa('npm', ['run', 'build']);
    const folderName = fs.existsSync('dist') ? 'dist' : 'build';
    await execa('git', ['--work-tree', folderName, 'add', '--all']);
    await execa('git', ['--work-tree', folderName, 'commit', '-m', 'gh-pages']);
    console.log(chalk.yellow('Pushing to gh-pages...'));
    await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force']);
    await execa('git', ['checkout', '-f', 'master']);
    await execa('git', ['branch', '-D', 'gh-pages']);
    console.log(chalk.green.bold('Successfully deployed to gh-pages'));
  } catch (e) {
    console.log(chalk.bgRed.bold(e.message));
    process.exit(1);
  }
})();
