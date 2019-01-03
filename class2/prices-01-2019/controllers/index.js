const users = require('./users');
const products = require('./products');

const Controllers = Application => ({
  Users: users(Application),
  Products: products(Application),
});

module.exports = Controllers;
