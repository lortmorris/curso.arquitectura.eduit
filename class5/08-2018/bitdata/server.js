const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const decoder = require('./lib/decoder');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
	const data = decoder(msg.toString());
  console.log(`server got from ${rinfo.address}:${rinfo.port} :`, data);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(35624);
