const faker = require("faker");
const fs = require("fs");
var csvWriter = require("csv-write-stream");
var writer = csvWriter();

// =============================================================
// this script creates (and then appends) dates.csv
// =============================================================

console.time("appending 5 million rows to dates.csv");

// load 5 million rows into dates.csv
const NUM_PASSES = 5;
const NUM_LISTINGS = 1000000;

var writer = csvWriter({ headers: ["date", "apartment_id"], separator: "," });
let writeStream = fs.createWriteStream("dates.csv", { flags: "a" });
writer.pipe(writeStream);

const writeOneMillion = () => {
  let row = [];
  for (let i = 0; i < NUM_LISTINGS; i++) {
    row = [
      `201${faker.random.number() % 10}-${(faker.random.number() % 11) +
        1}-${(faker.random.number() % 29) + 1}`,
      faker.random.number() % 1000
    ];
    writer.write(row);
  }
};

for (let j = 0; j < NUM_PASSES; j++) {
  writeOneMillion();
  let used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`
  );
}
writer.end();
console.timeEnd("appending 5 million rows to dates.csv");
writer.destroy();
