const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error("Koneksi ke Database Error:", error);
  } else {
    console.log("Database Berhasil Terkoneksi");
  }
});

module.exports = connection;
