import { gql } from "@apollo/client";

export const GET_FUZZY_POKEMON = gql`
  query GetFuzzyPokemon($offset: Int!, $take: Int!, $pokemon: String!) {
    getFuzzyPokemon(offset: $offset, take: $take, pokemon: $pokemon) {
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
    }
  }
`;

export const getFuzzyPokemonQueryVars = {
  offset: 0,
  take: 50,
  pokemon: "a",
};
