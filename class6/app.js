const http = require("http");
const express = require("express");
const app = express();
const uuid = require('uuid');
const mongojs = require("mongojs");
const redis = require("redis");

const db = mongojs("mongodb://127.0.0.1/logs", ["history"]);
const pub = redis.createClient();

var counter =0;

process.on("uncaughtException" , ()=>{
	console.log("Exploto el mundo");
});

process.on("ReferenceError" , ()=>{
	console.log("Reff el mundo");
});


app.use((req, res, next)=>{
	req.uuid = uuid.v4();
	req.logs = [];	
	req.init = {
		uuid: req.uuid,
		date: new Date().getTime(),
		hrtime: process.hrtime(),
		body: req.body,
		query: req.query,
		url:req.url,
		headers: req.headers,
		type: "init"
	};

	let end = res.end;
	res.end = ()=>{
		let toSave = [req.init].concat(req.logs);
		toSave.concat([{
			type: "end",
			date: new Date().getTime(),
			hrtime: process.hrtime()
		}]);
		db.history.insert(toSave);
		end.call(res);
	};

	req.log = function(){
		req.logs.push({
			uuid: req.uuid,
			time: new Date().getTime(),
			hrtime: process.hrtime(),
			data: arguments
		});
	};
	next();
});

app.use((req, res, next)=>{
	req.log("notify", "counter");
	counter++;
	asd();	
	next();
});

const static = express.static("./public");
app.use((req, res, next)=>{
	req.log("notify", "static", req.url);
	static(req, res, next);
});

app.get("/static", (req, res)=>{
	req.log("notify","static", counter);
	res.send(""+counter);
});

http.createServer(app).listen(5000);