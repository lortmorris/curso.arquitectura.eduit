import fs from 'fs';
import lodash from 'lodash';
import compression from 'compression';
import yaml from 'js-yaml';
import path from 'path';
import swaggerTools from 'swagger-tools';
import config from 'config';
import helmet from 'helmet';
import mongojs from 'mongojs';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import request from 'request';
import boot from './boot';
import API from './api';
import MongoPage from './lib/mongopage';

const debug = require('debug')('rm2:application');

const app = express();

app.disable('view cache');
app.use((req, res, next) => {
  res.setHeader('Surrogate-Control', 'no-store');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
app.use(helmet());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, apikey, x-access-token');
  if (req.method === 'OPTIONS') return res.sendStatus(200);

  if (req.headers && req.headers['x-forwarded-for']) {
    const parts = req.headers['x-forwarded-for'].split(',');
    req.realip = parts[0];
  } else {
    req.realip = req.ip;
  }
  return next();
});

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(morgan('dev'));

const getAPIRouters = (Controllers, swaggerDoc) => {
  debug('routers...');
  const options = {
    controllers: Controllers,
  };

  function formatValidationError(err, req, res) {
    const error = {
      code: 'validation_error',
      message: err,
      cached: true,
    };
    if (res.end) return res.end(error);
    return res();
  }

  const initMiddleWare = (mws, callback) => {
    debug('initializating middleware');

    app.use(mws.swaggerMetadata());
    app.use(mws.swaggerValidator(), formatValidationError);
    app.use(mws.swaggerRouter(options));

    app.use(mws.swaggerUi({
      apiDocs: `${config.basePath}/api-docs`,
      swaggerUi: `${config.basePath}/docs`,
    }));
    callback();
  };
  swaggerTools.initializeMiddleware(swaggerDoc, (swaggerMiddleware) => {
    initMiddleWare(swaggerMiddleware, () => debug('swaggerTools loaded'));
  });

  app.use(compression());
};

const Application = () => {
  // Main app
  return new Promise((resolve, reject) => {
    const db = mongojs(config.connection.mongodb.uri, config.connection.mongodb.collections);
    const ApplicationObject = {
      app,
      db,
      utils: {
        lodash,
        fs,
        yaml,
        path,
        request,
      },
      config,
      swagger: {},
      services: {},
      controllers: {},
    };

    app.db = db;
    MongoPage(ApplicationObject);

    ApplicationObject.API = new API(ApplicationObject);
    ApplicationObject.API.swaggerDoc.host = config.env === 'dev' ? `${config.host}:${config.port}` : config.host;
    ApplicationObject.API.swaggerDoc.basePath = config.basePath;
    Object.keys(ApplicationObject.API.modules)
      .forEach((k) => {
        ApplicationObject.services[k] = ApplicationObject.API.modules[k].service;
        ApplicationObject.controllers[k] = ApplicationObject.API.modules[k].controller;
        ApplicationObject.swagger[k] = ApplicationObject.API.modules[k].swagger;
      });
    getAPIRouters(ApplicationObject.API.wrapperControllers, ApplicationObject.API.swaggerDoc);
    boot(ApplicationObject)
      .then(() => resolve(ApplicationObject))
      .catch((err) => {
        console.error('Fatal Error: ', err);
        reject(err);
      });
  });
};

module.exports = Application;
