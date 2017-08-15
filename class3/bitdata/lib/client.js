const dgram = require('dgram');
const encoder = require('./encoder');


const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');

const Client = config => ({
	sendData: (barcode, price, location, datetime) => {
		const str = encoder(barcode, price, location, datetime);
		console.info(' STR: ', str);
			client.send(str, 0, str.length, config.port, config.ip, (err) => {
				console.log(err);
	  		client.close();
		});


	}
});

module.exports = Client;