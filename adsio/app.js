const http = require('http');
const express = require('express');
const mongojs = require('mongojs');
const app = express();
const db = mongojs('mongodb://127.0.0.1/tracker',['hits']);
const server = http.createServer(app);


app.use( express.static('./public') );

app.get('/hits', async (req, res)=> {
  const data = {
    bannerId: req.query.bannerId || 0,
    added: new Date(),
    timesteamp: new Date().getTime(),
    host: req.headers.host || null,
    referer: req.headers.referer || null,
    'user-agent': req.headers['user-agent']
  };

  db.hits.insert(data, (err, docs)=>{

  });

  res.json({status: true});
});

server.listen(5000);
