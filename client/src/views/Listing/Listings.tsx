import { gql, useMutation, useQuery } from "@apollo/client";
import { Listing as ListingData } from "./__generated__/Listing";
import {
    DeleteListing,
    DeleteListingVariables,
} from "./__generated__/DeleteListing";
import { Alert, Button, List } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { ListingPlaceholder } from "./components";
import "./listing.css";
import { useState } from "react";
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
    const [localError, setLocalError] = useState<any>(null);
    const { data, loading, error, refetch } = useQuery<ListingData>(LISTINGS);
    const [fetch, { loading: mutLoading, error: mutError }] = useMutation<
        DeleteListing,
        DeleteListingVariables
    >(DELETE_LISTINGS);

    async function handleDeleteListingData(id: string) {
        try {
            await fetch({ variables: { id } });
            refetch();
        } catch (error) {
            setLocalError(error.message);
        }
    }

    const antdList = (
        <List
            dataSource={data?.listings}
            itemLayout='horizontal'
            renderItem={(item) => (
                <List.Item
                    actions={[
                        <Button
                            type='primary'
                            onClick={() => handleDeleteListingData(item.id)}
                        >
                            Delete
                        </Button>,
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar src={item.image} shape='square' size={48} />
                        }
                        title={item.title}
                        description={item.address}
                    />
                </List.Item>
            )}
        />
    );
    if (loading) {
        return (
            <div className='list-wrapper'>
                <ListingPlaceholder title='Listings' />
            </div>
        );
    }

    if (error) {
        return (
            <div className='list-wrapper'>
                <ListingPlaceholder
                    error='Something went wrong'
                    title='Listings'
                />
            </div>
        );
    }
    const deleteErrorMessage =
        mutError || localError ? (
            <Alert
                style={{ marginTop: "2rem" }}
                type='error'
                message={mutError?.message || localError}
                showIcon
            />
        ) : null;
    return (
        <div className='list-wrapper'>
            {deleteErrorMessage}
            <h3
                style={{
                    textAlign: "center",
                    fontSize: "1.8rem",
                    marginTop: "2rem",
                }}
            >
                Listings
            </h3>
            <div className='list-wrapper'>{antdList}</div>
        </div>
    );
};
