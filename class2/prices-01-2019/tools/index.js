const mongojs = require('mongojs');

const services = require('../services');
const clients = require('./clients');

const db = mongojs('mongodb://localhost/commerce');

const Application = {
  db,
};

Application.Services = services(Application);

const Tools = async () => {
  const Clients = clients(Application);
  await Clients.Download();
  await Clients.Process();
};

Tools();
