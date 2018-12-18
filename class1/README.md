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

const result = await Promise.all([
  services.search('skyscanner', searchParams),
  services.search('adz', searchParams),
]);

```

## Frontend

- React: Redux (reducers, actions), Sagas (API Client), Recompose (components)
- Webpack
- React Native (mobile version) : ios, Android.


## Others
- Github
- Circle (CI)
- eslint
- github hooks



# Mocks

# TransactionId
