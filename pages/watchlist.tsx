import { useApolloClient, useQuery, useReactiveVar } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React, { ReactNode, useState } from "react";
import PokemonList from "../components/PokemonList";
import {
  getFuzzyPokemonQueryVars,
  GET_FUZZY_POKEMON,
} from "../gql/getFuzzyPokemon";
import { Pokemon } from "../graphql-pokemon";
import { watchlistVar } from "../libs/apolloClient";

const Watchlist: NextPage = () => {
  const watchlist = useReactiveVar(watchlistVar);
  const { loading, error, data } = useQuery(GET_FUZZY_POKEMON, {
    variables: getFuzzyPokemonQueryVars,
    notifyOnNetworkStatusChange: true,
  });

  const [isAscending, setIsAscending] = useState(true);

  let content: ReactNode;
  if (error) {
    content = <div>Error: {error.message}</div>;
    console.log("Error:", error);
  }

  if (loading) {
    content = <div>Loading...</div>;
  }

  if (data) {
    const loadedPokemons: Pokemon[] = data.getFuzzyPokemon;
    const watchlistPokemons = loadedPokemons.filter((p) => watchlist[p.key]);
    if (watchlistPokemons.length > 0) {
      if (isAscending) {
        watchlistPokemons.sort((a, b) => a.key.localeCompare(b.key));
      } else {
        watchlistPokemons.sort((a, b) => b.key.localeCompare(a.key));
      }
      content = <PokemonList pokemons={watchlistPokemons} />;
    } else {
      content = <Typography>Your watchlist is empty.</Typography>;
    }
  }

  return (
    <Container component="main" sx={{ px: 3, mb: 5 }} maxWidth={"xl"}>
      <Head>
        <title>Pokemon | Watchlist</title>
      </Head>

      <Toolbar />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h3" my={2}>
          Watchlist
        </Typography>

        <Box>
          <Button
            variant="contained"
            onClick={() => setIsAscending((prev) => !prev)}
          >
            {isAscending ? "Sort Descending" : "Sort Ascending"}
          </Button>
        </Box>
      </Stack>

      <Box component={"section"}>{content}</Box>
    </Container>
  );
};

export default Watchlist;
