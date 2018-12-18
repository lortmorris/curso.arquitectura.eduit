import universal from './universal';
import services from './services';
import categories from './categories';

const debug = require('debug')('rm2:api:index');

const wrapHandler = (handler) => {
  debug('wrapHandler called');
  return (req, res, next) => {
    try {
      handler(req, res, (err) => {
        if (err) {
          debug('Controller Error: ', err);
          // send 503 and error as string
          res.status(503).json({
            code: 'controller_error_catched',
            message: err,
            success: false,
          }).end();
        } else {
          next();
        }
      });
    } catch (e) {
      debug(e);
      res.status(503).json({
        code: 'controller_error',
        message: e,
        success: false,
      }).end();
    }
  };
};

const wrapControllers = (controllers) => {
  debug('wrapControllers called');
  Object.keys(controllers)
    .forEach((k) => {
      debug(`setting wrapHandler to: ${k}`);
      controllers[k] = wrapHandler(controllers[k]);
    });

  return controllers;
};


const getAPI = (Application) => {
  const {
    fs,
    yaml,
    path,
    lodash,
  } = Application.utils;
  const swaggerFile = path.join(__dirname, './swagger.yaml');
  const swaggerString = fs.readFileSync(swaggerFile, 'utf8');
  const swaggerDoc = yaml.safeLoad(swaggerString);

  const Universal = universal(Application);
  const Categories = categories(Application);
  const Services = services(Application);
  const apiModules = [Categories, Services];

  apiModules.reduce((acc, module) => {
    debug('Loading API Module');
    const model = module.swagger;
    return lodash.merge(acc, model);
  }, swaggerDoc);

  return {
    modules: {
      Universal,
      Categories,
      Services,
    },
    swaggerDoc,
    wrapperControllers: wrapControllers({
      'Universal.search_get': Universal.controller.search,
      'Universal.remove_delete': Universal.controller.remove,
      'Universal.update_patch': Universal.controller.update,
      'Universal.updateByID_patch': Universal.controller.updateByID,
      'Universal.insert_put': Universal.controller.insert,
      'Universal.today_get': Universal.controller.today,
      'Universal.insertOrCount_put': Universal.controller.insertOrCount,
      'Universal.statsByMonth_get': Universal.controller.statsByMonth,
      'Universal.findOne_get': Universal.controller.findOne,
    }),
  };
};

export default getAPI;
