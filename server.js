// server.js -- React tutorial server, serving on http://localhost:3000
//  This application requires 'express'.  Use 'npm install express' to install it.
var fs = require('fs');

var express = require('express'); 
var app = express();

var comments = [{author: 'Pete Hunt', text: 'Hey there!'}];

app.use('/', express.static(__dirname));
app.use(express.bodyParser());

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
