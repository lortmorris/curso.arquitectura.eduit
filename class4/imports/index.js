const fs = require('fs');
const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/farma', ['products', 'pricelist', 'clients', 'stock']);

const readFile = (filename, positions = []) => {
  const content = fs.readFileSync(`../csv/${filename}`).toString();
  const lines = content.split("\n");

  return lines.map(l => {
    const col = l.split(';');
    return r = col.filter( (a, index) => positions.indexOf(index) !==-1);
  });
}

const saveData = (collection, data) => {
  return new Promise((resolve, reject) => {
    db[collection].drop(()=> {
      db[collection].insert(data, (err, docs) => {
        err ? reject(err) : console.info(docs);
        resolve(docs);
      }); // end insert
    }); // end drop
  }); // end promise
}
const Application = {
  db,
  readFile,
  saveData,
};

require('./clients')(Application)
.then(result => {
  return require('./items')(Application);
})
.then(result => {
  return require('./itemsstock')(Application);
})
.then(result => {
  return require('./preciolistadetalle')(Application);
})
.then(result => {
  db.close();
})
.catch(err => console.error('CATCH: ', err))
