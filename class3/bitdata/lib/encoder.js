const moment = require('moment');
const Encode = (barcode, price, location, datetime) => {
	const binaries = {};
	let strReturn ="";

	binaries.barcode = parseInt(barcode).toString(2);
	binaries.price = parseInt((''+price).replace('.','')).toString(2);
	binaries.location = location.toString(2);
	binaries.datetime = parseInt(moment(datetime).format('YYYYMMDDHHmmss')).toString(2);

	binaries.barcode = "0".repeat(40).slice(binaries.barcode.length).concat(binaries.barcode);
	binaries.price = "0".repeat(24).slice(binaries.price.length).concat(binaries.price);
	binaries.location = "0".repeat(40).slice(binaries.location.length).concat(binaries.location);
	binaries.datetime = "0".repeat(48).slice(binaries.datetime.length).concat(binaries.datetime);

	let str = `${binaries.barcode}${binaries.price}${binaries.location}${binaries.datetime}`;

	while(str.length > 0){
		const b = str.slice(0, 8);
		str = str.slice(8, str.length);
		const as = String.fromCharCode(parseInt(b, 2));
		strReturn += as;
	}
	return strReturn;
};

module.exports = Encode;