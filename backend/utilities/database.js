const mysql = require("mysql2/promise");
require('dotenv').config();
var pool;
module.exports = function getPool() {
    if (pool) {
      return pool;
    }

    return mysql.createPool({
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DATABASE,
    });
};