import { gql, useMutation, useQuery } from "@apollo/client";
import { Listing as ListingData } from "./__generated__/Listing";
import {
    DeleteListing,
    DeleteListingVariables,
} from "./__generated__/DeleteListing";
const LISTINGS = gql`
    query Listing {
        listings {
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

const DELETE_LISTINGS = gql`
    mutation DeleteListing($id: ID!) {
        deleteListing(id: $id) {
            id
            title
        }
    }
`;

export const ListingsComp: React.FC = function () {
    const { data, loading, error, refetch } = useQuery<ListingData>(LISTINGS);
    const [fetch, { loading: mutLoading, error: mutError }] = useMutation<
        DeleteListing,
        DeleteListingVariables
    >(DELETE_LISTINGS);

    async function handleDeleteListingData(id: string) {
        await fetch({ variables: { id } });
        refetch();
    }

    const listOfListings = (
        <ul>
            {data?.listings.map((list) => (
                <div style={{ display: "flex" }} key={list.id}>
                    <li>{list.title}</li>
                    <button
                        name={`${list.id}`}
                        id={`${list.id}`}
                        onClick={() => handleDeleteListingData(list.id)}
                    >
                        {mutLoading ? "deleting..." : "Delete"}
                    </button>
                </div>
            ))}
        </ul>
    );

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>{error}</h3>;
    }
    const deleteErrorMessage = mutError ? <h3>Deleting failed</h3> : null;
    return (
        <>
            <h3>Listings</h3>
            {listOfListings}
            {deleteErrorMessage}
        </>
    );
};
