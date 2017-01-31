const http=require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1/geo', ['countries']);
const uuidV4 = require('uuid/v4');
const requestInMemory = {};

process.on("uncaughtException" , ()=>{
	console.log("Exploto el mundo");
  console.log(requestInMemory);
});

process.on("ReferenceError" , ()=>{
	console.log("Reff el mundo");
  console.log(requestInMemory);
});



app.use((req, res, next)=>{
    req.log = (txt)=>{
      req._metadata.logs.push({
        datetime: new Date(),
        txt:txt,
        query: req.query || {},
        body: req.body || {},
      });
    };
    req._metadata ={
      uuid:uuidV4(),
      logs:[],
      headers: req.headers
    };

    requestInMemory[req._metadata.uuid] = req._metadata;

    const end = res.end;
    res.end = function(){
      end.apply(res, arguments);
      console.log(res.req._metadata);
      delete requestInMemory[req._metadata.uuid];
    }
    next();
});

app.use( express.static('./public') );

const clear=(req, docs)=>{
  req.log('paso por clear')
  docs.forEach((el, index)=>{
    delete el.states;
    docs[index] = el;
  });
  return docs;
}

app.get('/',async (req, res)=> {
  req.log('visit /');
  db.countries.find({},{},(err, docs)=>{
    if(err) res.json({error: err});
    else {
      const response = clear(req, docs);
      req.log('total countries: '+response.length);
      res.json( response ) ;
    }
  });
});

server.listen(5000);
