const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

// Initialize server outside handler for better cold starts
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({req}) => {
        return { req }
    }
});

if (process.env.NODE_ENV === 'development') {

    async function startServer() {
        const app = express();
        
        await server.start();
        server.applyMiddleware({ app, path: '/graphql' });
        
        const port = process.env.PORT || 4000;
        
        app.listen(port, () => {
            console.log(`🚀Server ready at http://localhost:${port}${server.graphqlPath}`);
        });
    }
    
    startServer();

} else {
    const serverless = require('serverless-http');
    
    
    // Initialize express app outside handler
    const app = express();
    
    // Initialize server and apply middleware
    const startServerAndInit = async () => {
        await server.start();
        server.applyMiddleware({ app, path: '/graphql' });
        return app;
    };
    
    // Initialize once outside handler
    const serverPromise = startServerAndInit();
    
    // Lambda handler
    exports.handler = async (event, context) => {
        const app = await serverPromise;
        return serverless(app)(event, context);
    };
}
