

const Products = ({ Services }) => ({
  getAll: async (req, res) => {
    try {
      const products = await Services.Products.getAll(req.query.clientId, { });
      const finalProducts = await Services.Promotions.process(products);
      
      return res.json(finalProducts);
    } catch (err) {
      return Promise.reject(err);
    }
  }
});

module.exports = Products;
