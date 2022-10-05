import { Pokemon } from "@favware/graphql-pokemon";
import React from "react";
import PokemonCard from "./PokemonCard";

interface Props {
  pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: Props) => {
  return (
    <div>
      {pokemons.map((p) => (
        <PokemonCard key={p.key} pokemon={p} />
      ))}
    </div>
  );
};

export default PokemonList;
