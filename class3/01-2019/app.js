const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  const parts = msg.toString().split('');
  const decimals = parts.map( c => c.charCodeAt());
  const binaries = decimals.map( b => b.toString(2));
  console.info(parts);
  console.info(decimals);
  console.info(binaries);

  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
// server listening 0.0.0.0:41234
