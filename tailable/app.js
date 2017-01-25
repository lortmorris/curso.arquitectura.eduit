const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1/tracker', ['logs']);

const cursor = db.logs.find({}, {}, {tailable: true, timeout: false});

cursor.on('data', function (doc) {
    console.log('new document', doc)
})
