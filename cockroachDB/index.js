var query = require("./query.js").query;

function getListingData(id) {
  return new Promise((resolve, reject) => {
    query(
      `
      SELECT * FROM apartment t1 
      INNER JOIN dates t2 ON t1.id = t2.apartment_id
		  WHERE t1.id=$1;
      `,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (!result) {
            reject(result);
          }
          resolve(result.rows);
        }
      }
    );
  });
}

function getListing(id) {
  return new Promise((resolve, reject) => {
  query(
    `
    SELECT * FROM apartment t1 
    WHERE t1.id=$1;
    `,
    [id],
    (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (!result) {
          reject(result);
        }
        resolve(result.rows[0]);
      }
    }
  );
})}


function getListings() {
  return new Promise((resolve, reject) => {
    query(
      `
      select * from apartment order by id desc
      `,
      [],
      (err, result) => {
        if (err) reject(err);
        else {
          if (!result) {
            reject(result);
          }
          resolve(result.rows);
        }
      }
    );
  });
}

function postListing({ price, minStay, stars, numRatings, max }) {
  return new Promise((resolve, reject) => {
    query(
      `
      insert into apartment 
      (price, minStay, stars, numRatings, max) 
      values 
      ($1, $2, $3, $4, $5) 
      returning id
      `,
      [price, minStay, stars, numRatings, max],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (!result) {
            reject(result);
          }
          resolve(result);
        }
      }
    );
  });
}

function postListingId({ id, price, minStay, stars, numRatings, max }) {
  return new Promise((resolve, reject) => {
    query(
      `
      insert into apartment 
      (id, price, minStay, stars, numRatings, max) 
      values 
      ($1, $2, $3, $4, $5, $6) 
      returning id
      `,
      [id, price, minStay, stars, numRatings, max],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (!result) {
            reject(result);
          }
          resolve(result);
        }
      }
    );
  });
}

function deleteListing({ id }) {
  return new Promise((resolve, reject) => {
    query(`delete from apartment where id = $1`, [id], (err, result) => {
      if (err) reject(err);
      else {
        if (!result) {
          reject(result);
        }
        resolve(result);
      }
    });
  });
}

function getDates() {
  return new Promise((resolve, reject) => {
    query(`select * from dates`, [], (err, result) => {
      if (err) reject(err);
      else {
        if (!result) {
          reject(result);
        }
        resolve(result.rows);
      }
    });
  });
}

function postDate({ date, apartmentId }) {
  return new Promise((resolve, reject) => {
    query(
      `insert into dates 
      (date, apartment_id) 
      values 
      ($1, $2)
      `,
      [date, apartmentId],
      (err, result) => {
        if (err) reject(err);
        else {
          if (!result) {
            reject(result);
          }
          resolve(result);
        }
      }
    );
  });
}

// TODO - Implement this endpoint in server
function deleteDate({ id }) {
  return new Promise((resolve, reject) => {
    query(`delete from dates where id = $1`,
      [id],
      (err, result) => {
        if (err) reject(err);
        else {
          if (!result) {
            reject(result);
          }
          resolve(result.rows);
        }
      }
    );
  });
}

// client api
module.exports.getListingData = getListingData;
module.exports.getListing = getListing
// crud api
module.exports.getListings = getListings;
module.exports.postListing = postListing;
module.exports.postListingId = postListingId;
module.exports.deleteListing = deleteListing;

module.exports.getDates = getDates;
module.exports.postDate = postDate;
module.exports.deleteDate = deleteDate;

// ----------- TEST VALUES ----------------

// deleteDate({ id: '403701066510532609' })

// var testDate = {
//   date:'2019-02-01',
//   apartmentId: '1'
// }
// postDate(testDate);

// getDates();

// var testDelete = {
//   id: "1"
// }
// deleteListing(testDelete)

// var testPost = {
//   price: "10",
//   minStay: "1",
//   stars: "5",
//   numRatings: "1",
//   max: "5"
// }
// postListing(testPost);

// var testPostId = {
//   id: "1",
//   price: "10",
//   minStay: "1",
//   stars: "5",
//   numRatings: "1",
//   max: "5"
// }
// postListingId(testPostId);

// ----------------------------------------
