const client = require('./lib/client')({
	ip: '127.0.0.1',
	port: 35624
});

client.sendData("1", 35.96, 10251, new Date());
