const faker = require("faker");
const fs = require("fs");
var csvWriter = require("csv-write-stream");
var writer = csvWriter();

// =============================================================
// this script creates (and then appends) apartment.csv
// =============================================================

console.time("appending 5 million rows to apartment.csv");

// load 5 million rows into apartment.csv
const numPasses = 5;
const ONE_MILLION = 1000000;

var writer = csvWriter({
  headers: ["id", "price", "minStay", "stars", "numRatings", "max"],
  separator: ","
});
let writeStream = fs.createWriteStream("apartment.csv", { flags: "a" });
writer.pipe(writeStream);

const writeOneMillion = () => {
  let row = [];

  for (let i = 0; i < ONE_MILLION; i++) {
    row = [
      faker.random.number() % 1000,
      faker.commerce.price(),
      faker.random.number() % 5,
      faker.random.number() % 5,
      faker.random.number() % 100,
      (faker.random.number() % 12) + 6
    ];
    writer.write(row);
  }
};

for (let j = 0; j < numPasses; j++) {
  writeOneMillion();
  let used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`
  );
}

writer.end();

console.timeEnd("appending 5 million rows to apartment.csv");

writer.destroy();
