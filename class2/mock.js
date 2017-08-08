
const providers = ['Assisto', 'Assiscard', 'TotalAsisto'];
const products = ['Europa', 'Asia', 'USA', 'Viajeros'];
const getRandom = (max) =>  Math.floor(Math.random() * max);
const getRandomData = (data) =>  data[Math.floor(Math.random() * data.length)];

const getRandomItem = () =>({
  provider: getRandomData(providers),
  producto: `${getRandomData(products)} ${getRandom(100)}`,
  ageFrom: getRandom(5),
  ageTo: getRandom(80) + 6,
  daysFrom: getRandom(30),
  dagysTo: getRandom(330) + 30,
  fee: (Math.random() * 1000) + 40,
});

const getMock = (age1, age2, age3, days) => {
  const results = [];
  for( let x=0; x<100; x++) results.push(getRandomItem());
  return {
    results,
  }
}

module.exports = getMock;
