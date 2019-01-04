const debug = require('debug')('commerce:services:promotions');

const Promotions = ({ db }) => ({
  process: products => new Promise((resolve, reject) => {
      debug('process called: ', products.length);
      db.promotions.find({}, {}, (err, promos) => {
          return resolve(products);
      });
  }),
});

module.exports = Promotions;
