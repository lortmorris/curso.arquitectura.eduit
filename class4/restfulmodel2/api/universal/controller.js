import subcontrollers from './subcontrollers';

const debug = require('debug')('rm2:controller:universal');


const Universal = (main) => {
  debug('init...');
  const { db } = main;
  return {
    insert: async (req, res, next) => {
      debug('.insert called');
      const params = req.swagger.params.modeldata.value;
      params.added = new Date();

      return subcontrollers(req.swagger.apiPath, 'insertbefore', main, params, res)
        .then(data => main.services.Universal.insert(req.swagger.apiPath, data))
        .then(doc => subcontrollers(req.swagger.apiPath, 'insert', main, params, doc))
        .then(dataToResponse => res.json(dataToResponse))
        .catch(err => next(err));
    },

    insertOrCount: async (req, res, next) => {
      const params = req.swagger.params.modeldata.value;
      return subcontrollers(req.swagger.apiPath, 'insertbefore', main, params)
        .then(data => main.services.Universal.insertOrCount(req.swagger.apiPath, data))
        .then(doc => subcontrollers(req.swagger.apiPath, 'insert', main, params, doc))
        .then(dataToResponse => res.json(dataToResponse))
        .catch(err => next(err));
    },
    update: async (req, res, next) => {
      const data = req.swagger.params.modeldata.value;
      const { _id } = data;
      delete data._id;
      debug('.update called: ', _id, data);
      return subcontrollers(req.swagger.apiPath, 'updateBefore', main, data, res)
        .then(() => main.services.Universal.update(req.swagger.apiPath, _id, data))
        .then(result => res.json(result))
        .catch(err => next(err));
    },
    remove: async (req, res, next) => {
      debug('.remove called');
      const _id = req.swagger.params._id.value;

      return main.services.Universal.remove(req.swagger.apiPath, _id)
        .then(doc => res.json(doc))
        .catch(err => next(err));
    },
    today: async (req, res, next) => {
      debug('.today called');
      main.services.Universal.today(req.swagger.apiPath)
        .then(data => res.json(data))
        .catch(err => next(err));
    },
    findOne: async (req, res, next) => {
      debug('.findOne called');
      const data = req.swagger.params.data.value;
      return main.services.Universal.findOne(req.swagger.apiPath, data)
        .then(result => subcontrollers(req.swagger.apiPath, 'findone', main, data, result))
        .then(dataToResponse => res.json(dataToResponse))
        .catch(err => next(err));
    },
    search: async (req, res, next) => {
      debug('.search called');
      let q = req.swagger.params.q.value;
      let sorting = req.swagger.params.sorting.value;
      const page = req.swagger.params.page.value;
      const limit = req.swagger.params.limit.value;
      const fields = req.swagger.params.fields.value;
      let coordinates = null;

      if (req.swagger.params.coordinates) coordinates = req.swagger.params.coordinates.value;

      if (q) {
        const parts = q.split(',');
        q = {};
        parts.forEach((i) => {
          const k = i.split(':');
          if (k.length === 2) {
            if (k[0] === '_id') q[k[0]] = db.ObjectId(k[1].trim());
            else if (k[0][0] === '_') q[k[0].substr(1)] = db.ObjectId(k[1].trim());
            else if (k[1][0] === '/' && k[1][k[1].length - 1] === '/') q[k[0]] = RegExp(k[1].trim().substr(1).slice(0, -1));
            else if (k[1][0] === '.' && k[1][k[1].length - 1] === '.') q[k[0]] = parseInt(k[1].trim().substr(1).slice(0, -1), 10);
            else if (k[1][0] === '|' && k[1][k[1].length - 1] === '|') q[k[0]] = k[1].trim().substr(1).slice(0, -1) === 'true';
            else if (k[1].toUpperCase() === 'NULL') q[k[0]] = null;
            else if (k[1].toUpperCase() === 'NOTNULL') q[k[0]] = { $ne: null };
            else q[k[0]] = k[1].trim();
          }
        });
      }

      if (coordinates && coordinates !== '' && coordinates !== '0,0,0') {
        debug('with coordinates: ', coordinates);
        const parts = coordinates.split(',');
        if (parts.length === 3) {
          if (!q) q = {};
          q.location = {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: [parseFloat(parts[0]), parseFloat(parts[1])],
              },
              $maxDistance: parseInt(parts[2], 10), // > 100000 ? 100000 : parseInt(parts[2], 10),
            },
          };
        }
      }

      if (q && typeof q.criterial !== 'undefined') delete q.location;

      if (sorting) {
        const props = sorting.split(',');
        sorting = {};
        props.forEach((p) => {
          const parts = p.split(':');
          if (parts.length === 2) sorting[parts[0]] = (parts[1] === 'desc' ? -1 : 1);
        });
      }

      const populateFields = {};
      if (fields && fields !== '') {
        fields.split(',').forEach((f) => {
          populateFields[f.trim()] = 1;
        });
      }
      req.q = q;
      debug('====> query for run: ', q, sorting);
      return subcontrollers(req.swagger.apiPath, 'beforeGet', main, {
        page,
        limit,
        q,
        sorting,
      }, res)
        .then(newparams => main.services.Universal.search(req.swagger.apiPath, {}, newparams, populateFields))
        .then(result => subcontrollers(req.swagger.apiPath, 'postGet', main, result, req))
        .then(result => res.json(result))
        .catch(err => next(err));
    },
  };
};
export default Universal;
