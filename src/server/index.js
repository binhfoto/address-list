var path = require('path');
var express = require('express');

var app = express();

app.use('/', express.static(path.join(__dirname, '../../public')));

// setup the global middleware
var globalMiddleware = require('./middleware.js');
globalMiddleware(app);

module.exports = app;