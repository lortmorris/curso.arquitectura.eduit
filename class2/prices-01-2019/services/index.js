const users = require('./users');

const Services = (Application) => ({
    Users: users(Application),
});


module.exports = Services;
