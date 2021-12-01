var { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
var UserType = require('./typeDefs')
var User     = require('../shares/users')

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return User;
            },
        }
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
                    id: JSON.stringify(User.length + 1),
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

module.exports={RootQuery,Mutation};