# Booking
## by Louis Otter

## System Design by Ben Mangold

Booking Component Referencing AirBnB 

React, Node.js, MySQL, MongoDB, CockroachDB

## FangNYC fork by Ben Mangold

System Design

[Trello Task Board](https://trello.com/b/nO5AU22g/sb-staybnb-bookings)

[Engineering Journal](https://www.dropbox.com/s/f52rd1rmw4gf97a/SDC_Engineering_Journal.md?dl=0)

## DB is configured for Ben's local dev env
### Adjust for your local MySQL installation in `/database/dbConnection.js`

## Install

`npm run install`

## Test

`npm run test` exit with ctrl-c

## Seed local DB

### Reset mySQL
`mysql -u root < schema.sql` no local mysql pw
`mysql -u root -p < schema.sql` with local mysql pw

`npm run seed` - creates, or appends data to apartment.csv and dates.csv. then seedes mySQL and mongoDB

## Start Dev

`npm run react-dev`
`npm run server-dev`

## EC2 Deployment

This web service is intended to run on an EC2 instance
Permissions .pem files are ignored by git

`ssh -i "<permissions>.pem" <EC2_DNS>`

## Cockroach DB

This app can utilize a cockroachDB cluster deployed on Digital Ocean. See ROACH_README.md for more details

