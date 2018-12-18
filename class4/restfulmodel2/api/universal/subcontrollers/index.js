
const debug = require('debug')('rm2:subcontrollers:index');

const subcontrollers = {

};

const processSubControllers = (apiPath, action, main, params, response) => {
  debug(`processSubControllers ${apiPath} : ${action}`);
  const path = apiPath.split('/')[1];

  if (path in subcontrollers && action in subcontrollers[path]) {
    debug('property exists');
    return subcontrollers[path][action](main, params, response);
  }
  debug('property does NOT exist');
  return Promise.resolve(params);
};

export default processSubControllers;
