
const providers = ['Assisto', 'Assiscard', 'TotalAsisto'];
const products = ['Europa', 'Asia', 'USA', 'Viajeros'];
const getRandom = (max) =>  Math.floor(Math.random() * max);
const getRandomData = (data) =>  data[Math.floor(Math.random() * data.length)];
const modulesPrice = [];
const daysPrice = [];
const Prices = {};

const getRandomItem = (type='module') =>{
  const item = {
    provider: getRandomData(providers),
    product: `${getRandomData(products)} ${getRandom(100)}`,
    fromAge: getRandom(5),
    toAge: getRandom(80) + 6,
    fee: type === 'module' ? (Math.random() * 1000) + 40 : (Math.random() * 15 ) + 2,
  };
  if (type === 'module') {
    item.fromDays = getRandom(30);
    item.toDays = getRandom(330) + 30;
  }
  return item;
}


for( let x=0; x<100; x++) {
  modulesPrice.push(getRandomItem('module'));
  daysPrice.push(getRandomItem('days'))
}

modulesPrice.forEach(m => {
  if ( typeof Prices[`${m.provider}${m.product}`] === 'undefined'){
    Prices[`${m.provider}-${m.product}`] = {
      modules: [],
      days: [],
      provider: m.provider,
      product: m.product,
    }
  }

  Prices[`${m.provider}-${m.product}`].modules.push(m);
});

daysPrice.forEach(d => {

  if ( typeof Prices[`${d.provider}${d.product}`] === 'undefined'){
    Prices[`${d.provider}-${d.product}`] = {
      modules: [],
      days: [],
      provider: d.provider,
      product: d.product,
    }
  }

  Prices[`${d.provider}-${d.product}`].days.push(d);
});



const getMock = (age1, age2, age3, days) => {
  console.info('Searching: ', age1, age2, age3, days);
  const passanges = [];
  const Results = [];

  if (age1) passanges.push(age1);
  if (age2) passanges.push(age2);
  if (age3) passanges.push(age3);

  for (p in Prices){
    const result = [];
    passanges.forEach(pas => {
      let aux = null;
      let price = {};
      Prices[p].modules.forEach(m => {
        if (pas >= m.fromAge && pas <= m.toAge){
          if (m.fromDays < days) {
            if (aux === null) aux = m;
            if (m.toDays > aux.toDays) aux = m;
          }
        }
      }); // end forEach

      price.module = aux;
      price.adiotional = null;
      price.age = pas;
      price.days = days;
      Prices[p].days.forEach(d => {
        if (pas >= d.fromAge && pas <= d.toAge){
          price.adiotional = d;
          if (aux === null) price.total = days * d.fee;
          else {
            const diffDays = aux.toDays - days;
            price.diffDays = diffDays;
            price.total = aux.fee + (diffDays > 0 ? diffDays * d.fee : 0);
          }// end else
        }//end if
      }); // end forEach

      if (price.total && price.total > 0) result.push(price);
    }); // end for passanges

    if (result.length === passanges.length) Results.push({
      total: result.reduce((acc, current) => acc + current.total , 0),
      passanges: result,
      product: Prices[p].product,
      provider: Prices[p].provider,
    });
  } // end for in

  return Results;
};

module.exports = getMock;
