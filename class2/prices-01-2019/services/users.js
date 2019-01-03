const debug = require('debug')('services:users');


const Users = ({ db }) => ({
  getAll: (query = {}) => new Promise((resolve, reject) => {
    db.users.find(query, {}, (err, docs) => {
      if (err) {
        debug('Error: ', err);
        return reject(err);
      }
      return resolve(docs);
    });
  }),

  insert: (data) => new Promise((resolve, reject) => {
    db.users.insert(data, (err, inserted) => {
      if (err) {
        debug('Error inserted: ', err);
        return reject(err);
      }
      return resolve(inserted);
    })
  }),

});

module.exports = Users;
