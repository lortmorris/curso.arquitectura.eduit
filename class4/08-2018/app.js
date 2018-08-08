const http = require('http');
const express = require('express');
const shortid = require('shortid');
const fs = require('fs');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const yaml = require('js-yaml');
const lodash = require('lodash');
const swaggerTools = require('swagger-tools');

const db = mongojs('mongodb://127.0.0.1', ['users', 'products', 'prices', 'providers']);
const routes = require('./routes');
const UniversalPattern = require('./universalpattern');

app.use(compression({
level: 9,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use( express.static('./results') );


const Application = {
  app,
  db,
  libs: {
   fs,
   shortid,
 },
};

Application.UniversalPattern = {};
Application.UniversalPattern.service = UniversalPattern.service(Application);
Application.UniversalPattern.controller = UniversalPattern.controller(Application);

routes(Application);

try {
  const doc = [
    'index',
    'pets'
  ].map(file => yaml.safeLoad(fs.readFileSync(`${process.cwd()}/swagger/${file}.yaml`, 'utf8')))
    .reduce((acc, current ) => lodash.merge(acc, current), {});
  Application.swagger = doc;
} catch (e) {
  console.log(e);
}

const server = http.createServer(app);

swaggerTools.initializeMiddleware(Application.swagger,  (middleware) => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());

  app.use(middleware.swaggerRouter({
    controllers: Application.UniversalPattern.controller,
  }));
  app.use(middleware.swaggerUi({
    apiDocs: 'api-docs',
    swaggerUi: 'docs',
  }));
  server.listen(5000, () => console.info('listen on *:5000'));
});
