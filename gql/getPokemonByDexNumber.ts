import { gql } from "@apollo/client";

export const GET_POKEMON_BY_DEX_NUMBER = gql`
  query GetPokemonByDexNumber($number: Int!) {
    getPokemonByDexNumber(number: $number) {
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

export const getPokemonByDexNumberQueryVars = {
  number: 0,
};
