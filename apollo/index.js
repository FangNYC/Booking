// const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
  type Listing {
    id: ID,
    minstay: String,
    max: String,
    stars: String,
    price: String,
    dates: [Date]
  }
  type Date {
    id: ID,
    apartment_id: Int
  }

`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports.server = server;

// const app = express();
// server.applyMiddleware({ app });
