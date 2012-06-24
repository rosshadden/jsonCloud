////////////////////////////////////////////////////////////////
//	MODULES
var express = require('express'),
	http = require('http');

var app = express();

////////////////////////////////////////////////////////////////
//	CONFIGURATION
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

////////////////////////////////////////////////////////////////
//	SETUP
var PORT = +(process.argv[2] || process.env.PORT || 3000);

var library = {};

////////////////////////////////////////////////////////////////
//	ROUTES
app.get('/', function(request, response){
	response.render('index', {
		title: 'JSON.cloud();',
		code: ''
	});
});

app.post('/:id?', function(request, response){
	var code = request.body.code,
		json = JSON.parse(code),
		id = request.params.id || ~~(Math.random() * 1e6);

	library[id] = code;

	response.redirect('/' + id);
});

app.get('/:id', function(request, response){
	var id = request.params.id;

	response.render('index', {
		title: 'JSON.cloud();',
		code: library[id] || '{}'
	});
});

////////////////////////////////////////////////////////////////
//	START
http.createServer(app).listen(PORT, function(){
	console.log("Express server listening on port " + PORT);//app.get('port'));
});
