const request = require('supertest');

const Application = require('../app')();
const categories = require('./categories');

const basePath = '/service';

const main = {
  Application,
  basePath,
};

const tasks = [
  categories(main),
];

const next = () => {
  const item = tasks.shift();
  if (item === undefined) {
    return Application
      .then(({ db }) => {
        db.close();
      })
      .catch(err => console.error('err: ', err));
  }
  return item(next);
};

next();
