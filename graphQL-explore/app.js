const { ApolloServer } = require('apollo-server');

const schema = require('./graphqlSchema');

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});

server.listen({port: 9000}).then(({url}) => console.log(`Server running at ${url}`));