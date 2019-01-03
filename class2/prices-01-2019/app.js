
const http = require('http');
const express = require('express');
const mongojs = require('mongojs');
const services = require('./services');
const controllers = require('./controllers');

const db = mongojs('mongodb://localhost/commerce', ['users', 'sales']);
const port = 3000;
const app = express();
const server = http.createServer(app);

const Application = {
  app,
  db,
};

Application.Services = services(Application);
Application.Controllers = controllers(Application);

const routes = require('./routes')(Application);


server.listen(port, () => console.info(`listen *:${port}`));
