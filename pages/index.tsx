import { NetworkStatus, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import PokemonList from "../components/PokemonList";
import {
  getFuzzyPokemonQueryVars,
  GET_FUZZY_POKEMON,
} from "../gql/getFuzzyPokemon";
import { Pokemon } from "../graphql-pokemon";
import { addApolloState, initializeApollo } from "../libs/apolloClient";

interface Props {
  pokemons: Pokemon[];
}

const allTypes = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
];

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

  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("");

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
  } else {
    loadedPokemons = pokemons;
  }

  if (searchText) {
    loadedPokemons = loadedPokemons.filter((p) =>
      p.species.startsWith(searchText)
    );
  }

  if (selectedType) {
    loadedPokemons = loadedPokemons.filter((p) =>
      p.types.includes(selectedType)
    );
  }

  content = <PokemonList pokemons={loadedPokemons} />;

  const loadMorePokemons = () => {
    fetchMore({
      variables: {
        offset: data.getFuzzyPokemon.length,
      },
    });
  };

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  return (
    <Container component="main" sx={{ px: 3, mb: 5 }} maxWidth={"xl"}>
      <Head>
        <title>Pokemon | Home</title>
      </Head>

      <Toolbar />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        mb={{ xs: 4, sm: 0 }}
        spacing={2}
      >
        <Typography
          variant="h3"
          my={2}
          whiteSpace={{ xs: "normal", sm: "nowrap" }}
        >
          Pokemon List
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          mb={{ xs: 4, sm: 0 }}
          spacing={2}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="type-select">Type</InputLabel>
            <Select
              labelId="type-select"
              id="type-select"
              value={selectedType}
              label="Type"
              onChange={handleTypeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allTypes.map((t) => (
                <MenuItem value={t} key={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            onChange={handleSearchTextChange}
            id="outlined-search"
            label="Search by species"
            type="search"
            size="small"
          />
        </Stack>
      </Stack>

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

  return addApolloState(apolloClient, {
    props: { pokemons: pokemons || [] },
  });
};

export default Home;
