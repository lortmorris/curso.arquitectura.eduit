const http = require('http');
const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1/seguros',['products', 'modules', 'aditionaldays']);
const app = express();
const server = http.createServer(app);

const Products = {};
const loadData = (cb) => {
	db.products.find({}, {}, (err, docs)=> {
		docs.forEach(p => Products[p.id] = Object.assign(p, {modules:[], aditionaldays: []}));
		db.modules.find({}, {}, (err2, docs2) => {
			docs2.forEach(m => {
				Products[m.IdProduct].modules.push(m);
			});

			db.aditionaldays.find({}, {}, (err3, docs3) => {
					docs3.forEach(ad => {
						Products[ad.IdProduct].aditionaldays.push(ad);						
					});

					console.log(Products);
					cb();
				});

		});
	});
};

const search = (params) => {
	return new Promise((resolve, reject) => {
		const result = [];

		for(k in Products){
			const product = Products[k];
			params.passanges.forEach(pas => {
				product.modules.forEach(m => {
					if(module.ageFrom < currentAge) {

					}
				});
			});
			
		}
		resolve({docs: result});
	});
};

app.get('/', (req, res) => {

	search({passanges: req.query.age});
	.then(result => res.json(result))
	.catch(err => res.json(err));
});

loadData(()=> server.listen(5000, ()=> console.log('ready ')));
setInterval(()=> loadData(()=> console.log('reload') ) , 1000 * 60 * 60);