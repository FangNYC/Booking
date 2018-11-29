const fs = require("fs");
var csvWriter = require("csv-write-stream");
var writer = csvWriter();

// =============================================================
// stores the start time for a timer in a csv file
// =============================================================

var writer = csvWriter({
  headers: ["start"],
  separator: ","
});
let writeStream = fs.createWriteStream("./timer/start.csv");
writer.pipe(writeStream);

let start = Date.now();
writer.write([Date.now()]);

writer.end();

writer.destroy();
