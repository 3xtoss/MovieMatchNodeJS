const express = require('express');
var path = require('path');
var app = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname + '/about.html'));
});

module.exports = app;
