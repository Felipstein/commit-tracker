require('dotenv/config');

const axios = require('axios');
const chalk = require('chalk');
const { z } = require('zod');

if(process.env.ENABLE_COMMIT_TRACKER !== true) {
  process.exit(0);
}

const commitTrackerUrl = process.env.COMMIT_TRACKER_URL;

if(!commitTrackerUrl) {
  console.error(chalk.red('COMMIT_TRACKER_URL is not defined in .env file.'));
  process.exit(0);
}

const MAIN_APP_ENDPOINT = `${commitTrackerUrl}/api/commits`;

const sendCommitDataSchema = z.object({
  commitMessage: z.string().nonempty('Missing "commitMessage"'),
  commitHash: z.string().nonempty('Missing "commitHash"'),
  authorName: z.string().nonempty('Missing "authorName"'),
  authorEmail: z.string().nonempty('Missing "authorEmail"'),
  date: z.string().nonempty('Missing "date"').transform(date => date.split(' ').slice(0, 2).join(' ')),
  redirectUrl: z.string().nonempty('Missing "redirectUrl"').transform(redirectUrl => redirectUrl.replace('.git', '').concat('/commit/{{commitHash}}')),
});

/**
 * Send the commit data to the main app
 * @param {{
 *  commitMessage: string,
 *  commitHash: string,
 *  authorName: string,
 *  authorEmail: string,
 *  date: string,
 *  redirectUrl: string,
 * }} sendCommitDataRequest
 */
async function sendCommitData(sendCommitDataRequest) {
  try {
    const {
      commitMessage, commitHash, authorName, authorEmail, date, redirectUrl,
    } = sendCommitDataSchema.parse(sendCommitDataRequest);

    const commitData = {
      commitMessage,
      commitHash,
      authorName,
      authorEmail,
      date,
      redirectUrl: redirectUrl.replace('{{commitHash}}', commitHash),
    };

    const shortCommitMessage = commitMessage.length > 25 ? commitMessage.substring(0, 25).concat('...') : commitMessage
    console.info(chalk.gray(`\nSubmitting commit ${commitHash} (${shortCommitMessage})`));

    await axios.post(MAIN_APP_ENDPOINT, commitData);

    console.info(
      chalk.green('Commit'),
      chalk.yellow(commitHash),
      chalk.green('submitted successfully.'),
    );
    console.info(chalk.cyan(chalk.underline(`${commitData.redirectUrl}\n`)));
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

const [,, commitHash, commitMessage, authorName, authorEmail, date, redirectUrl] = process.argv;

sendCommitData({
  commitHash,
  commitMessage,
  authorName,
  authorEmail,
  date,
  redirectUrl,
});