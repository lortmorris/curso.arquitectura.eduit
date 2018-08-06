

const getUsers = (db) => new Promise((resolve, reject) => {
  db.users.find({ }, { }, (err, docs) => {
    if (err) return reject(err);
    return resolve(docs);
  });
});

const addUser = (db, userData) => new Promise((resolve, reject) => {
  db.users.insert(userData, (err, doc) => {
    if (err) return reject(err);
    return resolve(doc);
  });
});

const removeUser = (db, userId) => new Promise((resolve, reject) => {
  db.users.remove({ _id: db.ObjectId(userId) }, (req, doc) => {
    if (err) return reject(err);
    return resolve(doc);
  });
});

const updateUser = (db, userId, userData) => new Promise((resolve, reject) => {
  db.users.update({ _id: db.ObjectId(userId) }, { $set: data } , (req, doc) => {
    if (err) return reject(err);
    return resolve(doc);
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

  put: {
    '/users': async (req, res ) => {
      const newUser = await addUser(db, req.body);
      res.json(newUser);

    },
  },

  delete: {
    '/users': async (req, res) => {
      const { userId } = req.query;
      const removed = await removeUser(db, userId);
      res.json({ removed });
    },
  },
  patch: {
    '/users': async (req, res) => {
      const { userId } = req.query;
      const updated = await updateUsers(db, userId);
      const userData = await getUsers({ _id: db.ObjectId(userId) }).pop();
      res.json({ userData });
    },
  },
});

 module.exports = users;
