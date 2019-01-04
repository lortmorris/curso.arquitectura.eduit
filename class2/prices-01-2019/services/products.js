const debug = require('debug')('commerce:services:products');

const Products = ({ db }) => ({
  getAll: (clientId = 0 , query = {}) => new Promise((resolve, reject) => {
    db.ProductsPrices.find({ ...query, clientId }, {}, (err, docs) => {
      if (err) {
        debug('Products.getAll Error: ', err);
        return reject(err);
      }
      return resolve(docs);
    });
  }),
});

module.exports = Products;
