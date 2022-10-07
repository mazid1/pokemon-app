import {
  Box,
  Card,
  Chip,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import BaseStatsCard from "../../components/BaseStatsCard";
import BulbapediaCard from "../../components/BulbapediaCard";
import FlavorsCard from "../../components/FlavorsCard";
import GenderCard from "../../components/GenderCard";
import TypesCard from "../../components/TypesCard";
import {
  getFuzzyPokemonQueryVars,
  GET_FUZZY_POKEMON_KEY_LIST,
} from "../../gql/getFuzzyPokemon";
import { GET_POKEMON_BY_SPECIES } from "../../gql/getPokemon";
import { Pokemon } from "../../graphql-pokemon";
import { initializeApollo } from "../../libs/apolloClient";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetails: NextPage<Props> = ({ pokemon }) => {
  return (
    <Container component="main" sx={{ px: 3, mb: 5 }} maxWidth={"xl"}>
      <Head>
        <title>{`Pokemon | ${pokemon.species}`}</title>
      </Head>

      <Toolbar />

      <Typography variant="h3" textTransform={"capitalize"} my={2}>
        {pokemon.species}
      </Typography>

      <Box
        component={"section"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack spacing={4}>
          <Image
            src={pokemon.sprite}
            alt={pokemon.key}
            height={100}
            width={100}
            layout="fixed"
          />

          <BaseStatsCard baseStats={pokemon.baseStats} />

          <FlavorsCard flavorTexts={[...pokemon.flavorTexts]} />

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5">Leveling Rate</Typography>

            <Divider style={{ marginBottom: "1rem" }} />

            {pokemon.levellingRate}
          </Card>

          <TypesCard types={[...pokemon.types]} />

          <GenderCard gender={pokemon.gender} />

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5">Species</Typography>

            <Divider style={{ marginBottom: "1rem" }} />

            <Chip label={pokemon.species} />
          </Card>

          <BulbapediaCard bulbapediaPage={pokemon.bulbapediaPage} />
        </Stack>
      </Box>
    </Container>
  );
};

// Generates `/species/dragonite`, `/species/abra`
export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { getFuzzyPokemon: species },
  } = await apolloClient.query({
    query: GET_FUZZY_POKEMON_KEY_LIST,
    variables: getFuzzyPokemonQueryVars,
  });

  const paths = species.map((s: { key: string }) => ({
    params: { species: s.key },
  }));

  return {
    paths,
    fallback: "blocking", // ssr if not ssg yet
  };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const apolloClient = initializeApollo();
  const species = context.params?.species;

  const {
    data: { getPokemon: pokemon },
  } = await apolloClient.query({
    query: GET_POKEMON_BY_SPECIES,
    variables: { pokemon: species },
  });

  return {
    // Passed to the page component as props
    props: { pokemon },
  };
};

export default PokemonDetails;
