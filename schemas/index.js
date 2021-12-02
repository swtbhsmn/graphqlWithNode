var { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
var UserType = require('./typeDefs')
var User = require('../shares/users')

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getUsers: {
            type: new GraphQLList(UserType),
            args: { _id: { type: GraphQLString } },
            resolve(parent, args) {
                return User.find({});
            }
        },
        getUser: {
            type: UserType,
            args: { _id: { type: GraphQLString } },
            resolve(parent, args) {
                return User.findById(args._id);
            }
        }
    }
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
                if (!args._id) return;
               return User.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password,
                });
            },
        },
        updateUser: {
            type: UserType,
            args: {
                _id: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                if (!args._id) return;
                return User.findOneAndUpdate(
                    {
                        _id: args._id
                    },
                    {
                        $set: {
                            firstName: args.firstName,
                            lastName: args.lastName,
                            email: args.email,
                            password:args.password
                        }
                    },
                    { new: true }
                )
            }
        },
        deletedUser: {
            type: UserType,
            args: {
                _id: { type: GraphQLString }
            },
            resolve(parent, args) {
                if (!args._id) return;
                return User.findByIdAndDelete({ _id: args._id })

            }
        }
    },
});

module.exports = { RootQuery, Mutation };