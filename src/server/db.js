const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	password: '300398',
	host: 'localhost',
	port: 5432,
	database: 'boulder',
});

module.exports = pool;
