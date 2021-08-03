import { IDBCollection, Listing } from "../../../lib/types";
import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";

export const ListingResolvers: IResolvers = {
    Query: {
        listings: async (
            _root: undefined,
            _args: Record<string, never>,
            { dbCollection }: { dbCollection: IDBCollection }
        ): Promise<Listing[]> => {
            return await dbCollection.listings.find({}).toArray();
        },
    },
    Mutation: {
        deleteListing: async (
            _root: undefined,
            { id }: { id: string },
            { dbCollection }: { dbCollection: IDBCollection }
        ): Promise<Listing> => {
            // throw new Error("Request failed !");
            const deletedItem = await dbCollection.listings.findOneAndDelete({
                _id: new ObjectId(id),
            });

            if (!deletedItem.value) {
                throw new Error("Failed to delete listing");
            }
            return deletedItem.value;
        },
    },
    Listing: {
        id: (listing: Listing): string => listing._id.toString(),
    },
};
