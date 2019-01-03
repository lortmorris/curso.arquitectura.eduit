# Prices calculator.

# Steps
- npm init
- npm install express
- add watch script into package.json


# Problem
Intranet local system, brokers.
Clients => Internet => Web app => e-commerce

Not access SQL Server.

SQL Server => CSV => Every 4 hours => FTP.

## SQL Server
- 10.000 clients
- 100.000 products.

PricesLists
ProId, ClientId, Price
100, 10, 105
100, 11, 98

## Uniques

- Clients
- Products
- PricesLists


## Importers

### Clients

- Download clients.csv (from FTP)
- Import into MongoDB, collection clientsTemp
- Each all Users, search into 'clientsTemp', if not exists, set enabled = false


### Products.

- Download products.csv (from FTP)
- Import into MongoDB, collection productsTemp

### PricesLists
- Download prices.csv (from FTP)
- Import into MongoDB, collection pricesTemp

### Merge Products <> Prices

Collection: ProductsPrices
```javascript
{
  _id: ObjectId,
  product: {
    name: String,
    brand: String (ex: Arcor),
  },
  productId: String (UUID),
  price: Float,
  clientId: String (UUID),
}
```


# E-commerce.

## Uniques

- Users
- Transactions

### Users

```javascript
{
  _id: ObjectId,
  fname: String,
  lnames: String,
  email: String,
  password: String,
  clientId: String : from SQL Server (uuid),
  enabled: false,
}
```

Login: email = $email, password = $password, enabled = true, clientId != NULL


### Transactions
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  clientId: String : from TemporalCollection (uuid),
  products: [
    {
      productId: String (uuid),
      cant: Integer,
      priceUnit: Float,
      priceFinal: Float,
    }
  ]
}
```


## Endpoints

- POST: /users/login
- (CRUD) /users [PUT, PATCH, DELETE, GET]
- GET: /products
- POST: /sales
