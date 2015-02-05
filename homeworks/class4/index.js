// Utility Imports
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var numeral = require('numeral');

// Route Imports
var home = require('./routes/home');
var customer = require('./routes/customer');
var kitchen = require('./routes/kitchen');
var management = require('./routes/management');

// Config
var app = express();
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);
mongoose.connection.db.dropCollection(mongoURI);
app.engine('handlebars', hbs(
	{
		defaultLayout: 'base',
		partialsDir: __dirname + '/views/partials',
  		layoutsDir: __dirname + '/views/layouts',
  		helpers: {
        	currency: function(number) { return numeral(number).format('$0,0.00'); }
    	}
	}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing Table
app.get('/', home);
app.get('/order', customer);
app.get('/kitchen', kitchen);
app.get('/ingredients', management);
app.post('/ingredients', management.post);

// Listen
app.listen(PORT);