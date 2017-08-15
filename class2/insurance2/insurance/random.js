const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1/insurances', ['products2']);
const names = ["Euro", "USA", "Asia", "Other"];
const pid =0 ;
const Products = [];

const getRandom = (limit) => Math.floor(Math.random() * limit);
const getRandomData = (data) => data[Math.floor(Math.random() * data.length)];

const getAdditionalDays = ()=> ([
	{
		productId: pid,
		fromAge: 0,
		toAge: 8,
		price: getRandom(30) + 5
	},
	{
		productId: pid,
		fromAge: 9,
		toAge: 18,
		price: getRandom(30) + 5
	},
	{
		productId: pid,
		fromAge: 19,
		toAge: 60,
		price: getRandom(30) + 5
	}]);


const getModules = ()=> ([
	{
		IdProduct : pid,
	    ageFrom : 0,
	    ageTo : 8,
	    dayFrom : 30,
	    dayTo : 45,
	    price : getRandom(300) + 120,
	},
	{
		IdProduct : pid,
	    ageFrom : 0,
	    ageTo : 8,
	    dayFrom : 50,
	    dayTo : 60,
	    price : getRandom(300) + 120,
	},
	{
		IdProduct : pid,
	    ageFrom : 18,
	    ageTo : 60,
	    dayFrom : 30,
	    dayTo : 45,
	    price : getRandom(300) + 120,
	},
	{
		IdProduct : pid,
	    ageFrom : 18,
	    ageTo : 60,
	    dayFrom : 60,
	    dayTo : 90,
	    price : getRandom(300) + 120,
	},


])
const getRandomProduct = ()=> {
	const z = getRandomData(names);
	pid++;
	return {
		Name: ` ${z} ${getRandom(2000)}`,
		Zone: z,
		additionalDays: getAdditionalDays(),
		modules: getModules(),
		id: pid
	}
};

const random = (limit) => {
	for(var x=0; x<= limit; x++){
		Products.push(getRandomProduct());
	}

	db.products2.insert(Products, (err, docs)=>{
		console.info(err, docs);
		db.close();
	});
}


random(100);