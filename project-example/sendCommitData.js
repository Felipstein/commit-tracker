const axios = require('axios');

const MAIN_APP_URL = 'http://localhost:4000';

/**
 * Send the commit data to the main app
 * @param {string} commitMessage 
 * @param {string} commitHash 
 */
async function sendCommitData(commitMessage, commitHash) {
  try {
    const commitData = { commitMessage, commitHash };

    await axios.post(`${MAIN_APP_URL}/commits`, commitData);

    console.info(`Commit ${commitHash} submitted successfully.`);
  } catch (err) {
    console.error(`An error occurred when submitting commit ${commitHash}:`);
    console.error(err);
  }
}

module.exports = sendCommitData;