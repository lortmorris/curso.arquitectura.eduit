const providers = {};
const products = {};

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

const getRandom = limit => Math.floor(Math.random() * limit);

const generatePrices = () => {
  const prices =  [];

  const ages = [
    { fromAge: 0, toAge: 12 },
    { fromAge: 13, toAge: 25 },
    { fromAge: 26, toAge: 35 },
    { fromAge: 36, toAge: 50 },
    { fromAge: 51, toAge: 65 },
  ];

  const days = [
    { fromDays: 1, toDays: 15},
    { fromDays: 16, toDays: 30},
    { fromDays: 31, toDays: 60},
    { fromDays: 61, toDays: 90},
    { fromDays: 91, toDays: 120},
    { fromDays: 120, toDays: 180},
    { fromDays: 181, toDays: 365},
  ];


  Object.entries(providers)
    .forEach((provider) => {
      const providerId = provider[0];

      Object.entries(products[providerId])
        .forEach((product) => {
          const productId = product[0];

          for (let a = 0; a < ages.length; a++) {
            for (let b = 0; b < days.length; b++) {
              const pair = getRandom(10000);
              if (!(pair % 5)) {
                prices.push({
                  providerId,
                  productId,
                  fromAge: ages[a].fromAge,
                  toAge: ages[a].toAge,
                  fromDays: days[b].fromDays,
                  toDays: days[b].toDays,
                  cost: getRandom(50) + 1,
                });
              }
            }
          }
        });
    });

  return prices;
};


const prices = generatePrices();
const search = (age, days) => {

  const productsToResponse = {};
  const providersToResponse = {};

  const getResults = () => prices.filter(p => {
    if (p.fromAge <= age && p.toAge >= age) {
      if (p.fromDays <= days && p.toDays >= days) {
        const key = `${p.providerId}-${p.productId}`;
        if (typeof productsToResponse[key] === 'undefined') {
           productsToResponse[key] = products[p.providerId][p.productId];
        }

        if (typeof providersToResponse[p.providerId] === 'undefined') {
           providersToResponse[p.providerId] = providers[p.providerId];
        }
        return p;
      }
    }
  });

  return {
    results: getResults(),
    providers: providersToResponse,
    products: productsToResponse,
  };
};



app.get('/save', (req, res) => {
  const status = fs.writeFileSync('./prices.json', JSON.stringify(prices));
  res.json({ status });
});


app.get('/search', (req, res) => {
  const filename = `${process.cwd()}/results/age${req.query.age}-days${req.query.days}.json`;

  fs.readFile(filename, (err, data) => {
    let result = {};
    if (err) {
      console.info('no exists: ', filename);
      result = search(parseInt(req.query.age, 10), parseInt(req.query.days, 10));
      fs.writeFile(filename, JSON.stringify(result), () => {});
    } else {
      result = JSON.parse(data.toString());
    }

    return res.json(result);
  });
});
