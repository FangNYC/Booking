var pg = require("pg");
var fs = require("fs");

// ---------- Connect to the "booking" database.

// ---------- NOTE this user does not have root permissions
// ---------- 'booking' db must exist
// ---------- db permissions must be granted to user

var config = {
  user: "maxroach",
  host: "104.248.111.122",
  database: "booking",
  port: 26257,
  ssl: {
    ca: fs.readFileSync("./certs/ca.crt").toString(),
    key: fs.readFileSync("./certs/client.maxroach.key").toString(),
    cert: fs.readFileSync("./certs/client.maxroach.crt").toString()
  }
};

// Create a pool.
var pool = new pg.Pool(config);

module.exports.pool = pool;
