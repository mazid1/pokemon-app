import {
  Box,
  Card,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import {
  getFuzzyPokemonQueryVars,
  GET_FUZZY_POKEMON_DEX_LIST,
} from "../gql/getFuzzyPokemon";
import { GET_POKEMON_BY_DEX_NUMBER } from "../gql/getPokemonByDexNumber";
import { Pokemon } from "../graphql-pokemon";
import { initializeApollo } from "../libs/apolloClient";

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

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5">Base Stats</Typography>

            <Divider style={{ marginBottom: "1rem" }} />

            <TableContainer component={Paper} variant="outlined">
              <Table aria-label="base stats table">
                <TableHead>
                  <TableRow>
                    <TableCell>HP</TableCell>
                    <TableCell>Attack</TableCell>
                    <TableCell>Defense</TableCell>
                    <TableCell>Special Attack</TableCell>
                    <TableCell>Special Defense</TableCell>
                    <TableCell>Speed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {pokemon.baseStats.hp}
                    </TableCell>
                    <TableCell>{pokemon.baseStats.attack}</TableCell>
                    <TableCell>{pokemon.baseStats.defense}</TableCell>
                    <TableCell>{pokemon.baseStats.specialattack}</TableCell>
                    <TableCell>{pokemon.baseStats.specialdefense}</TableCell>
                    <TableCell>{pokemon.baseStats.speed}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5">Flavors</Typography>

            <Divider style={{ marginBottom: "1rem" }} />

            {pokemon.flavorTexts.map((ft) => (
              <Typography key={ft.game}>
                <strong>{ft.game}:</strong> {ft.flavor}
              </Typography>
            ))}
          </Card>

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5">Leveling Rate</Typography>

            <Divider style={{ marginBottom: "1rem" }} />

            {pokemon.levellingRate}
          </Card>

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5">Types</Typography>

            <Divider style={{ marginBottom: "1rem" }} />

            {pokemon.types.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </Card>

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5">Gender</Typography>

            <Divider style={{ marginBottom: "1rem" }} />

            <TableContainer
              component={Paper}
              sx={{ maxWidth: 400 }}
              variant="outlined"
            >
              <Table aria-label="gender table">
                <TableHead>
                  <TableRow>
                    <TableCell>Male</TableCell>
                    <TableCell>Female</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {pokemon.gender.male}
                    </TableCell>
                    <TableCell>{pokemon.gender.female}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5">Species</Typography>

            <Divider style={{ marginBottom: "1rem" }} />

            <Chip label={pokemon.species} />
          </Card>

          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5">Bulbapedia Page</Typography>

            <Divider style={{ marginBottom: "1rem" }} />

            <Link href={pokemon.bulbapediaPage} target="_blank">
              {pokemon.bulbapediaPage}
            </Link>
          </Card>
        </Stack>
      </Box>
    </Container>
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
