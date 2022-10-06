import { NetworkStatus, useQuery } from "@apollo/client";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import PokemonList from "../components/PokemonList";
import {
  getFuzzyPokemonQueryVars,
  GET_FUZZY_POKEMON,
} from "../gql/getFuzzyPokemon";
import { Pokemon } from "../graphql-pokemon";

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
    <Container component="main" sx={{ px: 3 }} maxWidth={"xl"}>
      <Head>
        <title>Pokemon | Home</title>
      </Head>

      <Toolbar />

      <Typography variant="h3" my={2}>
        Pokemon List
      </Typography>

      <Box component={"section"}>{content}</Box>

      <button
        onClick={() => loadMorePokemons()}
        disabled={loading || loadingMore}
      >
        {loadingMore ? "Loading..." : "Show More"}
      </button>
    </Container>
  );
};

export default Home;
