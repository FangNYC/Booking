// let { start } = require('./start_timer')
let fs = require("fs");

// =============================================================
// stores the start time for a timer in a csv file
// =============================================================

console.log("stopping timer");
const endTime = Date.now();

fs.readFile("./timer/start.csv", "utf8", function(err, data) {
  var dataArray = data.split(/\r?\n/); //Be careful if you are in a \r\n world...
  // Your array contains ['ID', 'D11', ... ]
  console.log("start time");
  console.log(parseInt(dataArray[1]));
  console.log("end time");
  console.log(endTime);
  const startTime = parseInt(dataArray[1]);
  console.log("Generating Data, Seeding MySQL and Mongo");
  console.log("took " + (endTime - startTime) + " ms");
});
