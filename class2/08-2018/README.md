# Mock de datos.

Product price = Matrix [ ages, periods];


# express mws

MWS[
() => {},
() => { if req.url === '/search ' , ()=>}
() => {...},
() => { 404 }
]

# compression (output)
```javascript
const compression = require('compression');
app.use(compression({
level: 9,
}));

```

# helmet (security headers)
```javascript
const helmet = require('helmet');
app.use(helmet());
```

# Owasp
(https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf)


# autocannon
(https://github.com/mcollina/autocannon)

## 404
```bash
cesars-MBP:08-2018 cesarcasas$ autocannon "http://localhost:5000/"
Running 10s test @ http://localhost:5000/
10 connections

Stat         Avg      Stdev   Max     
Latency (ms) 0.14     0.41    10.66   
Req/Sec      12492.19 1808    13167   
Bytes/Sec    7.12 MB  1.03 MB 7.52 MB

0 2xx responses, 137407 non 2xx responses
137k requests in 11s, 78.5 MB read
```

## search
```bash
cesars-MBP:08-2018 cesarcasas$ autocannon "http://localhost:5000/search?age=12&days=167"
Running 10s test @ http://localhost:5000/search?age=12&days=167
10 connections

Stat         Avg     Stdev   Max     
Latency (ms) 9.2     1.35    24.18   
Req/Sec      1032.1  81.88   1149    
Bytes/Sec    31.2 MB 2.53 MB 34.5 MB

11k requests in 11s, 341 MB read
```


# Cache local (only for test)
```javascript
const cache = {};

app.get('/search', (req, res) => {
  const key = `cache-${req.query.age}-${req.query.days}`;
  let result = {};
  if (typeof cache[key] === 'undefined') {
    result = search(parseInt(req.query.age, 10), parseInt(req.query.days, 10));
    cache[key] = result;
  } else {
    result = cache[key];
  }

  res.json(result);
  fs.writeFileSync(`./results/age${req.query.age}-days${req.query.days}.json`, JSON.stringify(result));
});
```


# Redis

Balance = {
Server [ * * * * ], // 4 process
Server [ * * * * ],
Server [ * * * * ],
Server [ * * * * ],
} // 16 => Redis


## challenge
 For windows users: ( https://github.com/ServiceStack/redis-windows/tree/master/downloads )

 Redis client Node.js: ( https://www.npmjs.com/package/redis )

 
