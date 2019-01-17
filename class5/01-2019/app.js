const http = require('http');
const express = require('express');
const path = require('path');
const config = require('config');
const up = require('universal-pattern');

const app = express();
const port = config.get('port');
const server = http.createServer(app);

up(app, {
  swagger: {
    baseDoc: config.get('basePath'),
    host: `${config.get('host')}:${config.get('port')}`,
    folder: path.join(process.cwd(), 'swagger'),
    info: {
      version: 10.0,
      title: 'Social Network Example',
      termsOfService: 'www.domain.com/terms',
      contact: {
        email: 'cesarcasas@bsdsolutions.com.ar',
      },
      license: {
        name: 'Apache',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
  },
  compress: true,
  cors: true,
  database: {
    uri: config.get('connection.mongodb.uri'),
  },
})
  .then((upInstance) => {
    upInstance.addHook('/users', 'beforeInsert', async (req, dataInput) => {
      dataInput.password = new Date().getTime();
      return Promise.resolve(dataInput);
    });

    upInstance.addHook('/users', 'afterInsert', async (req, document) => {
      // sendMail('welcome', document);
      return Promise.resolve(document);
    })

    server.listen(port, () => console.info(`listen *:${port}`))
  })
  .catch(err => console.error('Error initializing ', err));
