
const http = require('http');
const express = require('express');

const port = 3000;
const app = express();
const server = http.createServer(app);

server.listen(port, () => console.info(`listen *:${port}`));
