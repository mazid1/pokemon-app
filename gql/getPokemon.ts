import { gql } from "@apollo/client";

export const GET_POKEMON_BY_SPECIES = gql`
  query GetPokemon($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
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
    }
  }
`;

export type GetPokemonBySpeciesQueryVarsType = {
  pokemon: string;
};
