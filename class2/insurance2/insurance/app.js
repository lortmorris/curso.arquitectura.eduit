const http = require('http');
const express = require('express');
const mongojs = require('mongojs');
const Universal = require('./lib/universal');

const db = mongojs('mongodb://127.0.0.1/insurances',['products', 'modules', 'aditionaldays']);
const app = express();
const server = http.createServer(app);

const Application = {
	db,
};

const products = Universal(Application, 'products');
const aditionalDays = Universal(Application, 'aditionaldays');
const modules = Universal(Application, 'modules');

const discounts = [
{title: 'website 5%', por: -5},
{title: 'IVA', por: 21}
];

const Products = {};
const loadData = (cb) => {
	products.get()
	.then( (prods) => {
		prods.forEach(p => Products[p.id] = Object.assign(p, {modules:[], aditionaldays: []}));
		return modules.get();
	})
	.then( mods => {
		mods.forEach(m => {
				Products[m.IdProduct].modules.push(m);
			});
		return aditionalDays.get();
	})
	.then( aditionals => {
		aditionals.forEach(ad => {
			Products[ad.IdProduct].aditionaldays.push(ad);						
		});
		cb();
	})
	.catch(err => console.error(err));
	
};

const search = (params) => {
		const result = [];
		console.info('Seach params: ', params);

		for(const k in Products) {
			const product = Products[k];
			const itemResult = {
				passanges: {},
				product: {Name: product.Name},
			};
			
			console.info('Product: ', product.Name);
			params.passanges.forEach(pas => {
				console.info('Age: ', pas);
				itemResult.passanges[pas] = {};
				var aux = null;
				product.modules.forEach( m => {
					console.info('module: ', m.ageFrom,  m.ageTo);
					if (m.ageFrom <= pas && m.ageTo >= pas) {
						if (aux === null) aux = m;
						console.info(' encontre edad en module');
						aux = m.dayTo <= params.days ? m : aux;
					}
				});

				console.info('module match: ', aux);
				itemResult.passanges[pas].module = aux;

				var aditionalPrice = 0;
				product.aditionaldays.forEach( ad => {
					console.info('aditionalDays: ', ad.fromAge,  ad.toAge);
					if (ad.fromAge <= pas && ad.toAge >= pas) {
						console.info(' encontre edad en aditionals');
						aditionalPrice = ad.Price;
					}
				});

				itemResult.passanges[pas].aditionalPrice = aditionalPrice;
				itemResult.passanges[pas].price = itemResult.passanges[pas].module.price;
				console.info(' PRICE    :::: ', itemResult.passanges[pas].price);
				if (params.days > itemResult.passanges[pas].module.dayTo ){
					itemResult.passanges[pas].price += ( params.days - itemResult.passanges[pas].module.dayTo ) * itemResult.passanges[pas].aditionalPrice;
				} 
				itemResult.passanges[pas].prices = [{title: 'initial', value: itemResult.passanges[pas].price}];
				result.push(itemResult);
			});
			
		}

		result.forEach( r => {			
			discounts.forEach(d => {
				for( var k in r.passanges) {
					console.info(r.passanges[k].price);
					r.passanges[k].price += (r.passanges[k].price / 100) * d.por;
					r.passanges[k].prices.push({title: d.title, value: r.passanges[k].price});
				}
			});
		});
		
		return ({docs: result});
	
};

app.get('/', (req, res) => {
	res.json(search({passanges: req.query.age, days: req.query.days}));
	
});

loadData(()=> server.listen(5000, ()=> console.log('ready ')));
setInterval(()=> loadData(()=> console.log('reload') ) , 1000 * 60 * 60);