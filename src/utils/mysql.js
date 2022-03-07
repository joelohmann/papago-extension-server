const mysql = require('mysql');

var connection;

var db_config = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
}

connection = mysql.createConnection(db_config);

module.exports = connection;
