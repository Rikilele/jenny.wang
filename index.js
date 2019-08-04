const path = require('path');
const fs = require('fs');
const express = require('express');
const isImage = require('is-image');

const APP = express();
const PORT = process.env.PORT || 5000;

/**
 * Middleware
 */
APP.use(express.static(path.join(__dirname, 'client/build')));
APP.use(express.static(path.join(__dirname, 'public')));

/**
 * API endpoint to return list of projects
 */
APP.get('/api/getProjectList', function(req, res) {
  res.sendFile(`${__dirname}/public/projects/settings.json`);
});

/**
 * API endpoint to return list of sources to model images
 */
APP.get('/api/getModelImages', function(req, res) {
  fs.readdir(`${__dirname}/public/modeling`, function(err, items) {
    const result = items.filter(item => isImage(item));
    res.json(result);
  });
});

/**
 * API endpoint to return list of sources to photography images
 */
APP.get('/api/getPhotographyImages', function(req, res) {
  fs.readdir(`${__dirname}/public/photography`, function(err, items) {
    const result = items.filter(item => isImage(item));
    res.json(result);
  });
});

/**
 * Fallback for all other accesses
 */
APP.get('*', function(req, res) {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

/**
 * Listen
 */
APP.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`)
});
