
const users = require('./users');

const routes = Application => {
  const Users = users(Application);

  Object.entries(Users)
    .forEach((item) => {
      const method = item[0];
      const paths = Object.entries(item[1]);
      paths.forEach((p) => {
        Application.app[method](p[0], p[1]);
      });
    })
};

module.exports = routes;
