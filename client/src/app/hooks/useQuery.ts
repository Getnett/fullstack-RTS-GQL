import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../api";

interface State<Data> {
    data: Data | null;
}

export function useQuery<Data = any>(query: string) {
    const [apiData, setApiData] = useState<State<Data>>({
        data: null,
    });

    const fetch = useCallback(() => {
        const fetchListingData = async () => {
            const { data } = await fetchData<Data>({ query });
            setApiData({ data });
        };
        fetchListingData();
    }, [query]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { ...apiData, refetch: fetch };
}
