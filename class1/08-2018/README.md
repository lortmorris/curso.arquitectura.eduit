# Asistencia al viajero

SPA (Single Page Application).

## Front: React.
- Node.js
- React.js
- Redux
- React-router
- Sagas
- Recompose
- Axios

1 developer: 8hs

### Times.

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


## Backend (API)
- Node.js (last version)
- MongoDB (mongojs)
- Express ( https://expressjs.com/en/starter/installing.html )
- Swagger ( http://editor.swagger.io/ )
- Universal Pattern | Onion Pattern.

1 developer: 8hs
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

1 devop:

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


### Pages
- Home

## API
 - Countries (CRUD)
 - Searches
 - Results ( Search )
   - Proviers (CRUD)
   - Products (CRUD)
   - Prices (CRUD)
   - Promotions (CRUD)

 - Results ( by hashId )
 - Checkout (hashId, paymentMethodId)  => operationId
 - CheckoutStatus (hashId, operationId, status )
 - CMS (static pages)
