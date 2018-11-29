var mysql = require("promise-mysql");

pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "booking",
  connectionLimit: 15
});

function getMySqlConnection() {
  return pool.getConnection().disposer(function(connection) {
    pool.releaseConnection(connection);
  });
}

module.exports = getMySqlConnection;
