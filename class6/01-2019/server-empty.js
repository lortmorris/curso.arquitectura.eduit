const http = require('http');

let x = 0;
const server = http.createServer(async (req, res) => {
  console.info('called:',  x++);
  res.end('hola mundo: ');
});
server.listen(5000, () => console.info('ready'));
