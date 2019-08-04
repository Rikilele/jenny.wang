const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const isImage = require('is-image');

const app = express();
const port = process.env.port || 5000;

/**
 * Ping the website every 20 mins to avoid idle state
 * This is for heroku:
 *   https://devcenter.heroku.com/articles/free-dyno-hours
 */
setInterval(function() {
  http.get('https://jenny-wang.herokuapp.com');
}, 20 * 60 * 1000);

/**
 * Middleware
 */
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * API endpoint to return list of projects
 */
app.get('/api/getProjectList', function(req, res) {
  res.sendFile(`${__dirname}/public/projects/settings.json`);
});

/**
 * API endpoint to return list of sources to model images
 */
app.get('/api/getModelImages', function(req, res) {
  fs.readdir(`${__dirname}/public/modeling`, function(err, items) {
    const result = items.filter(item => isImage(item));
    res.json(result);
  });
});

/**
 * API endpoint to return list of sources to photography images
 */
app.get('/api/getPhotographyImages', function(req, res) {
  fs.readdir(`${__dirname}/public/photography`, function(err, items) {
    const result = items.filter(item => isImage(item));
    res.json(result);
  });
});

/**
 * Fallback for all other accesses
 */
app.get('*', function(req, res) {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

/**
 * Listen
 */
app.listen(port, function() {
  console.log(`Listening on port ${port}`)
});
