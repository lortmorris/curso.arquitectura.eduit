const users = require('./users');
const products = require('./products');

const Services = (Application) => ({
    Users: users(Application),
    Products: products(Application),
});


module.exports = Services;
