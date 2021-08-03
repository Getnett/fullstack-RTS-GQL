export interface Listing {
    id: string;
    title: String;
    image: String;
    address: String;
    price: number;
    numOfGuests: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
}

export interface ListingData {
    listings: Listing[];
}

export interface DeleteListing {
    deleteListing: Listing;
}
export interface IVariables {
    id: string;
}
