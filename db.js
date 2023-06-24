const mysql = require('mysql2/promise');
const {host, user, password, database} = require('./dbSet');

const pool = mysql.createPool ({ 
  host: host, 
  user: user,
  password: password,
  database: database,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

module.exports = pool;