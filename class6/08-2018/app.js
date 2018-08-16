const http = require('http');
const express = require('express');
const path = require('path');
const config = require('config');
const up = require('universal-pattern');
const mongojs = require('mongojs');
const uuidv1 = require('uuid/v1');
const db = mongojs(config.get('connection.mongodb.uri'));
const app = express();
const server = http.createServer(app);
const redisClient = require('redis').createClient();



redisClient.on("subscribe", function (channel, count) {
    console.info('subscribe: ', channel, count);
});

redisClient.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
});


app.post('/login', (req, res) => {
    const { email, password } = req.query;

    const q = { email, password };
    db.users.findOne(q, {}, (err, doc) => {
      if (doc) {
        const uuid = uuidv1();
        return redisClient.set(uuid, JSON.stringify({ userId: doc._id }), () => {
          res.set('x-access-token', uuid);
          res.end('ok');
        });
      }
      return res.end('invalid login');
    });
});

app.use(async (req, res, next) => {
  if (req.headers['x-access-token']) {
    return redisClient.get(req.headers['x-access-token'], (err, doc) => {
      if (doc) {
        console.info('from redis: ', doc);
        const data = JSON.parse(doc);
        return db.users.findOne({ _id: db.ObjectId(data.userId) }, {}, (err2, user) => {
          req.userData = user;
          console.info('userData: ', req.userData);
          next();
        });
      }
      return res.status(500).end('invalid access token');
    });
  }
  return next();
});

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
