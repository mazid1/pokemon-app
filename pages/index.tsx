import { NetworkStatus, useQuery } from "@apollo/client";
import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import PokemonList from "../components/PokemonList";
import {
  getFuzzyPokemonQueryVars,
  GET_FUZZY_POKEMON,
} from "../gql/getFuzzyPokemon";
import { Pokemon } from "../graphql-pokemon";
import { initializeApollo } from "../libs/apolloClient";

interface Props {
  pokemons: Pokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
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

  let loadedPokemons: Pokemon[] = [];
  if (data) {
    loadedPokemons = data.getFuzzyPokemon;
    content = <PokemonList pokemons={loadedPokemons} />;
  } else {
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
    <Container component="main" sx={{ px: 3, mb: 5 }} maxWidth={"xl"}>
      <Head>
        <title>Pokemon | Home</title>
      </Head>

      <Toolbar />

      <Typography variant="h3" my={2}>
        Pokemon List
      </Typography>

      <Box component={"section"}>{content}</Box>

      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <Button
          onClick={() => loadMorePokemons()}
          disabled={loading || loadingMore}
          variant="contained"
        >
          {loadingMore ? "Loading..." : "Show More"}
        </Button>
      </Box>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { getFuzzyPokemon: pokemons },
  } = await apolloClient.query({
    query: GET_FUZZY_POKEMON,
    variables: getFuzzyPokemonQueryVars,
  });

  return {
    // Passed to the page component as props
    props: { pokemons: pokemons || [] },
  };
};

export default Home;
