# async / await

try / catch
throw Error

## Errors
(https://nodejs.org/api/errors.html)

# Onion Pattern.

All application is a big object, i should be access to each resource from any app member.

```javascript
const Application = {
  db,
  app,
  routes,
  libs: {
    fs,
  },
  redis,
};
```


## mongojs

(https://github.com/mafintosh/mongojs)

```javascript
const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1/cursoarq', ['users', 'products', 'providers', 'prices']);
```
