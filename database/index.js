const legacy = require("./legacy.js");
var Promise = require("bluebird");
var getMySqlConnection = require("./mysqlConnection.js");

// used by client
const getListingData = id => {
  return legacy.getListingData(id);
};

const getListings = () => {
  console.log("db get listings");
  return Promise.using(getMySqlConnection(), function(connection) {
    return connection
      .query("select * from apartment limit 100")
      .then(function(rows) {
        return rows;
      })
      .catch(function(err) {
        console.log(err);
      });
  });
};

// '10000','10','1','1','1000'
const postListing = ({ price, minStay, stars, numRatings, max }) => {
  return Promise.using(getMySqlConnection(), function(connection) {
    return connection
      .query(
        "insert into apartment (price, minStay, stars, numRatings, max) values (?,?,?,?,?)",
        [price, minStay, stars, numRatings, max]
      )
      .then(function(rows) {
        return rows;
      })
      .catch(function(err) {
        console.log(err);
        return err
      });
  });
};

const deleteListing = id => {
  return Promise.using(getMySqlConnection(), function(connection) {
    return connection
      .query("delete from apartment where id = ?", id.toString())
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  });
};

const getDates = () => {
  return Promise.using(getMySqlConnection(), function(connection) {
    // console.log('ho')
    return connection
      .query("select * from dates limit 100")
      .then(function(rows) {
        return rows;
      })
      .catch(function(error) {
        console.log('err')
        console.log(error);
        return error
      });
  });
};

// '2019-01-02','1'
const postDate = ({ date, apartmentId }) => {
  return Promise.using(getMySqlConnection(), function(connection) {
    return connection
      .query("insert into dates (date, apartment_id) values (?,?)", 
      [date, apartmentId])
      .then(function(rows) {
        return rows;
      })
      .catch(function(error) {
        console.log(error);
        return error
      });
  });
};

const deleteDate = id => {
  return Promise.using(getMySqlConnection(), function(connection) {
    return connection
      .query("delete from dates where id = ?", id.toString())
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  });
};

// client api
module.exports.getListingData = getListingData;

// crud api
module.exports.getListings = getListings;
module.exports.postListing = postListing;
module.exports.deleteListing = deleteListing;

module.exports.getDates = getDates;
module.exports.postDate = postDate;
module.exports.deleteDate = deleteDate;
