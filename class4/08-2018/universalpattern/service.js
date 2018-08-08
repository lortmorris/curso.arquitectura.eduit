const debug = require('debug')('app:up:service');

const service = ({ db }) => ({
  insert: (module, data) => new Promise((resolve, reject) => {
    db[module].insert(data, (err, doc) => {
      if (err) return reject(err);
      return resolve(doc);
    });
  }),
  remove: (module, _id) => new Promise((resolve, reject) => {
    db[module].remove({ _id: db.ObjectId(_id) }, (err, doc) => {
      if (err) return reject(err);
      return resolve(doc);
    });
  }),
  update: (module, _id, data) => new Promise((resolve, reject) => {
    db[module].update({ _id: db.ObjectId(_id) },{ $set: data },  (err, doc) => {
      if (err) return reject(err);
      return resolve(doc);
    });
  }),
  search: (module, query = {}, fields = {}) => new Promise((resolve, reject) => {
    debug('search called: ', module, query, fields);
    db[module].find(query, fields, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
    });
  }),
});

module.exports = service;
