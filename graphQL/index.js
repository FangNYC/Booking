var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
var root = {
    message: () => 'Hello World!'
};

module.exports.schema = schema;
module.exports.root = root;