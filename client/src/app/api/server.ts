interface Body<Variables> {
    query: string;
    variables?: Variables;
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

    return res.json() as Promise<{ data: Data }>;
}
