const users = require('./users');

const Controllers = Application => ({
  Users: users(Application),
});

module.exports = Controllers;
