/**
 * Prepares a .env file with default environment variables.
 */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const portLine = 'PORT=5000\n'; // Port for API server
const rootLine = 'ROOT_URL=http://google.com\n'; // URL to ping
const userLine = 'GMAIL_USER=example@gmail.com\n'; // Sender address
const passLine = 'GMAIL_PASS=password\n'; // Sender password
const fromLine = 'GMAIL_FROM="Sender Name <example@gmail.com>"\n'; // Sender info
const toLine = 'GMAIL_TO=example@gmail.com\n'; // Receiver address
const bccLine = 'GMAIL_BCC=example@gmail.com\n'; // BCC Receiver

try {
  console.log('+ Searching for .env file');
  const pathToEnv = path.join(__dirname, '../.env');

  // Check if .env file exists
  if (fs.existsSync(pathToEnv)) {
    console.log('+ Found pre-configured .env file');

    // Check if all variables are set properly
    console.log('+ Checking variable declarations');
    dotenv.config();
    const additionalLines: string[] = [];
    if (!process.env.PORT) {
      additionalLines.push(portLine);
    }

    if (!process.env.ROOT_URL) {
      additionalLines.push(rootLine);
    }

    if (!process.env.GMAIL_USER) {
      additionalLines.push(userLine);
    }

    if (!process.env.GMAIL_PASS) {
      additionalLines.push(passLine);
    }

    if (!process.env.GMAIL_FROM) {
      additionalLines.push(fromLine);
    }

    if (!process.env.GMAIL_TO) {
      additionalLines.push(toLine);
    }

    if (!process.env.GMAIL_BCC) {
      additionalLines.push(bccLine);
    }

    // Didn't need to declare additional variables
    if (!additionalLines.length) {
      console.log('+ No additional declarations needed');
      process.exit(0);

    // Declare all additional variables
    } else {
      const logger = fs.createWriteStream(pathToEnv, { flags: 'a' });
      logger.on('open', () => {
        logger.write(`\n${additionalLines.join('')}`);
        logger.close();
        console.log('+ Declared additional environment variables in .env');
        console.log('+ Please modify the file to your convenience');
        process.exit(0);
      });
    }

  // Make a new .env file from scratch
  } else {
    console.log('+ Could not find .env file');
    console.log('+ Initializing .env file');
    const logger = fs.createWriteStream(pathToEnv, { flags: 'a' });
    logger.on('open', () => {
      const fullAddition = portLine.concat(
        rootLine,
        userLine,
        passLine,
        fromLine,
        toLine,
        bccLine,
      );
      logger.write(fullAddition);
      logger.close();
      console.log('+ Initialized .env file');
      console.log('+ Please modify the file to your convenience');
      process.exit(0);
    });
  }
} catch (err) {
  console.log('- Failed to initialize .env file');
  console.log('- Please check the error below');
  console.error(err);
  process.exit(1);
}
