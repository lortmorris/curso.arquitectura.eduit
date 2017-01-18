const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1/geo', ['countries', 'states','airlines','airports', 'cities']);
const countries = require('./countries.json');
const countries2 = require('./countries-and-provinces-states-regions/countries.json');
db.countries.insert(countries, (err, doc)=>{
  err ? console.log('error importando countries') : console.log('countries ok');
});

countries2.forEach(c=>{
  console.log('process:' , c.name)
  if(c.filename){
  const states = require('./countries-and-provinces-states-regions/countries/'+c.filename+'.json');

  db.countries.update({cca2: c.code}, {$set: {states: states}}, (err, data)=>{
    err ? console.log('pincho ', c.name) : console.log('todo ok ', c.name);
  });
}


})
