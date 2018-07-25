# Asistencia al viajero

SPA (Single Page Application).

## Features

### Box de búsqueda
Multi format.
SEO

- Input de edad
- Origen
- Destino
- Fecha de salida
- Fecha de regreso
- Email.

* Guardar la búsqueda (API)

#### Countries Dropdown

API => get
Sort: priority | desc

### Página de resultados
- Marca
- Producto
- Descuento
- Product details
- Comprar (call to action)
- Prece

### Checkout
- Formulario
- Payment methods
- Personal information


Payment methods:

- Provider : (api o widget, check status, callback url).
Solo Mercado Pago.


## Front: React.
### Technical
- Node.js
- React.js
- Redux
- React-router
- Sagas
- Recompose
- Axios

1 developer: 8hs

### Modules.

- Initial Setup: 24hs (main container, main sagas, react router, main reducers, api client)
- Box Search: 40hs (reducers, api method, recompose, multi format, styless, language)
- Results page:
  - Filters: 12hs (reducers, recompose, styless, language).
  - Result header info: 2hs (recompose, styless, language).
  - Box cluster item: 40hs (recompose, language, styless, handler).
  - Box cluster item pass: 16hs (recompose, language, styless)
- Checkout:
  - Form pass: 16hs (recompose, styless, language, validations)
  - Payment form: 24hs (Mercado Pago).
  - Error page / Thx page: 8hs.


- Static pages:
  - Client (CMS): 40hs (recompose, reducers, styless, handlers).


Total = 222 horas.
Testing: => 40 horas.
Fix: => 40 horas.
Total = 262 horas = $6550 usd


1 developer: 8hs


## API
### Technical
- Node.js (last version)
- MongoDB (mongojs)
- Express ( https://expressjs.com/en/starter/installing.html )
- Swagger ( http://editor.swagger.io/ )
- Universal Pattern | Onion Pattern.

### Modules
- Initial Setup: 8 hs.
- Countries (CRUD): 1hs.
- Searches: 80hs. (search products => get price => promotions % => final price => currencies)
- Results ( Search ): 1hs.
- Providers (CRUD): 1 hs
- Products (CRUD): 16 hs.
- Prices (CRUD): 40hs.
- Promotions (CRUD): 40hs.
- currencies: 2hs.
- dollar cost: 16hs (cron getter, clean old prices, populate)
- Results ( by hashId ): 1hs
- Checkout: 40hs. (hashId, paymentMethodId)  => operationId
- CheckoutStatus: 8hs (hashId, operationId, status )
- CMS (static pages): 40hs.


Total = 294 horas = $7.350 usd

Testing => 60 horas.
Total = 354 = $8.850 usd.

## Testing

Total = 60 = $720 usd

## Devop (sysadmin)
### AWS

### Dev
- micro instance (db)
- micro instance (api / webapp)

- Github (organization)
- Jira
- CircleCI
- Slack (app => jira, github, circle )

### Production
MongoDB
- Replicaset  (3 instancias).
- Backups (bash script).

AWS
- EC2 (Servers x 2, 4RAM . 4 cores). 3 servers 4g RAM x 4 Cores (MongoDB)
- ELB (Elastic Load Balance)
- Route53 (DNS)
- S3 (save backups db)


# Cost
$ 16.120 usd.


1.000.000

1.000.000 Home => 700.000 (completaron form) => 100.000 (click comprar) => 5.000 (compraron)
1.000.000 x 0.15 (u$s 15000) => ( s$s 300.000 = s$s 150.000)



12 visits / second.
6 hours hot rate (80% traffic) 40 visit / second.


1 Request => 2 seconds.

1s => 40 request => 2seconds.
2s => 40 request (40 request) => 2seconds.
3s => 40 request (40 request) => 2seconds.

80 request.

1 request => Search => (Mem 6MB / [CPU] ~ 0.2 | DB: CPU ~ 0.3 )
