import { useEffect, useState } from "react";
import { fetchData } from "../../app/api";
import { useQuery } from "../../app/hooks";
import { DeleteListing, Listing, ListingData } from "./types";

const LISTINGS = `
  query Listings{
      listings{
        id
        title
        image
        address
        price
        numOfGuests
        numOfBeds
        numOfBaths
        rating
      }
  }

`;

const DELETE_LISTINGS = `
  mutation DeleteListing($id:ID!){
          deleteListing(id:$id){
              id
              title
          }
  }    

`;

export const Listings: React.FC = function () {
    const { data, refetch } = useQuery<ListingData>(LISTINGS);

    console.log(data);

    async function handleDeleteListingData(id: string) {
        await fetchData<DeleteListing>({
            query: DELETE_LISTINGS,
            variables: { id },
        });
        refetch();
    }

    const listOfListings = (
        <ul>
            {data?.listings.map((list) => (
                <div style={{ display: "flex" }} key={list.id}>
                    <li>{list.title}</li>
                    <button onClick={() => handleDeleteListingData(list.id)}>
                        delete
                    </button>
                </div>
            ))}
        </ul>
    );

    return (
        <>
            <h3>Listings</h3>
            {listOfListings}
        </>
    );
};
