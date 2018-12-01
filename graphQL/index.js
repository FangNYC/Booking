var { buildSchema } = require("graphql");
const database = require("../cockroachDB")

// GraphQL schema
var schema = buildSchema(`

    type Listing {
      id: ID!,
      price: String,
      minstay: String,
      stars: String,
      numratings: String,
      max: String,
      dates: [Date]
    }

    type Date {
      id: ID!,
      date: String!,
      apartment_id: Listing
    }

    type Dates {
      dates: [Date]
    }

    type Query {
      listings: [Listing],
      dates(apartment_id: ID!): [Date],
      listing(id: ID!): Listing,
      date(id: ID!): Date,
      message: String
    }

`);

const myFunction = () => {
  return "Hi";
};

// Root resolver
var root = {
  listing: async (args) => {
    console.log(args)
    return await database.getListing(args.id)
  },
  listings: async () => {
    return await database.getListings()
  },
  dates: async (args) => {
    console.log(args)
    return await database.getDates()
  },
  message: () => myFunction()
};

module.exports.schema = schema;
module.exports.root = root;
