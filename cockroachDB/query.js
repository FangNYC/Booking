var pool = require("./connection.js").pool;

function query(query, values, cb) {
  pool.connect(function(err, client, done) {
    // Close communication with the database and exit.
    var finish = function() {
      done();
      // process.exit();
    };

    if (err) {
      console.error("could not connect to cockroachdb", err);
      finish();
    }

    client.query(query, values, (err, res) => {
      if (err) cb(err, null);
      cb(null, res);
      finish();
    });
  });
}

module.exports.query = query;
