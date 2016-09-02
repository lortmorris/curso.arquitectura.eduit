console.log("Class 1");

const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const myserver = http.createServer(app);
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const airports = ["EZE","PE","MIA","AER","AUX","RET","LUL","POP","FRE","NIG","CBA"];

const getRandomAirport =(airs)=> airs[ Math.floor(Math.random()*airs.length)];


const decorator=(t)=>{
	return {
		from: t.from,
		to: t.to,
		deperture: new Date(),
		aperture: new Date(),
		prices:{
			adult: t.prices,
			child: t.prices * 0.8,
			infant: 0,
			taxes:{
				tax: t.prices * (Math.random() * 15),
				others: 0		
			}
		}
	}
}

const getCluster = (template)=>{
	let stops=[];
	let limit = Math.floor(Math.random()*5);
	

	let getPrice = (min, max)=> min + Math.floor( Math.random() * (max - min) );
	let rem = (a,e)=> a.filter( z=> z!=e );


	if(limit==0 || limit==1) 
		return [Object.assign({}, template, {
									prices: getPrice(template.prices[0], template.prices[1])
								})
				];

	let airs=airports.filter((a)=> !(a==template.from || a==template.to) );	
	let aux = null;

	console.log("Generando cluster");

	for(let x=0; x<=limit; x++){

		let t =Object.assign({}, template);

		if(x==0){	
			aux = getRandomAirport(airs);
			airs = rem(airs, aux);
			t.to = aux;
		}else if(x==limit){
			t.from = aux;
		}else{
			t.from = aux;
			aux = getRandomAirport(airs);
			airs = rem(airs, aux);
			t.to = aux;
		}
		
		t.prices =  getPrice(t.prices[0], t.prices[1]);
		stops.push(t);
	}
	return stops;
}

const getClusters = (template)=>{
	let clusters = [];

	for(let i=0; i<Math.random()*10; i++) {
		clusters.push( getCluster(template).map( t=>decorator(t) ) );
	}		
		
	
	return clusters;
}



app.post("/vuelos", (req, res)=>{
	console.log("***************************************");

	let clusterTemplate={
		from: req.body.from,
		to: req.body.to,
		prices: [req.body.price,5000]
	};

	res.json(getClusters(clusterTemplate));
});

myserver.listen(port);