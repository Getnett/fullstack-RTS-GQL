import { useMutation, useQuery } from "../../app/hooks";
import { DeleteListing, IVariables, ListingData } from "./types";

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
    // experimental

    const { data, loading, error, refetch } = useQuery<ListingData>(LISTINGS);
    const [fetch, { loading: mutLoading, error: mutError }] = useMutation<
        DeleteListing,
        IVariables
    >(DELETE_LISTINGS);
    console.log("[MUT--ERROR]", mutError);

    async function handleDeleteListingData(id: string) {
        await fetch({ id });
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
