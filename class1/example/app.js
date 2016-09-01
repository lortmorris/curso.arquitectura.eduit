console.log("Class 1");

const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const myserver = http.createServer(app);
const fs = require("fs");


const airports = ["EZE","PE","MIA","AER","AUX","RET","LUL","POP","FRE","NIG","CBA"];

const getRandomAirport =(airs)=> airs[ Math.floor(Math.random()*airs.length)];


const getStop=(t)=>{
	console.log(t);
	return {
		from: t.from,
		to: t.to,
		deperture: new Date(),
		aperture: new Date(),
		prices:{
			adult: 1233.23,
			child: 1000.23,
			infant: 0,
			taxes:{
				tax: 212.43,
				others: 0		
			}
		}
	}
}

const getCluster = (template)=>{
	let stops=[];
	let limit = Math.floor(Math.random()*5);
	

	if(limit==0 || limit==1) return template;
	let airs=airports.filter((a)=> !(a==template.from || a==template.to) );
	
	let rem = (a,e)=> a.filter( z=> z!=e );
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
		
		
		console.log("itera: ",x,limit,  t);		
		stops.push(getStop(t));
	}
	return stops;
}

const getClusters = (template)=>{
	let clusters = [];

	for(let i=0; i<Math.random()*10; i++) 		
		clusters.push(getCluster(template));
	
	return clusters;
}

let clusterTemplate={
	from: "EZE",
	to: "MIA",
	prices: [1000,5000]
};

app.get("/vuelos", (req, res)=>{
	console.log("***************************************");
	res.json(getClusters(clusterTemplate));
});

myserver.listen(port);