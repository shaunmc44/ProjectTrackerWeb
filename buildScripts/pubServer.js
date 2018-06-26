var express = require('express');
var path = require('path');
var open = require('open');


var port = 8801;
var app = express();

app.all("/odata/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

app.use(express.static(__dirname + '/../' + '/dist/dev'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../dist/dev/index.html'));
});

app.listen(port, function(err) {
	if(err){
		console.log(err);
	} else {
		open('http://localhost:' + port);
	}
});
