require("dotenv").config();

import { connectToDB } from "../src/database";
import { listings } from "./mockData";

async function seed() {
    try {
        const dbCollection = await connectToDB();
        for (const listItem of listings) {
            dbCollection.listings.insertOne(listItem);
        }
        console.log("Inserting....mockdata,...:) success");
    } catch {
        throw new Error("Failed to insert the data");
    }
}
seed();
