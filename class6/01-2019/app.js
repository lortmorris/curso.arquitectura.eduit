const cluster = require('cluster');
const http = require('http');
const os = require('os');
const express = require('express');
const mongojs = require('mongojs');

const app = express();

const numCPUs = os.cpus();

app.use((req, res, next) => {
  console.info(req.url, process.pid);
  next();
});


app.get('/health', (req, res) => {
  res.json({
    pid: process.pid,
    uptime: process.uptime(),
    hostname: os.hostname,
    cpu: numCPUs,
    memory: {
      total: os.totalmem(),
      freemen: os.freemem(),
    },
    hostuptime: os.uptime(),
  });
});

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs.length; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http.createServer(app).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
