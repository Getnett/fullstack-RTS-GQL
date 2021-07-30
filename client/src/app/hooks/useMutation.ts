import { useReducer } from "react";
import { fetchData } from "../api";

interface State<Data> {
    data: Data | null;
    loading: boolean;
    error: any;
}

type MutationTupe<Data, Variables> = [
    (variables?: Variables | undefined) => Promise<void>,
    State<Data>
];
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
export function useMutation<Data = any, Variables = any>(
    query: string
): MutationTupe<Data, Variables> {
    const fetchReducer = reducer<Data>();
    const [state, dispatch] = useReducer(fetchReducer, {
        data: null,
        loading: false,
        error: null,
    });
    async function fetch(variables?: Variables) {
        try {
            dispatch({ type: "FETCH" });
            const { data, errors } = await fetchData<Data, Variables>({
                query,
                variables,
            });

            if (errors && errors.length > 0) {
                throw new Error(errors[0].message);
            }
            dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (error) {
            dispatch({ type: "FETCH_FAILED", error: error.message });
        }
    }

    return [fetch, state];
}
