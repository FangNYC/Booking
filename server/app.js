require("newrelic");

const bodyParser = require("body-parser");
var compression = require("compression");
const cors = require("cors");
// const database = require("../database/index.js"); // mysql connection
const database = require("../cockroachDB/index.js");

const express = require("express");
const morgan = require("morgan");
const path = require("path");

var app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use("default", morgan);
app.use(express.static(path.join(__dirname + "/../client/dist")));

app.get("/api/listing/:id", (req, res) => {
  id = req.params.id;
  database
    .getListingData(id)
    .then(dataObj => {
      res.status(200).send(dataObj);
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/api/listings", (req, res) => {
  database
    .getListings()
    .then(dataObj => {
      res.status(200).send(dataObj);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// { price, minStay, stars, numRatings, max }
// '10000','10','1','1','1000'
app.post("/api/listing", (req, res) => {
  console.log(req.body);
  database
    .postListing(req.body)
    .then(dataObj => {
      res.status(200).send(dataObj);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// posts a listing with a specified id
app.post("/api/listingId", (req, res) => {
  database
    .postListingId(req.body)
    .then(dataObj => {
      res.status(200).send(dataObj);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete("/api/listing/:id", (req, res) => {
  database
    .deleteListing(req.params)
    .then(dataObj => {
      res.status(200).send(dataObj);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/api/dates", (req, res) => {
  database
    .getDates()
    .then(dataObj => {
      res.status(200).send(dataObj);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// { date, apartmentId }
// '1/02/2019','1'
app.post("/api/date", (req, res) => {
  database
    .postDate(req.body)
    .then(dataObj => {
      res.status(200).send(dataObj);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// TODO implement delete dates

app.get("/api/*", (req, res) => {
  res.send(404);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

module.exports = app;
