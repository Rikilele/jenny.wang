/**
 * Node built-in
 */
import path from 'path';
import fs from 'fs';
import http from 'http';

/**
 * Node modules
 */
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import validator from 'validator';
import isImage from 'is-image';
import dotenv from 'dotenv';
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

/**
 * Settings JSON files
 */
import projectsSettings from './projectsSettings.json';
import photographySettings from './photographySettings.json';

/**
 * Settings
 */
dotenv.config();
const app: Application = express();
const url: string = process.env.ROOT_URL || 'http://google.com';
const port: string | number = process.env.PORT || 5000;

/**
 * Ping the website every 20 mins to avoid idle state
 * This is for heroku:
 *   https://devcenter.heroku.com/articles/free-dyno-hours
 */
setInterval(() => {
  http.get(url);
}, 20 * 60 * 1000);

/**
 * Middleware
 */
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * API endpoint to return a list of photography albums
 */
app.get('/api/photography', (req: Request, res: Response) => {
  res.json(photographySettings);
});

/**
 * API endpoint to return list of sources to photography images
 */
app.get('/api/photography/:album', (req: Request, res: Response) => {
  const { album } = req.params;
  if (!photographySettings.find(setting => setting.id === album)) {
    res.sendStatus(404);
  } else {
    const pathToDir: string = path.join(__dirname, `../public/photography/${album}`);
    fs.readdir(pathToDir, (err, items: string[]) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const result: string[] = items.filter((item: string) => isImage(item));
        res.json(result);
      }
    });
  }
});

/**
 * API endpoint to return list of projects
 */
app.get('/api/projects', (req: Request, res: Response) => {
  res.json(projectsSettings);
});

/**
 * API endpoint to return list of projects
 */
app.get('/api/projects/:project', (req: Request, res: Response) => {
  const { project } = req.params;
  if (!projectsSettings.find(setting => setting.id === project)) {
    res.sendStatus(404);
  } else {
    const pathToDir: string = path.join(__dirname, `../public/projects/${project}`);
    fs.readdir(pathToDir, (err, items: string[]) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const result: string[] = items.filter((item: string) => isImage(item));
        res.json(result);
      }
    });
  }
});

/**
 * API endpoint to return list of sources to model images
 */
app.get('/api/modeling', (req: Request, res: Response) => {
  const pathToDir: string = path.join(__dirname, '../public/modeling');
  fs.readdir(pathToDir, (err, items: string[]) => {
    const result: string[] = items.filter((item: string) => isImage(item));
    res.json(result);
  });
});

/**
 * Function that validates a post request body in a ResultObj.
 * ResultObj.success defines whether all validations have passed.
 * ResultObj.errors stores any error messages.
 */
interface ResultObj {
  success: boolean;
  errors: string[];
}

function validateBody(
  name: string,
  email: string,
  subject: string,
  content: string,
): ResultObj {
  // Set up result object
  const result: ResultObj = {
    success: false,
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

  if (result.errors.length === 0) {
    result.success = true;
  }

  return result;
}

/**
 * Sends an email using nodemailer.
 */
function sendMail(
  name: string,
  email: string,
  subject: string,
  content: string,
): void {
  // Set up strings
  const nameLine: string = `Name: ${name}\n`;
  const emailLine: string = `Email: ${email}\n`;
  const subjectLine: string = subject ? `Subject: ${subject}\n` : '';
  const contentLine: string = `\n${content}`;

  const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions: SendMailOptions = {
    from: process.env.GMAIL_FROM,
    to: process.env.GMAIL_TO,
    bcc: process.env.GMAIL_BCC,
    subject: `Message received from ${name}`,
    text: `${nameLine}${emailLine}${subjectLine}${contentLine}`,
  };

  transporter.sendMail(mailOptions)
    .then(() => {
      console.log(`+ Email sent from ${name} <${email}>`);
    })
    .catch((err: Error) => {
      console.log(`- Error sending email from ${name}`);
      console.error(err);
    });
}

/**
 * API endpoint to send email to Jenny
 */
app.post('/api/sendMail', (req: Request, res: Response) => {
  const {
    name,
    email,
    subject,
    content,
  }: {
    name: string,
    email: string,
    subject: string,
    content: string,
  } = req.body;
  const result: ResultObj = validateBody(name, email, subject, content);

  // Send email only if validate succeeds
  if (result.success) {
    sendMail(name, email, subject, content);
  }

  res.json(result);
});

/**
 * Fallback for all other accesses
 */
app.get('*', (req: Request, res: Response) => {
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
