const http = require('http');

let airports = ['EZE', 'MIA', 'NYC', 'WWW', 'ZZZ', 'AAA', 'BRZ', 'SYN', 'AUT', 'RUS', 'MX'];

const getAirport = ()=> airports[Math.floor(Math.random() * airports.length)];

const getStop = (from, to)=> {
	return {
		from: from,
		ftime: new Date(),
		to: to,
		ttime: new Date(),
		airline: 'ASD'
	}
}

const getStops = (from, to)=> {
	let stops = [];
	let limit = Math.floor(Math.random() * 5) + 1;
	let aux = [...airports];

	let pop = e=> aux.filter(i=> !(i == e));
	aux = pop(from);
	aux = pop(to);

	let getStep = ()=> {
		let a = aux[Math.floor(Math.random() * aux.length)];
		aux = pop(a);
		return a;
	};

	let f, t;
	for (let x = 1; x <= limit; x++) {

		if (x == 1 && x == limit) return stops.push(getStops(from, to));

		if (x == 1) {
			f = from;
			t = getStep();
		}

		if (x > 1 && x < limit) {
			f = stops[stops.length - 1].to;
			t = getStep();
		}

		if (x == limit) {
			f = stops[stops.length - 1].to;
			t = to;
		}

		stops.push(getStop(f, t));
	}
	return stops;
}

const getCluster = (from, to)=> {
	return {
		aperture: {
			stopovers: getStops(from, to),
			datetime: new Date(),
			cabclass: 'TUR'
		},
		deperture: {
			stopovers: [{
				from: to,
				ftime: new Date(),
				to: from,
				ttime: new Date()
			}]
			,
			datetime: new Date(),
			cabclass: 'TUR'
		}
	}
}

const getClusters = ()=> {
	let data = [];
	let limit = Math.floor(Math.random() * 30);
	let from = getAirport();
	let to = getAirport();


	data = {
		results : [],
		parameters: {
			airlines: {
				name: "asdasd",
				iata: 'sds',
				country: '',
				icon: ''
			}
		}
	};

	for (let x = 0; x < limit; x++) data.results.push(getCluster(from, to));
	return data;
}


const app = (req, res)=> {
	getClusters();
	//res.end('gracias x su visita');
	res.end(JSON.stringify(getClusters()));
};

const server = http.createServer(app);
server.listen(process.env.PORT || 5000);