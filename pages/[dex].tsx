import { Pokemon } from "@favware/graphql-pokemon";
import { Box, Toolbar } from "@mui/material";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import React from "react";
import {
  getFuzzyPokemonQueryVars,
  GET_FUZZY_POKEMON_DEX_LIST,
} from "../gql/getFuzzyPokemon";
import { GET_POKEMON_BY_DEX_NUMBER } from "../gql/getPokemonByDexNumber";
import { initializeApollo } from "../libs/apolloClient";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetails: NextPage<Props> = ({ pokemon }) => {
  console.log(pokemon);

  return (
    <Box component="main" sx={{ px: 3 }}>
      <Head>
        <title>Pokemon | Details</title>
      </Head>
      <Toolbar />
      <h1>Details</h1>
      <section>content</section>
    </Box>
  );
};

// Generates `/1`, `/2`
export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { getFuzzyPokemon: pokemonList },
  } = await apolloClient.query({
    query: GET_FUZZY_POKEMON_DEX_LIST,
    variables: getFuzzyPokemonQueryVars,
  });

  const paths = pokemonList.map((p: { num: number }) => ({
    params: { dex: p.num.toFixed() },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const apolloClient = initializeApollo();
  const dex = Number(context.params?.dex);

  const {
    data: { getPokemonByDexNumber: pokemon },
  } = await apolloClient.query({
    query: GET_POKEMON_BY_DEX_NUMBER,
    variables: { number: dex },
  });

  return {
    // Passed to the page component as props
    props: { pokemon },
  };
};

export default PokemonDetails;
