// "a".charCodeAt(0)

const Decode = (str) => {
	let finalBin = '';
	for(let x = 0; x< str.length; x++){
		console.log('x:', str[x]);
		const d = str[x].toString().charCodeAt(0);
		const b = d.toString(2);
		finalBin += ("0".repeat(8).slice(b.length).concat(b));
	}
	console.log('finalBin: ', finalBin);
	return {
		barcode: parseInt(finalBin.slice(0,40), 2),
		price: parseInt(finalBin.slice(40,24), 2),
		locationId: parseInt(finalBin.slice(64,40), 2),
		dateTime: parseInt(finalBin.slice(104,48), 2),
	}
}

module.exports = Decode;
