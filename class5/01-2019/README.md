# Social Networks.


- Users
- Feed: [items]
- Interactions [Items]


## Swagger

Swagger is the first API definition standard, based on yaml files.

(http://editor.swagger.io/)


## RESTFul API


/users
  :POST insert
  : GET
    :/getById/{id}
    :/getByEmail/{email}


Population
/users/getById/{id}
/users/getByEmail/{email}


/carts
  :POST insert


/cartscolors
  :POST insert


collection.users = [
{
  fname: 'pepe',
  lname: 'luis',
  email: 'pepeluis@mail.com',
  scoring: 5928,
  },
{},
];

db.getCollection('users').find({ fname: 'pepe', scoring: { $gt: 5000 } }, {});


/users (module)
  GET: - search {all}
  PUT: - Insert
  DELETE: - remove
  PATCH: - update {...}



### GET (search)
controller.search: {
  /${module}
  default: {}
    q=fname:pepe,lname:/lu/

  db.getCollection(${module}).find(q, {});
}
users - carts - feed



# Universal pattern

Steps:
- npm install universal-pattern express config
- create config dir and put default.json files
- create folder swagger
- put you yaml file into swagger folder, and enjoy

Running: 
http://localhost:5000/services/docs/
