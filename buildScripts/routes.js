var fs = require('fs'),
    path = require('path');


module.exports = function(app) {
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../dist/dev/index.html'));
});

  app.get('*', function(req, res) {
    res.sendStatus(404);
  });
}