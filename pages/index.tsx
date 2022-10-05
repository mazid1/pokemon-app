import { NetworkStatus, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import {
  getFuzzyPokemonQueryVars,
  GET_FUZZY_POKEMON,
} from "../gql/getFuzzyPokemon";

const Home: NextPage = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_FUZZY_POKEMON,
    {
      variables: getFuzzyPokemonQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  let content;
  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  if (error) {
    content = <div>Error: {error.message}</div>;
    console.log("Error:", error);
  }

  if (loading || loadingMore) {
    content = <div>Loading...</div>;
  }

  if (data) {
    const { getFuzzyPokemon } = data;
    content = <pre>{JSON.stringify(getFuzzyPokemon, null, 2)}</pre>;
  }

  return (
    <main>
      <Head>
        <title>Pokemon | Home</title>
      </Head>
      <h1>Home</h1>
      <section>{content}</section>
    </main>
  );
};

export default Home;
