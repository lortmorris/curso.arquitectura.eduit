

module.exports = ({ app, db}) => {

  app.get('/users', (req, res) => {
    db.users.find({}, {}, (err, docs) => {
      if (err) return res.status(500).end(err.toString());
      return res.json(docs);
    });
  });
};
