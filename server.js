var fs = require('fs');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

var comments = [{author: 'Pete Hunt', text: 'Hey there!'}];

app.use('/', serveStatic(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.get('/comments.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

app.post('/comments.json', function(req, res) {
  comments.push(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

app.listen(3000);
