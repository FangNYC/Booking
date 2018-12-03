"use strict";

// this module provides data generation functions for Artillery load tests
// https://artillery.io/blog/using-fakerjs-with-artillery

module.exports = {
  generateApartmentData,
  generateApartmentDataId,
  generateDateData
};

const faker = require("faker");

const MIN_YEAR = 6; // 2016-2018

var aptIdCounter = 1;
function generateDateData(userContext, events, done) {
  // generate data with Faker:
  const date = `201${(faker.random.number() % 2) + MIN_YEAR}-${(faker.random.number() % 11) + 1}-${(faker.random.number() % 29) + 1}`;
  const apartmentId = aptIdCounter++ % 1000;
  // add variables to virtual user's context:
  userContext.vars.date = date.toString();
  userContext.vars.apartmentId = apartmentId.toString();
  // continue with executing the scenario:
  return done();
}

var idCounter = 1;
function generateApartmentDataId(userContext, events, done) {
  // generate data with Faker:
  const id = idCounter++;
  const price = faker.random.number();
  const minStay = (faker.random.number() % 5) + 1;
  const stars = (faker.random.number() % 5) + 1;
  const numRatings = (faker.random.number() % 100) + 1;
  const max = (faker.random.number() % 12) + 6;
  // add variables to virtual user's context:
  userContext.vars.price = price.toString();
  userContext.vars.minStay = minStay.toString();
  userContext.vars.numRatings = numRatings.toString();
  userContext.vars.max = max.toString();
  userContext.vars.stars = stars.toString();
  userContext.vars.id = id.toString();
  // continue with executing the scenario:
  return done();
}

function generateApartmentData(userContext, events, done) {
  // generate data with Faker:
  const price = faker.random.number();
  const minStay = (faker.random.number() % 5) + 1;
  const stars = (faker.random.number() % 5) + 1;
  const numRatings = (faker.random.number() % 100) + 1;
  const max = (faker.random.number() % 12) + 6;
  // add variables to virtual user's context:
  userContext.vars.price = price.toString();
  userContext.vars.minStay = minStay.toString();
  userContext.vars.numRatings = numRatings.toString();
  userContext.vars.max = max.toString();
  userContext.vars.stars = stars.toString();
  // continue with executing the scenario:
  return done();
}
