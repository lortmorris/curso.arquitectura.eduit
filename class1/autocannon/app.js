const http = require('http');
const debug = require('debug')('app');
let counter = 0;


const app = (req, res)=> {
	debug('procesando');
	res.end('gracias x su visita:' + counter++);
}

const server = http.createServer(app);
server.listen(process.env.PORT || 5000);