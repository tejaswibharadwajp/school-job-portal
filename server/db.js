const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tejaswi@123',
  database: 'job_board'
});
conn.connect();
module.exports = conn;