const http = require('http');
const express = require('express');
const mongojs = require('mongojs');

const app = express();
const db = mongojs('mongodb://127.0.0.1/cursoarq');


const server = http.createServer(app);



const controllers = {
    insertPet: (req, res) => res.json({ method: 'post' }),
    getPet: (req, res) => res.json({ method: 'get' }),
};

const paths = {
  '/': {
    post: 'insertPet',
    get: 'getPet',
  }
};


Object.keys(paths)
  .forEach(p => {
     const methods = Object.keys(paths[p]);
     methods.forEach(m => app[m](p, controllers[paths[p][m]]));
  });

server.listen(5000, () => console.info('listen on *:5000'));
