
# Data optimize (API)

Vuelos Results.

result = {
  metadata: {
    airlines: {
      'AAL': {
        name: 'American Airline',
        logo: 'http://asdasdasd.com/image.jpg',
        code: 'AAL',
      },
      'AA': {
        name: 'Aerolineas Argentinas',
        logo: 'http://asdasdasd.com/image.jpg',
        code: 'AA'
      },
    },
    airports: {
      'EZE': {
        code: 'EZE',
        logo: '...',
        geoCode: [23.123123,12.3123]
      },
      'MIA': {
        code: 'MIA',
        logo: '...',
        geoCode: [23.123123,12.3123]
      },
    }
  },
  result: [
    {
      outbound: {
        departure: {
          airline: 'AAL',
          airport: 'EZE',
        },
      },
      inbound: {
        departure: {
          airline: 'AA',
          airport: 'MIA',
        },
      }
    }
  ]
};


# Process, clustering and forks.

(https://www.linode.com/docs/web-servers/nginx/use-nginx-reverse-proxy/)


## Nginx reverse proxy

```js
server {
  listen 80;
  listen [::]:80;

  server_name example.com;

  location /users {
      proxy_pass http://localhost:3000/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
  }

  location /sales {
      proxy_pass http://localhost:3001/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
  }

  location /messages {
      proxy_pass http://localhost:3002/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
  }

}
```


## forever

forever start app.js // run app.js
forever list  // show all forever apps running

## pm2


# Debug, profiling and logs.

R:1          R:1          R:1           R:1 < return error.
[Search] => [Results] => [Checkout] => {Payment Gateway}


(https://www.npmjs.com/package/winston)


# Owasp

(http://sqlmap.org/)

# nodemailer

(https://nodemailer.com)


# Handlebars

(https://handlebarsjs.com/)
(https://www.npmjs.com/package/express-handlebars)


# SaaS
(https://mlab.com/)
(https://redislabs.com/)
(https://socket.io/)
(https://zeit.co/)


# autocannon
(https://www.npmjs.com/package/autocannon)

```bash
cesars-MacBook-Pro:01-2019 cesarcasas$ autocannon http://localhost:5000/
Running 10s test @ http://localhost:5000/
10 connections

Stat         Avg      Stdev   Max     
Latency (ms) 0.01     0.07    8.33    
Req/Sec      40220.37 2893.66 41593   
Bytes/Sec    4.44 MB  321 kB  4.58 MB

442k requests in 11s, 48.7 MB read

```
