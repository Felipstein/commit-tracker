const axios = require('axios');
const { default: chalk } = require('chalk');

const MAIN_APP_URL = 'http://localhost:4000';

/**
 * Send the commit data to the main app
 * @param {string} commitMessage 
 * @param {string} commitHash 
 */
async function sendCommitData(commitMessage, commitHash) {
  try {
    if(!commitMessage) {
      throw new Error('Missing "commitMessage".');
    }

    if(!commitHash) {
      throw new Error('Missing "commitHash".');
    }

    const commitData = { commitMessage, commitHash };

    const shortCommitMessage = commitMessage.length > 25 ? commitMessage.substring(0, 25).concat('...') : commitMessage
    console.info(chalk.gray(`\nSubmitting commit ${commitHash} (${shortCommitMessage})`));

    await axios.post(`${MAIN_APP_URL}/commits`, commitData);

    console.info(
      chalk.green('Commit '),
      chalk.yellow(commitHash),
      chalk.green(' submitted successfully.'),
    );
  } catch (err) {
    console.error(chalk.red(`An error occurred when submitting commit ${commitHash}:`));

    let finalErrorDetails = err;

    if(err instanceof axios.AxiosError) {
      finalErrorDetails = err.response?.data || err.cause;
    }

    console.error(chalk.red(finalErrorDetails));
    console.error('\n');
  }
}

const commitHash = process.argv[2];
const commitMessage = process.argv[3];

sendCommitData(commitMessage, commitHash);