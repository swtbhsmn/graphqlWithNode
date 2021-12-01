var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
var app = express();

let User = [
  {
    id: "0001",
    firstName: 'Swetabh',
    lastName: "Suman",
    email: "swtbhsmn@gmail.com",
    password: "dwljkfhoicwjecxjkdjfc8wrfj89erwdf2j38jdwej"
  },
  {
    id: "0002",
    firstName: 'Swetabh',
    lastName: "Suman",
    email: "swtbhsmn@gmail.com",
    password: "kjegdfuigawedfmeixcjiowmedwnedc7"
  },
  {
    id: "0003",
    firstName: 'Swetabh',
    lastName: "Suman",
    email: "swtbhsmn@gmail.com",
    password: "kjegdfuigadhebjhewbhdguhxsahjvdctdcbiixjxji"
  },
]


const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return User;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        User.push({
          id: User.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args;
      },
    },
  },
});

var schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true, }));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));