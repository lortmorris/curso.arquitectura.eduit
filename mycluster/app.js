const http = require('http');
let counter=0;
const server = http.createServer((req, res)=> {
  res.end('gracias x su visita '+counter++);
});

let PORT =  5000;

[...process.argv].forEach(ar=> {
  if(ar.indexOf('--port')>-1){
    const parts = ar.split('=');
    PORT = parts.length ==2 ? parts[1] : PORT;
  }
});

server.listen(PORT, (err)=>{
  console.log(` listen on *:${PORT}`)
});
