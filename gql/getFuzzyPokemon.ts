import { gql } from "@apollo/client";

export const GET_FUZZY_POKEMON = gql`
  query GetFuzzyPokemon($offset: Int!, $take: Int!, $pokemon: String!) {
    getFuzzyPokemon(offset: $offset, take: $take, pokemon: $pokemon) {
      num
      key
      species
      types
      sprite
      levellingRate
      bulbapediaPage
      flavorTexts {
        game
        flavor
      }
      gender {
        male
        female
      }
      baseStats {
        hp
        attack
        defense
        specialattack
        specialdefense
        speed
      }
      isInWatchlist @client
    }
  }
`;

export const GET_FUZZY_POKEMON_DEX_LIST = gql`
  query GetFuzzyPokemon($offset: Int!, $take: Int!, $pokemon: String!) {
    getFuzzyPokemon(offset: $offset, take: $take, pokemon: $pokemon) {
      num
    }
  }
`;

export const getFuzzyPokemonQueryVars = {
  offset: 0,
  take: 50,
  pokemon: "a",
};
