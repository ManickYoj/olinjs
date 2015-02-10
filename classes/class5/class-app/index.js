// Utility Imports
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

// Config
var app = express();
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);
app.engine('.hbs', hbs(
	{
		defaultLayout: 'base',
		partialsDir: __dirname + '/views/partials',
  		layoutsDir: __dirname + '/views/layouts',
  		extname: '.hbs'
	})
);
app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing Table
app.get('/', function(req, res) {
	res.render('index');
});

app.post('/', function(req, res) {
	res.send(req.body.data);
});

// Listen
app.listen(PORT);