interface Body<Variables> {
    query: string;
    variables?: Variables;
}
interface Error {
    message: string;
}
export async function fetchData<Data = any, Variables = any>(
    body: Body<Variables>
) {
    const res = await fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        console.log("My response", res);
        throw new Error(res.statusText);
    }

    return res.json() as Promise<{ data: Data; errors: Error[] }>;
}
