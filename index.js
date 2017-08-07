var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var dbconfig = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
	console.log("Express server has started on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
	secret: "test",
	resave: false,
	daveUninitialized: true
}));

var allowCORS = function(req, res, next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers','Content-Type, Authorization, Content-Length, X-Requested-With');
	(req.method=='OPTIONS')?
		res.send(200):
		next();
};

app.use(allowCORS);


var router = require('./router/router')(app, connection);
