var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { GraphQLSchema} = require('graphql');
var app = express();
var {RootQuery,Mutation} = require('./schemas')

var schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true, }));
app.listen(4000, () => console.log('localhost:4000/graphql'));