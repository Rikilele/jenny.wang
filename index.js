const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const isImage = require('is-image');

const app = express();
const port = process.env.PORT || 5000;

/**
 * Ping the website every 20 mins to avoid idle state
 * This is for heroku:
 *   https://devcenter.heroku.com/articles/free-dyno-hours
 */
setInterval(() => {
  http.get('http://jenny-wang.herokuapp.com');
}, 20 * 60 * 1000);

/**
 * Middleware
 */
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * API endpoint to return list of projects
 */
app.get('/api/getProjectList', (req, res) => {
  res.sendFile(`${__dirname}/public/projects/settings.json`);
});

/**
 * API endpoint to return list of sources to model images
 */
app.get('/api/getModelImages', (req, res) => {
  fs.readdir(`${__dirname}/public/modeling`, (err, items) => {
    const result = items.filter(item => isImage(item));
    res.json(result);
  });
});

/**
 * API endpoint to return list of sources to photography images
 */
app.get('/api/getPhotographyImages', (req, res) => {
  fs.readdir(`${__dirname}/public/photography`, (err, items) => {
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
function validateBody(name, email, subject, content) {
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
  res.json(result);

  // Send the email using nodemailer
  // Here
});

/**
 * Fallback for all other accesses
 */
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

/**
 * Listen
 */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
