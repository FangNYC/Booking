const mysql = require('promise-mysql')
const legacy = require('./legacy.js')
var Promise = require("bluebird");
var getSqlConnection = require('./dbConnection.js');

const getListingData = (id) => {
	return legacy.getListingData(id);
}

const getListings = () => {
	console.log('db get listings')
	return Promise.using(getSqlConnection(), function(connection) {
    return connection.query('select * from apartment').then(function(rows) {
      return (rows)
    }).catch(function(error) {
      console.log(error);
    });
  })
}

const postListing = (payload) => {
	console.log('db post listing');
	console.log(payload);
}

const deleteListing = (id) => {
	console.log('db delete listing');
	console.log(id);
}


module.exports.getListingData = getListingData;

// extended api
module.exports.getListings = getListings;
module.exports.postListing = postListing;
module.exports.deleteListing = deleteListing;


