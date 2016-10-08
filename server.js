var express = require('express');
var app = express();
// var serverHTTPS = require('https').createServer();
var server = require('http').createServer(app);
var path = require('path');
var bodyParser = require('body-parser');

server.listen(5000, function(){
	console.log("listening on ", server.address().port);
});

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', function(req, res){
    res.render('index');
});

app.get('/live', function(req, res){
    res.redirect('http://live.tedxkmutt.com/');
});
