const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

async function startServer() {
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        context: ({req}) => {
            return { req }
        }
    });
    
    const app = express();
    
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    
    const port = process.env.PORT || 4000;
    
    app.listen(port, () => {
        console.log(`🚀Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
}

startServer();