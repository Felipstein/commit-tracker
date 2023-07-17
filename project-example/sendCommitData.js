const axios = require('axios');

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
    console.info(`Submitting commit ${commitHash} (${shortCommitMessage})`);

    await axios.post(`${MAIN_APP_URL}/commits`, commitData);

    console.info(`Commit ${commitHash} submitted successfully.`);
  } catch (err) {
    console.error(`An error occurred when submitting commit ${commitHash}:`);

    let finalErrorDetails = err;

    if(err instanceof axios.AxiosError) {
      finalErrorDetails = err.response?.data || err.cause;
    }

    console.error(finalErrorDetails);
  }
}

const commitHash = process.argv[2];
const commitMessage = process.argv[3];

sendCommitData(commitMessage, commitHash);