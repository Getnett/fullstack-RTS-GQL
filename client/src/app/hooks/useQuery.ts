import { useCallback, useEffect, useReducer } from "react";
import { fetchData } from "../api";

interface State<Data> {
    data: Data | null;
    loading: boolean;
    error: any;
}
interface QueryResult<Data> extends State<Data> {
    refetch: () => void;
}
type Action<Data> =
    | { type: "FETCH" }
    | { type: "FETCH_SUCCESS"; payload: Data }
    | { type: "FETCH_FAILED"; error: any };

function reducer<Data>() {
    return function (state: State<Data>, action: Action<Data>) {
        switch (action.type) {
            case "FETCH":
                return { ...state, loading: true };
            case "FETCH_SUCCESS":
                return { data: action.payload, loading: false, error: null };
            case "FETCH_FAILED":
                return {
                    ...state,
                    loading: false,
                    error: action.error,
                };

            default:
                throw new Error();
        }
    };
}

export function useQuery<Data = any>(query: string): QueryResult<Data> {
    const fetchReducer = reducer<Data>();
    const [state, dispatch] = useReducer(fetchReducer, {
        data: null,
        loading: false,
        error: null,
    });

    const fetch = useCallback(() => {
        dispatch({ type: "FETCH" });
        const fetchListingData = async () => {
            try {
                const { data, errors } = await fetchData<Data>({ query });
                dispatch({ type: "FETCH_SUCCESS", payload: data });
                if (errors && errors.length > 0) {
                    throw errors[0];
                }
            } catch (error) {
                dispatch({ type: "FETCH_FAILED", error: error.message });
            }
        };
        fetchListingData();
    }, [query]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { ...state, refetch: fetch };
}
