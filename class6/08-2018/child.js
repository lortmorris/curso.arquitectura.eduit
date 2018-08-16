const http = require('http');
const express = require('express');
const config = require('config');
const app = express();
const server = http.createServer(app);
const redisClient = require('redis').createClient();


app.get('/', (req, res) => {
    redisClient.publish('core', 'estamos probando');
    res.end('gracias x su visita');
});

server.listen(5500);
