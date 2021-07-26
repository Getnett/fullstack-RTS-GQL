import { IDBCollection } from "./../lib/types";
import { MongoClient } from "mongodb";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTOR}.mongodb.net/${process.env.DB_DEFAULT}?retryWrites=true&w=majority`;

const client = new MongoClient(url);

export async function connectToDB(): Promise<IDBCollection> {
    await client.connect();
    const db = client.db("ts-graphql");

    return {
        listings: db.collection("test_listings"),
    };
}
