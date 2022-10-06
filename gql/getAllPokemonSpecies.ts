import { gql } from "@apollo/client";

export const GET_ALL_POKEMON_SPECIES = gql`
  query GetAllPokemonSpecies {
    getAllPokemonSpecies
  }
`;
