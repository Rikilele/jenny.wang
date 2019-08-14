/**
 * Node built-in
 */
import path from 'path';
import fs from 'fs';
import http from 'http';

/**
 * Node modules
 */
import express from 'express';
import bodyParser from 'body-parser';
import validator from 'validator';
import isImage from 'is-image';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

/**
 * Settings
 */
dotenv.config();
const app = express();
const port = process.env.PORT;

/**
 * Ping the website every 20 mins to avoid idle state
 * This is for heroku:
 *   https://devcenter.heroku.com/articles/free-dyno-hours
 */
setInterval(() => {
  http.get(process.env.ROOT_URL);
}, 20 * 60 * 1000);

/**
 * Middleware
 */
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * API endpoint to return list of projects
 */
app.get('/api/getProjectList', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/projects/settings.json'));
});

/**
 * API endpoint to return list of sources to model images
 */
app.get('/api/getModelImages', (req, res) => {
  fs.readdir(path.join(__dirname, '../public/modeling'), (err, items) => {
    const result = items.filter(item => isImage(item));
    res.json(result);
  });
});

/**
 * API endpoint to return list of sources to photography images
 */
app.get('/api/getPhotographyImages', (req, res) => {
  fs.readdir(path.join(__dirname, '../public/photography'), (err, items) => {
    const result = items.filter(item => isImage(item));
    res.json(result);
  });
});

/**
 * Function that validates a post request body in an object as follows:
 * {
 *   success: boolean,
 *   errors: string[]
 * }
 */
function validateBody(name: string, email: string, subject: string, content: string) {
  const result = {
    success: true,
    errors: [],
  };

  if (!validator.isLength(name, { min: 1, max: 70 })) {
    result.errors.push('Name was invalid');
  }

  if (!validator.isEmail(email)) {
    result.errors.push('Email was invalid');
  }

  if (!validator.isLength(subject, { min: 0, max: 70 })) {
    result.errors.push('Subject was invalid');
  }

  if (!validator.isLength(content, { min: 20, max: 500 })) {
    result.errors.push('Content was invalid');
  }

  if (result.errors.length > 0) {
    result.success = false;
  }

  return result;
}

function sendMail(name, email, subject, content) {
  // Set up strings
  const nameLine = `Name: ${name}\n`;
  const emailLine = `Email: ${email}\n`;
  const subjectLine = subject ? `Subject: ${subject}\n` : '';
  const contentLine = `\n${content}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_FROM,
    to: process.env.GMAIL_TO,
    bcc: process.env.GMAIL_BCC,
    subject: `Message received from ${name}`,
    text: `${nameLine}${emailLine}${subjectLine}${contentLine}`,
  };

  transporter.sendMail(mailOptions)
    .then((info) => {
      console.log(`+ Email sent from ${name}: ${info.response}`);
    })
    .catch((err) => {
      console.log(`- Error sending email from ${name}`);
      console.error(err);
    });
}

/**
 * API endpoint to send email to Jenny
 */
app.post('/api/sendMail', (req, res) => {
  const {
    name,
    email,
    subject,
    content,
  } = req.body;
  const result = validateBody(name, email, subject, content);

  // Send email only if validate succeeds
  if (result.success) {
    sendMail(name, email, subject, content);
  }

  res.json(result);
});

/**
 * Fallback for all other accesses
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/**
 * Listen
 */
app.listen(port, () => {
  if (!port) {
    console.log('- Environment variable PORT not found');
    console.log('- Hint: Did you run "npm run setup" properly?');
    process.exit(1);
  }

  console.log(`Listening on port ${port}`);
});
