const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const getMock = require('./mock');

app.get('/search', (req, res) => {
  res.json(getMock(req.query.age1,
    req.query.age2,
    req.query.age3,
    req.query.days));

});
server.listen(5000, ()=> console.info('running: 5000'));
