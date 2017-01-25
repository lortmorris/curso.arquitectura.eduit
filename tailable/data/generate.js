var names = ['Pepe','Carlos', 'Adrian', 'Jose', 'Roberto'];
function randomNumber(limit){
  limit = limit || 100
  return Math.floor(Math.random()*limit);
}

function randomIP(){
  return [randomNumber(255),
          randomNumber(255),
          randomNumber(255),
          randomNumber(255)
          ].join('.');
}

db.createCollection('logs',  {capped : true, size : 5242880, max : 5000 });

function dataRandom(){
for(var x=0; x<10; x++) {
     db.logs.insert({
      name: names[Math.floor(Math.random()*names.length)],
      ip: randomIP(),
      avg: randomNumber(100000)
    });
  }
}

dataRandom();
