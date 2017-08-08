
const providers = ['Assisto', 'Assiscard', 'TotalAsisto'];
const products = ['Europa', 'Asia', 'USA', 'Viajeros'];
const getRandom = (max) =>  Math.floor(Math.random() * max);
const getRandomData = (data) =>  data[Math.floor(Math.random() * data.length)];

const getRandomItem = (type='module') =>{
  const item = {
    provider: getRandomData(providers),
    producto: `${getRandomData(products)} ${getRandom(100)}`,
    ageFrom: getRandom(5),
    ageTo: getRandom(80) + 6,
    fee: type === 'module' ? (Math.random() * 1000) + 40 : (Math.random() * 15 ) + 2,
  };
  if (type === 'module') {
    item.daysFrom = getRandom(30);
    item.dagysTo = getRandom(330) + 30;

  }
  return item;
}

const modulesPrice = [];
const daysPrice = [];
for( let x=0; x<100; x++) {
  modulesPrice.push(getRandomItem('module'));
  daysPrice.push(getRandomItem('days'))
}


const getMock = (age1, age2, age3, days) => {
  console.info('Searching: ', age1, age2, age3, days);
  return {
    modulesPrice,
    daysPrice,
  }
}

module.exports = getMock;
