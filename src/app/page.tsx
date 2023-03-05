import { initializeApollo } from "../lib/apolloClient";
import { gql } from "@apollo/client";

import Image from "next/image";

initializeApollo();

const speakerQuery = gql`
  query speaker($year: String) {
    speakers(year: $year) {
      id
      userLastName
      userFirstName
      userBioShort
    }
  }
`;

import { getDataFromGql } from "@/lib/getDataFromGql";

async function getData() {
  const variables = {
    year: "2019",
  };
  return await getDataFromGql(speakerQuery, variables);
}

interface Speaker {
  userBioShort: any;
  id: number;
  userFirstName: string;
  userLastName: string;
}

export default async function Home() {
  const {
    data: { speakers },
  } = await getData();

  return (
    <div>
      <h1>Silicon Valley Code Camp Speakers 2019</h1>
      <main className="grid">
        {speakers
          .sort((a: Speaker, b: Speaker) =>
            a.userLastName > b.userLastName ? 1 : -1
          )
          .map((speaker: Speaker) => {
            return (
              <article key={speaker?.id}>
                <img
                  src={`https://graphql.svcc.mobi/attendeeimage/${speaker?.id}.png?width=300&height=100`}
                  alt={speaker?.userLastName}
                />
                <div className="text">
                  <h3>
                    {speaker?.userFirstName} {speaker?.userLastName}
                  </h3>
                  <p>{speaker?.userBioShort}</p>
                </div>
              </article>
            );
          })}
      </main>
    </div>
  );
}
