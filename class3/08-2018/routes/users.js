
const users = ({ UniversalPattern }) => ({
  get: {
    '/users': UniversalPattern.controller.search,
    '/users/about': (req, res) => res.json({ version: 1 }),
  },
  put: {
    '/users': UniversalPattern.controller.insert,
  },

  delete: {
    '/users': UniversalPattern.controller.remove,
  },
  patch: {
    '/users': UniversalPattern.controller.update,
  },
});

 module.exports = users;
