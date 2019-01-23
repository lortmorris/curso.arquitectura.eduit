const cluster = require('cluster');
const http = require('http');
const os = require('os');
const express = require('express');
const mongojs = require('mongojs');
const uuidv1 = require('uuid/v1');

const controllers = require('./controllers');


const app = express();
const db = mongojs('mongodb://127.0.0.1/cursoarq');
const numCPUs = os.cpus();


const Application  = {
  app,
  os,
  db,
};

app.use((req, res, next) => {
  req.uuid = uuidv1();
  next();
});

/*if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs.length; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {*/
  http.createServer(app).listen(8000);
  // console.log(`Worker ${process.pid} started`);
  controllers(Application);
//}
