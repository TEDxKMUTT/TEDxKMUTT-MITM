var express = require('express');
var app = express();
// var serverHTTPS = require('https').createServer();
var server = require('http').createServer(app);
var path = require('path');

server.listen(3000);

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
    
});
