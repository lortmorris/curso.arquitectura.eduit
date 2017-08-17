const fs = require('fs');
const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/farma', ['items', 'clients', 'listprices', 'stock']);



