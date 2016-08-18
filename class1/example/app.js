console.log("Class 1");

const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const myserver = http.createServer(app);
const fs = require("fs");

const getStop=(template)=>{
	return {
		from: 122,
		to: 332,
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
	for(let x=0; x<Math.random()*5; x++){
		stops.push(getStop(template));
	}
	return stops;
}

const getClusters = (template)=>{
	let clusters = []
	for(let i=0; i<Math.random()*10; i++) 
		clusters.push(getStops(template));
	return clusters;
}

let clusterTemplate={
	from: "EZE",
	end: "MIA",
	prices: [1000,5000]
};

app.get("/vuelos", (req, res)=>{
	res.json(getClusters(clusterTemplate));
});

myserver.listen(port);