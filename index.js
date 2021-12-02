var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { GraphQLSchema } = require('graphql');
const mongoose = require('mongoose');
var app = express();
var env = require('dotenv')
env.config()
try {
  var connect = mongoose.connect(process.env.DATABASE_URL);
  connect.then((db) => {
    console.log("mongodb \u2714");
  }, (err) => { console.log(err); });
}
catch (err) {
  console.log(err)
}
var { RootQuery, Mutation } = require('./schemas');
var schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
const port = process.env.PORT || 3001;
app.use('/', graphqlHTTP({ schema: schema, graphiql: true, }));
app.listen(port || 3001, () => console.log(`localhost:${port}`));