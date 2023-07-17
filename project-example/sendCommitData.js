const axios = require('axios');
const chalk = require('chalk');

const MAIN_APP_ENDPOINT = 'http://localhost:3000/api/commits';

/**
 * Send the commit data to the main app
 * @param {string} commitMessage 
 * @param {string} commitHash
 * @param {string} authorName
 * @param {string} authorEmail
 * @param {string} date
 */
async function sendCommitData(commitMessage, commitHash, authorName, authorEmail, date) {
  try {
    if(!commitMessage) {
      throw new Error('Missing "commitMessage".');
    }

    if(!commitHash) {
      throw new Error('Missing "commitHash".');
    }

    if(!authorName) {
      throw new Error('Missing "authorName".');
    }

    if(!authorEmail) {
      throw new Error('Missing "authorEmail".');
    }

    if(!date) {
      throw new Error('Missing "date".');
    }

    const commitData = {
      commitMessage,
      commitHash,
      authorName,
      authorEmail,
      date: date.split(' ').slice(0, 2).join(' '),
    };

    const shortCommitMessage = commitMessage.length > 25 ? commitMessage.substring(0, 25).concat('...') : commitMessage
    console.info(chalk.gray(`\nSubmitting commit ${commitHash} (${shortCommitMessage})`));

    await axios.post(MAIN_APP_ENDPOINT, commitData);

    console.info(
      chalk.green('Commit'),
      chalk.yellow(commitHash),
      chalk.green('submitted successfully.'),
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
const authorName = process.argv[4];
const authorEmail = process.argv[5];
const date = process.argv[6];

sendCommitData(commitMessage, commitHash, authorName, authorEmail, date);