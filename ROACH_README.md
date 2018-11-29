# This app can be configured to a CockroachDB cluster deployed on Digital Ocean

1) Spin up a secure cluster according to docs

2) Populate certs/ and my-safe-directory/ 

cockroach sql --certs-dir=certs --host=<any-node-ip>

# Seeding Cockroach DB

Seeding with Production-grade data is accomplished with Artillery and Faker

These files are found in `cockroachLoadTest/`

To seed DB with listing ID 1-5000:

> artillery run cockroachLoadTest/seedAptWithID.yml

> artillery run cockroachLoadTest/seedDates.yml

To seed additional listings w random generated id:

> artillery run cockroachLoadTest/seedAptRandomId.yml

# Load Testing on a Remote Server

> Clone this repo, run npm install, and run any of the prod load tests to test the db