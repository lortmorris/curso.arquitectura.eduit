const http = require('http');
const express = require('express');
const shortid = require('shortid');

const app = express();

const providers = {};
const products = {};
// 100 providers => 10 products => 25 prices

for (let x = 1; x< 100; x++) {
  providers[x] = {
    name: shortid.generate(),
  };
  products[x] = {};
  for (let y =0; y < 10; y++) {
    products[x][y] = {
      productName: shortid.generate(),
    }
  };

}
const prices = [
  {
    providerId: 1,
    productId: 1,
    fromAge: 0,
    toAge: 21,
    fromDays: 0,
    toDays: 30,
    cost: 20
  },
  {
    providerId: 1,
    productId: 1,
    fromAge: 22,
    toAge: 40,
    fromDays: 0,
    toDays: 30,
    cost: 25
  },
  {
    providerId: 1,
    productId: 1,
    fromAge: 41,
    toAge: 80,
    fromDays: 0,
    toDays: 30,
    cost: 35
  },
];

const search = (age, days) => {
  return prices.filter(p => {
    // check age
    if (p.fromAge < age && p.toAge > age) {
      if (p.fromDays < days && p.toDays >= days) {
        return p;
      }
    }
  })
  .map((p) => ({ ...p, providerData: providers[p.providerId], productData: products[p.providerId][p.productId] }));
}


app.get('/search', (req, res) => {
  res.json(search(req.query.age, req.query.days));
});

const server = http.createServer(app);
server.listen(5000, () => console.info('listen on *:5000'));
