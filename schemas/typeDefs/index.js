var {GraphQLObjectType, GraphQLString } = require('graphql');
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
module.exports=UserType;