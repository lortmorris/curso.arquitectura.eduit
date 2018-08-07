const debug = require('debug')('app:up:controller');

const getModule = url => {
  const parts = url.split('?');
  return parts[0].split('/').pop();
}

const controller = ({ UniversalPattern }) => ({
  remove: async (req, res) => {
    const _id = req.query._id;
    const result = await UniversalPattern.service.remove(getModule(req.url), _id);
    return res.json({ result });
  },
  insert: async (req, res) => {
    const data = req.body;
    const result = await UniversalPattern.service.insert(getModule(req.url), data);
    res.json({ result });
  },
  update: async (req, res) => {
    const _id = req.query._id;
    const data = req.body;
    const result = await UniversalPattern.service.update(getModule(req.url), _id, data);
    res.json({ result });
  },
  search: async (req, res) => {
    debug('search called: ', UniversalPattern);
    const fields = (req.query.fields || '')
      .split(',')
      .map(f => ({ [f]: 1 }))
      .reduce( (acc, current) => Object.assign(acc, current) , {});
    const docs = await UniversalPattern.service.search(getModule(req.url), {}, fields);
    res.json({ docs });
  }
});

module.exports = controller;
