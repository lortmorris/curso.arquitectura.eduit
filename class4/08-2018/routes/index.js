
// const users = require('./users');


const UniversalPatternRoutes = UniversalPattern => [
  'users',
  'providers',
  'products',
  'clients',
  'gift'
].map(module => ({
  get: {
    [`/${module}`]: UniversalPattern.controller.search,
  },
  put: {
    [`/${module}`]: UniversalPattern.controller.insert,
  },

  delete: {
    [`/${module}`]: UniversalPattern.controller.remove,
  },
  patch: {
    [`/${module}`]: UniversalPattern.controller.update,
  },
}));


const routes = Application => {
const modules = UniversalPatternRoutes(Application.UniversalPattern);

  modules.forEach(module => {
    Object.entries(module)
      .forEach((item) => {
        const method = item[0];
        const paths = Object.entries(item[1]);
        paths.forEach((p) => {
          Application.app[method](p[0], p[1]);
        });
      });
  });

};

module.exports = routes;
