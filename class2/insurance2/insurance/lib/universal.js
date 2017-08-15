const Universal = (app, col) => ({
	get: () => new Promise((resolve, reject) => {
		app.db[col].find({}, {}, (err, docs) => {
			if (err) return reject(err);
			return resolve(docs);
		});
	}),
});

module.exports = Universal;