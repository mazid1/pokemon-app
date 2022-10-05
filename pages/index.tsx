import { NetworkStatus, useQuery } from "@apollo/client";
import { Pokemon } from "@favware/graphql-pokemon";
import { Box, Toolbar } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import PokemonList from "../components/PokemonList";
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

  let pokemons: Pokemon[] = [];
  if (data) {
    pokemons = data.getFuzzyPokemon;
    content = <PokemonList pokemons={pokemons} />;
  }

  const loadMorePokemons = () => {
    fetchMore({
      variables: {
        offset: pokemons.length,
      },
    });
  };

  return (
    <Box component="main" sx={{ px: 3 }}>
      <Head>
        <title>Pokemon | Home</title>
      </Head>
      <Toolbar />
      <h1>Home</h1>
      <section>{content}</section>
      <button
        onClick={() => loadMorePokemons()}
        disabled={loading || loadingMore}
      >
        {loadingMore ? "Loading..." : "Show More"}
      </button>
    </Box>
  );
};

export default Home;
