
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongojs = require('mongojs');
const helmet = require('helmet');

const cors = require('cors');
const services = require('./services');
const controllers = require('./controllers');

const db = mongojs('mongodb://localhost/commerce', ['users', 'sales']);
const port = 3000;
const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan());

const Application = {
  app,
  db,
};

Application.Services = services(Application);
Application.Controllers = controllers(Application);

const routes = require('./routes')(Application);


server.listen(port, () => console.info(`listen *:${port}`));
