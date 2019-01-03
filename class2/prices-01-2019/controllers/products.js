

const Products = ({ Services }) => ({
  getAll: async (req, res) => {
    try {
      const products = await Services.Products.getAll(req.query.clientId, { });
      return res.json(products);
    } catch (err) {
      return Promise.reject(err);
    }
  }
});

module.exports = Products;
