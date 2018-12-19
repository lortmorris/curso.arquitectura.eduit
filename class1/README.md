# Instruction

vuelos.com

2M x days

## Flow E-Commerce

### Search
- Form => Fields : [from, to, date (1)]
- Categories => subcategories
- Calls: 2M

### Results
Items (clusters) => details : checkout

### Checkout
Item details => Form => payments process.


# Steps

## Backend
- Cloud (AWS): S3, EC2,
- Technologies : Node.js, MongoDB, Redis
- API: Search, Results, Checkout, geoip
- GeoIP
- CDN (S3)

### API

- Swagger
- Versions

#### Search

- header: version-app = '1.0.0'
- header: method-version = '1'

GET: /
GET: /result/:id
POST: /result/:id

```javascript
const mappingVersions = {
  '1.0.2': 'searchMethod15',
  '1.0.3': 'searchMethod2',
  '1.0.4': 'searchMethod2',
  '1.0.5': 'searchMethod2',
};

const versionApp =  req.headers['version-app'];
if ( mappingVersions[versionApp]) {
  const result = await searchService[mappingVersions[versionApp]];
  return res.json(result);
}


// services
// services.versions

const searchMethod2 = async (req, res) => {
  // ...
}
```

Providers: [ adz, skyscanner ]

```javascript
const searchParams  = 'EZE;MAD;A1;201218';

const transactionId = `${new Date().getTime()}-${Math.random()}`;
res.json({ transactionId });

await Promise.all([
  services.search('skyscanner', searchParams, transactionId), // 5s
  services.search('adz', searchParams, transactionId), // 12s
]);
```

##### TransactionId

Search => Return Id <= > [providers]

Result/:TransactionId  (pooling)

{
  docs: [
  { transactionId: 'asdasdasd', provider: 'skyscanner', results: [] },
  { transactionId: 'asdasdasd', provider: 'adz', results: [] },
  ]
}


GET: /search/:transactionId
Return: 'EZE;MAD;A1;201218'


## Frontend

- React: Redux (reducers, actions), Sagas (API Client), Recompose (components)
- Webpack
- React Native (mobile version) : ios, Android.


## Others
- Github
- Circle (CI)
- eslint
- github hooks

# Mocks and insurances services
Destino ; days ; 0-12 ; precio

Assiscard (product 1) (50 productos)  x 200 providers

EU; 0-30; 0-12; 40
EU; +1; 0-12; 4
EU; 0-30; 13-18; 45
EU; +1; 13-18; 8
EU; 0-30; 18-40; 120
EU; +1; 18-40; 20


Pasajero1: 120 + 120  = 240

- 3%
- 20%
- 10 %

= xxx


IF additionalDays > 0-30 : use 0-30
IF totalDays > 60 : 5%
IF totalDays > 30: 3%
IF totalPass >= 3: 20%
IF totalDays > 90: 50%
Website 10%


Pasajero2:
Pasajero3:



200 providers => 30 products = 6000
Days rulez 50 => $each


results: [
{
  days:
  pass:
}
].map(p => promotions(p));


## Script.

### Providers
Providers: 50 providers random
```javascript
{
  name: '',
  logo: '',
  address: '',
  phone: ''
}
```


### Products
Products: 30~50 each providers

```javascript
{
  providerId: '',
  name: '',
  coverage: [
    { name: '', value: '' }
  ]
}
```


### ProductsDays
ProductsDays: 10~20 : each product
```javascript
{
  providersId: '',
  productId: '',
  fromDays: 1,
  toDays: 30,
  fromAge: 0,
  toAge: 8,
  fee: 15
}
```

### ProductsAdditionalDays
ProductsAdditionalDays: 1 : each product
```javascript
{
  providersId: '',
  productId: '',
  fromAge: 0,
  toAge: 8,
  fee: 2
}
```
