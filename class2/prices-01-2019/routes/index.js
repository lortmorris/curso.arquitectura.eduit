

const routes = ({ app, Controllers }) => {
  app.get('/', (req, res) => res.json({ api: '1.0' }) );

  app.post('/users/login' , (req, res) => {
    return res.json({});
  });

  app.get('/users', Controllers.Users.getAll);
  app.put('/users', Controllers.Users.insert);

  app.delete('/users', (req, res) => {
    return res.json({});
  });

  app.patch('/users', (req, res) => {
    return res.json({});
  });

  app.post('/sales', (req, res) => {
    return res.json({});
  });

  app.get('/products', Controllers.Products.getAll);
  app.get('/stats', async (req, res) => {
    const stats = await Promise.all([
      Controllers.Stats.users,
      Controllers.Stats.sales,
    ]);
  });
};

module.exports = routes;
