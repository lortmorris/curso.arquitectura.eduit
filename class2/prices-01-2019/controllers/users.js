
const Users = ({ Services }) => ({
  insert: async (req, res) => {
    try {
      const data = req.body;
      const inserted = await Services.Users.insert(data);
      return res.json(inserted);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  getAll: async (req, res) => {
    try {
       const docs = await Services.Users.getAll({});
       return res.json(docs);
    } catch (err) {
      return Promise.reject(err);
    }
  }
});

module.exports = Users;
