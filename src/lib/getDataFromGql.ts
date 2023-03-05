import {DocumentNode} from "@apollo/client";
import {print} from "graphql/language/printer";

export async function getDataFromGql(gqlData: DocumentNode, variables: { year: string }) {

    const data = await fetch("https://graphql.svcc.mobi/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: print(gqlData),
            variables,
        }),
        next: {revalidate: 10},
    }).then((res) => res.json());
    return data;
}