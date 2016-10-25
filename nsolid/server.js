var http = require('http');

var app = function(req, res, next){
	res.end('gracias por su visita');
}
var server = http.createServer(app);
server.listen(process.env.PORT || 5000);
