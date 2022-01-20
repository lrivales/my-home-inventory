const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser'); // required for mongo-image-converter

const { typeDefs, resolvers } = require('./schemas');
const PORT = process.env.PORT || 3001;
const db = require('./config/connection');

const app = express();

const startServer = async () => {
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers
  });

  await server.start();

  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

app.use(bodyParser.json({limit: '16mb', extended: true})); // required for mongo-image-converter
app.use(bodyParser.urlencoded({limit: '16mb', extended: true})) // required for mongo-image-converter
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});