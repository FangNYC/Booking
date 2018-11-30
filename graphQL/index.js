var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }

    type Listing {
      id: Int
      dates: [Date]
    }

    type Date {
      id: Int
      date: String
      apartmentId: Int
    }
`);

// Root resolver
var root = {
    message: () => 'Hello World!'
};

module.exports.schema = schema;
module.exports.root = root;