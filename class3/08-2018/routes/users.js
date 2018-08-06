


const getUsers = (db) => new Promise((resolve, reject) => {
  db.users.find({ }, { }, (err, docs) => {
    if (err) return reject(err);
    return resolve(docs);
  });
});


const users = ({ db }) => ({
  get: {
    '/users': async (req, res) => {
      const users = await getUsers(db);
      res.json({ users });
    },
    '/users/about': (req, res) => res.json({ version: 1 }),
  },

  post: {
    '/users': (req, res ) => {
      db.users.insert(req.body, (err, doc) => {
        res.json(doc);
      });
    },
  },
});

 module.exports = users;
