require("dotenv").config();

import { resolvers, typeDefs } from "./graphql";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectToDB } from "./database";

async function startApolloServer() {
    const dbCollection = await connectToDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ dbCollection }),
    });
    await server.start();

    const app: Application = express();
    server.applyMiddleware({ app });

    app.listen(process.env.PORT, () => {
        console.log(
            `🚀Server ready at http://localhost:5000${server.graphqlPath}`
        );
    });
}
startApolloServer();
