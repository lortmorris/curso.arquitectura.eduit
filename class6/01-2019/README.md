
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
