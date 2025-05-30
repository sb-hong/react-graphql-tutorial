const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const port = process.env.PORT || 4000;

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: ({req}) => {
        return { req }
    },
    introspection: true, // Enable introspection in production
    playground: true // Enable playground in production
});

server.listen(port).then(({url}) => {
    console.log(`🚀Server ready at ${url}`);
}).catch(err => {
    console.error('Error starting server:', err);
});