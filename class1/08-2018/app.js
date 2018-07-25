const http = require('http');
const express = require('express');
const app = express();

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
  console.info('searching: ', age, days);
  return prices.filter(p => {
    // check age
    if (p.fromAge < age && p.toAge > age) {
      if (p.fromDays < days && p.toDays >= days) {
        return p;
      }
    }
  });
}


app.get('/search', (req, res) => {
  res.json(search(req.query.age, req.query.days));
});

const server = http.createServer(app);
server.listen(5000, () => console.info('listen on *:5000'));
