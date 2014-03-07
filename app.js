
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var BeGlobal = require('node-beglobal');
var passport = require('passport');

var translateController = require('./controllers/translatecontroller.js');
var quizController = require('./controllers/quizcontroller.js');
var progressController = require('./controllers/progresscontroller.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	// res.send("Welcome to Express");
	res.send('Hello World')
});

//initialize the BeGlobal API
var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'API_TOKEN'
});

app.get('/translate', translateController.index);
app.post('/translate', translateController.translate);
// app.get('/quiz', quizController.index);
// app.get('/progress', progressController.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
