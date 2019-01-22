
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
