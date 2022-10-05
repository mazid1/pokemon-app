import { Pokemon } from "@favware/graphql-pokemon";
import { Grid } from "@mui/material";
import React from "react";
import PokemonCard from "./PokemonCard";

interface Props {
  pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: Props) => {
  return (
    <Grid container spacing={3}>
      {pokemons.map((p) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={p.key}>
          <PokemonCard pokemon={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonList;
