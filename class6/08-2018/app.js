const http = require('http');
const express = require('express');
const path = require('path');
const config = require('config');
const up = require('universal-pattern');

const app = express();
const server = http.createServer(app);


up(app, {
  swagger: {
    baseDoc: config.get('basePath'),
    host: config.get('host'),
    folder: path.join(process.cwd(), 'swagger'),
  },
  database: {
    uri: config.get('connection.mongodb.uri'),
  },
})
  .then(up => server.listen(5000))
  .catch(err => console.error('Error initializing ', err));
