const users = require('./users');
const products = require('./products');
const promotions = require('./promotions');

const Services = (Application) => ({
    Users: users(Application),
    Products: products(Application),
    Promotions: promotions(Application),
});


module.exports = Services;
