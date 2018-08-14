const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});


const checksum = (msg) => {
	const parts = msg.split("*");
	if (msg.length < 2 ) return false;
	const check = parts.pop();
	const n = parts.join('');
  console.info(n, check);
	let xor = 0;
	for (let x=0; x< n.length; x++){
		xor = xor ^ n[x];
	}
  console.info('=== valid xor: ', xor);
	return parseInt(xor) === parseInt(check);
};

server.on('message', (msg, rinfo) => {
	if (checksum(msg.toString()) ) {
		return console.log(`server got: ${msg} is ok`);
	}
 	console.log(`server got: ${msg} is invalid`);

});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
 });

server.bind(41234);
