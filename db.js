const mysql = require("mysql2/promise");
require("dotenv").config();
const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

module.exports = mysqlPool;
