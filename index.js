const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
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
 * API endpoint to send email to Jenny
 */
app.post('/api/sendMail', (req, res) => {
  console.log(req.body);
  res.json({ success: false, errors: ['EMAIL IS WRONG BOI'] });
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
